'use client';

export default function StickyMobileCTA() {
  const handleConnect = () => {
    window.open('https://form.typeform.com/to/t6Xqnmr1', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Container with safe area padding for devices with notches/home indicators */}
      <div 
        className="px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]"
        style={{
          paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))'
        }}
      >
        <button
          onClick={handleConnect}
          className="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-full font-bold text-sm sm:text-base md:text-lg text-black transition-all duration-300 hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          style={{
            background: 'linear-gradient(90deg, #04B9B2 0%, #1EC677 100%)',
            boxShadow: '0 4px 12px rgba(4, 185, 178, 0.3)',
          }}
        >
          Request Demo
        </button>
      </div>
    </div>
  );
}

