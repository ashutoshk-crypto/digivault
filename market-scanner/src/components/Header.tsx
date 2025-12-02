'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-black w-full sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <a href="#home" className="flex items-center flex-shrink-0">
          <Image
            src="/digivault-logo.png"
            alt="Digivault Custody"
            width={200}
            height={60}
            className="h-8 sm:h-10 md:h-12 lg:h-auto w-auto"
            priority
          />
        </a>

        {/* Desktop Navigation Links and CTA */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          <a
            href="#experience"
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Experience
          </a>
          
          <a
            href="#security"
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Security
          </a>
          
          <a
            href="#excellence"
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Excellence
          </a>
          
          <a
            href="#audience"
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Audience
          </a>

          {/* CTA Button */}
          <a 
            href="#cta" 
            className="text-white font-sans text-sm xl:text-base px-4 xl:px-6 py-2 xl:py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 inline-block text-center" 
            style={{ background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)' }}
          >
            Connect With Us
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <a
              href="#experience"
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Experience
            </a>
            <a
              href="#security"
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Security
            </a>
            <a
              href="#excellence"
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Excellence
            </a>
            <a
              href="#audience"
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Audience
            </a>
            <a 
              href="#cta" 
              className="w-full text-white font-sans text-base px-6 py-3 rounded-lg hover:opacity-90 transition-opacity mt-4 inline-block text-center" 
              style={{ background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Connect With Us
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

