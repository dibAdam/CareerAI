'use client';

import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Problem from '@/components/landing/Problem';
import Solution from '@/components/landing/Solution';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import OutputPreview from '@/components/landing/OutputPreview';
import WhoItsFor from '@/components/landing/WhoItsFor';
import Trust from '@/components/landing/Trust';
import SupportedPlatforms from '@/components/landing/SupportedPlatforms';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-emerald-500/30 font-sans">
            <Navbar />
            <main>
                <Hero />
                <Problem />
                <Solution />
                <HowItWorks />
                <SupportedPlatforms />
                <Features />
                <OutputPreview />
                <WhoItsFor />
                <Trust />
                <FinalCTA />
            </main>
            <Footer />
        </div>
    );
}
