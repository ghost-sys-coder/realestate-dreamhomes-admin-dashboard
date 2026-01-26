"use client"
import React from 'react';
import Stats from '@/components/homepage/Stats';
import HeroSection from '@/components/homepage/HeroSection';
import TestimonialsSection from '@/components/homepage/TestimonialsSection';
import HomePageNavbar from '@/components/homepage/HomePageNavbar';
import FeaturesSection from '@/components/homepage/FeaturesSection';
import PricingSection from '@/components/homepage/PricingSection';
import CTASection from '@/components/homepage/CTASection';
import FooterSection from '@/components/homepage/FooterSection';

const LandingPage = () => {

  return (
    <div className="min-h-screen bg-white max-w-400 mx-auto">
      {/* Navigation */}
      <HomePageNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Stats Section */}
      <Stats />

      {/* Features Section */}
      <FeaturesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default LandingPage;