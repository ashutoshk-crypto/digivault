'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Close mobile menu first
      setIsMobileMenuOpen(false);
      
      // Wait for menu to close, then calculate scroll position
      setTimeout(() => {
        // Dynamically calculate header height to account for different screen sizes
        const header = document.querySelector('header');
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        
        // Get the target element's position relative to viewport
        const elementPosition = targetElement.getBoundingClientRect().top;
        // Calculate scroll position accounting for header
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
      }, 150); // Small delay to allow mobile menu animation to complete
    } else if (targetId === 'home') {
      // If home element not found, navigate to homepage
      window.location.href = '/';
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const homeElement = document.getElementById('home');
    if (homeElement) {
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    } else {
      // If we're on a different page, navigate to homepage
      window.location.href = '/';
    }
  };

  return (
    <header className="bg-black w-full sticky top-0 z-50">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <a href="/" onClick={handleLogoClick} className="flex items-center flex-shrink-0">
          <Image
            src="/digivault-logo.png"
            alt="Digivault"
            width={180}
            height={54}
            className="h-8 sm:h-10 md:h-12 w-auto"
            priority
          />
        </a>

        {/* Desktop Navigation Links and CTA */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 flex-shrink-0">
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, 'experience')}
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Experience
          </a>
          
          <a
            href="#security"
            onClick={(e) => handleNavClick(e, 'security')}
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Security
          </a>
          
          <a
            href="#excellence"
            onClick={(e) => handleNavClick(e, 'excellence')}
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Excellence
          </a>
          
          <a
            href="#audience"
            onClick={(e) => handleNavClick(e, 'audience')}
            className="text-white font-sans text-sm xl:text-base hover:text-teal-400 transition-colors"
          >
            Audience
          </a>

          {/* CTA Button */}
          <a 
            href="https://form.typeform.com/to/t6Xqnmr1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black font-sans font-bold text-sm xl:text-base px-4 xl:px-6 py-2 xl:py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0 inline-block text-center" 
            style={{ background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)' }}
          >
            Request Demo
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
              onClick={(e) => handleNavClick(e, 'experience')}
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
            >
              Experience
            </a>
            <a
              href="#security"
              onClick={(e) => handleNavClick(e, 'security')}
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
            >
              Security
            </a>
            <a
              href="#excellence"
              onClick={(e) => handleNavClick(e, 'excellence')}
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
            >
              Excellence
            </a>
            <a
              href="#audience"
              onClick={(e) => handleNavClick(e, 'audience')}
              className="block text-white font-sans text-base hover:text-teal-400 transition-colors py-2"
            >
              Audience
            </a>
            <a 
              href="https://form.typeform.com/to/t6Xqnmr1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-full font-bold text-sm sm:text-base md:text-lg text-black transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 mt-4 inline-block text-center" 
              style={{ 
                background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)',
                boxShadow: '0 4px 12px rgba(4, 185, 178, 0.3)'
              }}
            >
              Request Demo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

