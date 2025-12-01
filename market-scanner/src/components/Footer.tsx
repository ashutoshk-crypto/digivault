'use client';

import Image from 'next/image';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Back To Top Button */}
      <div className="bg-gray-100 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-end">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 12L3 7L4.4 5.6L8 9.2L11.6 5.6L13 7L8 12Z" fill="currentColor"/>
            </svg>
            <span className="text-sm font-medium">Back To Top</span>
          </button>
        </div>
      </div>

      <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Left Section - Logo and Description */}
            <div className="md:col-span-1">
              <div className="mb-6">
                <Image
                  src="/digivault-logo.png"
                  alt="Digivault Custody"
                  width={200}
                  height={60}
                  className="h-auto"
                />
              </div>
              <p className="text-white text-sm leading-relaxed mb-4">
                Digivault is India's most trusted digital asset custody and infrastructure partner, helping organizations and individuals to securely build, manage, and scale their blockchain operations.
              </p>
              <p className="text-white text-sm mb-2">
                Digivault © 2023. All Rights Reserved
              </p>
              <a href="mailto:info@digivault.com" className="text-white text-sm hover:text-teal-400 transition-colors">
                info@digivault.com
              </a>
            </div>

            {/* Right Section - Navigation Links */}
            <div className="md:col-span-2 grid grid-cols-2 gap-8">
              {/* Policies Column */}
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase">
                  Policies
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      T&C
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      AML Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Trading Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>

              {/* Products Column */}
              <div>
                <h3 className="text-gray-400 text-sm font-semibold mb-4 uppercase">
                  Products
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Custody Wallets
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Bitcoin Custodian
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-white text-sm hover:text-teal-400 transition-colors">
                      Crypto Custodian
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

