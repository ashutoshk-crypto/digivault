'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <header className="bg-black w-full">
      <nav className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center flex-shrink-0">
          <Image
            src="/digivault-logo.png"
            alt="Digivault Custody"
            width={200}
            height={60}
            className="h-auto"
            priority
          />
        </div>

        {/* Navigation Links and CTA */}
        <div className="flex items-center gap-8 flex-shrink-0">
          <div className="relative">
            <button
              className="text-white font-sans text-base flex items-center gap-1 hover:text-teal-400 transition-colors"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              Products
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="mt-0.5"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {isProductsOpen && (
              <div
                className="absolute top-full left-0 mt-2 bg-gray-900 rounded-lg shadow-lg py-2 min-w-[200px]"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
                {/* Dropdown items can be added here */}
              </div>
            )}
          </div>
          
          <a
            href="#experience"
            className="text-white font-sans text-base hover:text-teal-400 transition-colors"
          >
            Experience
          </a>
          
          <a
            href="#security"
            className="text-white font-sans text-base hover:text-teal-400 transition-colors"
          >
            Security
          </a>
          
          <a
            href="#excellence"
            className="text-white font-sans text-base hover:text-teal-400 transition-colors"
          >
            Excellence
          </a>
          
          <a
            href="#audience"
            className="text-white font-sans text-base hover:text-teal-400 transition-colors"
          >
            Audience
          </a>

          {/* CTA Button */}
          <button className="text-white font-sans text-base px-6 py-3 rounded-lg hover:opacity-90 transition-opacity flex-shrink-0" style={{ background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)' }}>
            Connect With Us
          </button>
        </div>
      </nav>
    </header>
  );
}

