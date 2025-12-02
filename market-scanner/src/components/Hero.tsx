'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  return (
    <section className="relative bg-white flex flex-col">
      {/* Thin light blue vertical line on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-300 z-10"></div>
      
      <div className="flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[65vh] items-stretch">
            {/* Left Section - Text Content with White Background */}
            <div className="bg-white flex items-center px-4 sm:px-6 lg:px-12 xl:px-16 py-6 lg:py-8 pl-8 lg:pl-12 z-10">
              <div className="text-left w-full max-w-2xl ml-auto lg:ml-20 xl:ml-30 2xl:ml-40">
                <h1 className="text-black mb-4 lg:mb-5 whitespace-nowrap lg:whitespace-normal" style={{
                  fontFamily: 'Nexa, sans-serif',
                  fontWeight: 800,
                  fontSize: '62px',
                  lineHeight: '69.89px',
                  letterSpacing: '-0.02em'
                }}>
                  <span className="whitespace-nowrap">Secure. Compliant.</span>
                  <br />
                  Built for Scale.
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-black mb-4 lg:mb-5 leading-relaxed font-normal">
                  The Next-Generation
                  <br />
                  Digital Asset Custody for India
                </p>
                <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity">
                  <span className="w-3 h-3 bg-green-400 rounded-sm"></span>
                  <span className="font-medium text-base">Connect With Us</span>
                </button>
              </div>
            </div>

            {/* Right Section - Background Video */}
            <div className="hidden lg:block relative bg-white min-h-full overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                preload="auto"
              >
                <source src="/last%20video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Statistical Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl md:text-5xl font-bold text-black mb-2">
              $300M+
            </div>
            <div className="text-black text-sm md:text-base font-normal">
              Raised from Top Global Investors
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl md:text-5xl font-bold text-black mb-2">
              ~$2B
            </div>
            <div className="text-black text-sm md:text-base font-normal">
              Company Valuation
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl md:text-5xl font-bold text-black mb-2">
              2.5CR+
            </div>
            <div className="text-black text-sm md:text-base font-normal">
              Users Across Platform
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="text-4xl md:text-5xl font-bold text-black mb-2">
              ₹3,000CR+
            </div>
            <div className="text-black text-sm md:text-base font-normal">
              Assets Under Management
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

