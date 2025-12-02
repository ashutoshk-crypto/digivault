'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure video plays when component mounts
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // Set volume to 0 to ensure muted (required for autoplay on mobile)
          videoRef.current.volume = 0;
          
          // Set attributes for mobile compatibility (iOS and Android)
          videoRef.current.setAttribute('webkit-playsinline', 'true');
          videoRef.current.setAttribute('x5-playsinline', 'true');
          videoRef.current.setAttribute('x5-video-player-type', 'h5');
          videoRef.current.setAttribute('x5-video-player-fullscreen', 'false');
          
          await videoRef.current.play();
        } catch (error) {
          console.log('Video autoplay failed:', error);
          // On mobile, try to play after user interaction
          const handleUserInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('click', handleUserInteraction);
          };
          document.addEventListener('touchstart', handleUserInteraction, { once: true });
          document.addEventListener('click', handleUserInteraction, { once: true });
        }
      }
    };
    
    playVideo();
  }, []);

  return (
    <section id="home" className="relative bg-white flex flex-col">
      {/* Thin light blue vertical line on the left */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 sm:w-1 bg-blue-300 z-10"></div>
      
      <div className="flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] sm:min-h-[60vh] lg:min-h-[65vh] items-stretch">
            {/* Left Section - Text Content with White Background */}
            <div className="bg-white flex items-center px-4 sm:px-6 lg:px-12 xl:px-16 py-8 sm:py-10 lg:py-8 pl-6 sm:pl-8 lg:pl-12 z-10 order-2 lg:order-1">
              <div className="text-left w-full max-w-2xl mx-auto lg:ml-auto lg:ml-20 xl:ml-30 2xl:ml-40">
                <h1 className="text-black mb-4 lg:mb-5" style={{
                  fontFamily: 'Nexa, sans-serif',
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 8vw, 62px)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}>
                  <span>Secure. Compliant.</span>
                  <br />
                  <span>Built for Scale.</span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black mb-6 sm:mb-8 lg:mb-5 leading-relaxed font-normal">
                  The Next-Generation
                  <br />
                  Digital Asset Custody for India
                </p>
                <button className="bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg flex items-center gap-3 hover:opacity-90 transition-opacity w-full sm:w-auto justify-center sm:justify-start">
                  <span className="w-3 h-3 bg-green-400 rounded-sm flex-shrink-0"></span>
                  <span className="font-medium text-sm sm:text-base">Connect with Us</span>
                </button>
              </div>
            </div>

            {/* Right Section - Background Video */}
            <div className="relative bg-white min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden order-1 lg:order-2">
              <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                preload="auto"
                style={{ pointerEvents: 'none' }}
              >
                <source src="/last%20video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Statistical Cards */}
      <div className="relative mx-auto mb-4 sm:mb-6 lg:mb-10 pb-4 sm:pb-6 px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <div 
            className="rounded-lg p-3 sm:p-4 lg:p-6 text-left min-h-[90px] sm:min-h-[120px] lg:min-h-[165px] flex flex-col justify-center"
            style={{
              backgroundColor: '#F7F8FA',
              boxShadow: '0px 0px 0px 1px #E9EBF1'
            }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-1 sm:mb-2">
              $300M+
            </div>
            <div className="text-black text-xs sm:text-sm md:text-base font-normal leading-tight">
              Raised from Top Global Investors
            </div>
          </div>
          
          <div 
            className="rounded-lg p-3 sm:p-4 lg:p-6 text-left min-h-[90px] sm:min-h-[120px] lg:min-h-[165px] flex flex-col justify-center"
            style={{
              backgroundColor: '#F7F8FA',
              boxShadow: '0px 0px 0px 1px #E9EBF1'
            }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-1 sm:mb-2">
              ~$2B
            </div>
            <div className="text-black text-xs sm:text-sm md:text-base font-normal leading-tight">
              Company Valuation
            </div>
          </div>
          
          <div 
            className="rounded-lg p-3 sm:p-4 lg:p-6 text-left min-h-[90px] sm:min-h-[120px] lg:min-h-[165px] flex flex-col justify-center"
            style={{
              backgroundColor: '#F7F8FA',
              boxShadow: '0px 0px 0px 1px #E9EBF1'
            }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-1 sm:mb-2">
              2.5CR+
            </div>
            <div className="text-black text-xs sm:text-sm md:text-base font-normal leading-tight">
              Users Across Platform
            </div>
          </div>
          
          <div 
            className="rounded-lg p-3 sm:p-4 lg:p-6 text-left min-h-[90px] sm:min-h-[120px] lg:min-h-[165px] flex flex-col justify-center"
            style={{
              backgroundColor: '#F7F8FA',
              boxShadow: '0px 0px 0px 1px #E9EBF1'
            }}
          >
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-1 sm:mb-2">
              ₹3,000CR+
            </div>
            <div className="text-black text-xs sm:text-sm md:text-base font-normal leading-tight">
              Assets Under Management
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

