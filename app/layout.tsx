import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
});

export const metadata: Metadata = {
    title: 'Nextrova | The Science of the Perfect Match',
    description: 'Stop guessing. Start interviewing. Nextrova bridges the gap between your CV and the job description using precision AI analysis.',
    keywords: ['AI', 'Career', 'CV', 'Resume', 'ATS', 'Job Search', 'Optimization'],
    icons: {
        icon: [
            { url: '/logo2.png', sizes: '32x32', type: 'image/png' },
            { url: '/logo2.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: '/logo2.png',
        shortcut: '/logo2.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="bg-[#0A0A0B] text-white antialiased font-sans">
                {children}
            </body>
        </html>
    );
}
