import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'
import { createClient } from '@/lib/supabase/server'

export async function middleware(request: NextRequest) {
    // Update session first
    const response = await updateSession(request)

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
        request.nextUrl.pathname.startsWith('/auth')
    const isConsentPage = request.nextUrl.pathname.startsWith('/consent')
    const isPublicPage = request.nextUrl.pathname === '/'
    const isAnalyzePage = request.nextUrl.pathname.startsWith('/analyze')
    const isResultsPage = request.nextUrl.pathname.startsWith('/results')

    // 1. If not logged in and trying to access protected route (but allow /analyze and /results for anonymous users)
    if (!user && !isAuthPage && !isPublicPage && !isAnalyzePage && !isResultsPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If logged in, check consent (but not on auth or consent pages)
    if (user && !isAuthPage && !isConsentPage) {
        try {
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('consent_accepted')
                .eq('id', user.id)
                .single()

            // If profile doesn't exist yet (shouldn't happen with trigger, but just in case)
            if (error && error.code === 'PGRST116') {
                // Profile not found - create it
                await supabase.from('profiles').insert({
                    id: user.id,
                    email: user.email,
                    consent_accepted: false
                })
                return NextResponse.redirect(new URL('/consent', request.url))
            }

            // If profile exists but consent not accepted, redirect to consent
            if (profile && !profile.consent_accepted) {
                return NextResponse.redirect(new URL('/consent', request.url))
            }
        } catch (err) {
            console.error('Middleware consent check error:', err)
        }
    }

    // 3. If logged in and trying to access login page, redirect to analyze
    if (user && isAuthPage) {
        // Check if they have consent first
        const { data: profile } = await supabase
            .from('profiles')
            .select('consent_accepted')
            .eq('id', user.id)
            .single()

        if (profile && !profile.consent_accepted) {
            return NextResponse.redirect(new URL('/consent', request.url))
        }

        return NextResponse.redirect(new URL('/analyze', request.url))
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (svg, png, etc)
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
