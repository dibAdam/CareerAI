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

    // 1. If not logged in and trying to access protected route
    if (!user && !isAuthPage && !isPublicPage) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // 2. If logged in, check consent
    if (user && !isAuthPage && !isConsentPage) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('consent_accepted')
            .eq('id', user.id)
            .single()

        if (profile && !profile.consent_accepted) {
            return NextResponse.redirect(new URL('/consent', request.url))
        }
    }

    // 3. If logged in and trying to access login page
    if (user && isAuthPage) {
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
