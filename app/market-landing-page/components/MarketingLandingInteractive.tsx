/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import BenefitsSection from './BenefitsSection';
import HowItWorksSection from './HowItWorksSection';
import ThemesPreviewSection from './ThemesPreviewSection';
import IntegrationsSection from './IntegrationsSection';
import SocialProofSection from './SocialProofSection';
import CTASection from './CTASection';
import Footer from './Footer';


export default function MarketingLandingPage() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHydration, setIsHydration] = useState(false);

  useEffect(() => {
    setIsHydration(true);
  }, [])

  const handleGetStarted = () => {
    if(isHydration) {
      setIsAuthModalOpen(true)
    }
  }
  const handleCloseAuthModal = () => {
    if(isHydration) {
      setIsAuthModalOpen(false)
    }
  }

    if (!isHydration) {
    return (
      <div className="min-h-screen bg-background">
        <main className="pt-16">
          <div className="container mx-auto px-6 py-20">
            <div className="text-center">
              <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <HeroSection onGetStarted={handleGetStarted} />
      <BenefitsSection />
      <HowItWorksSection />
      <ThemesPreviewSection />
      <IntegrationsSection />
      <SocialProofSection />
      <CTASection onGetStarted={handleGetStarted} />
      <Footer />
    </div>
  );
}
