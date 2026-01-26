import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'ATS CV Optimizer - Improve Your Resume for Job Applications',
    description:
        'Analyze and optimize your CV for Applicant Tracking Systems. Get AI-powered feedback on how to improve your resume for better job application success.',
    keywords: ['ATS', 'CV', 'Resume', 'Optimizer', 'Job Application', 'Career'],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
