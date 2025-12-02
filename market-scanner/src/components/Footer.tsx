'use client';

import Image from 'next/image';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const homeElement = document.getElementById('home');
    if (homeElement) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If we're on a different page, navigate to homepage
      window.location.href = '/';
    }
  };

  return (
    <>
      {/* Back To Top Button */}
      <div className="bg-gray-100 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L3 7L4.4 5.6L8 9.2L11.6 5.6L13 7L8 12Z" fill="currentColor"/>
            </svg>
            <span className="text-xs sm:text-sm font-medium">Back To Top</span>
          </button>
        </div>
      </div>

      <footer className="bg-black py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center">
            {/* Logo */}
            <div className="mb-3 sm:mb-4">
              <a 
                href="/" 
                onClick={handleLogoClick}
                className="inline-block cursor-pointer hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/digivault-logo.png"
                  alt="Digivault"
                  width={180}
                  height={54}
                  className="h-8 sm:h-10 md:h-12 w-auto mx-auto"
                />
              </a>
            </div>
            
            {/* Description - One Line */}
            <p className="text-white text-xs sm:text-sm leading-tight mb-3 sm:mb-4 sm:whitespace-nowrap w-full">
              Digivault is India's most trusted digital asset custody and infrastructure partner, helping organizations and individuals to securely build, manage, and scale their blockchain operations.
            </p>
            
            {/* Contact and Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <a 
                href="mailto:info@digivault.com" 
                className="text-white text-xs sm:text-sm hover:text-teal-400 transition-colors"
              >
                info@digivault.com
              </a>
              <span className="hidden sm:inline text-gray-500 text-xs">•</span>
              <p className="text-gray-400 text-xs sm:text-sm">
                Digivault © 2025. All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

