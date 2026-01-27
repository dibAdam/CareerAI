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
    title: 'Career AI | The Science of the Perfect Match',
    description: 'Stop guessing. Start interviewing. Career AI bridges the gap between your CV and the job description using precision AI analysis.',
    keywords: ['AI', 'Career', 'CV', 'Resume', 'ATS', 'Job Search', 'Optimization'],
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
