'use client';

export default function CTABanner() {
  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Banner Container with rounded corners */}
        <div 
          className="relative rounded-2xl overflow-hidden"
          style={{ backgroundColor: '#1EC677' }}
        >
          {/* Grid Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
            }}
          ></div>

          <div className="relative z-10 py-12 px-8 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Left Section - Text and Button */}
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
                  Ready to See Digivault
                  <br />
                  Custody at Work?
                </h2>
                <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center gap-2 mx-auto lg:mx-0 hover:opacity-90 transition-opacity">
                  <span className="w-2 h-2 bg-white rounded-full"></span>
                  <span className="font-medium">Connect with Us</span>
                </button>
              </div>

              {/* Right Section - Vault Door Image */}
              <div className="hidden lg:block relative">
                <div 
                  className="w-full h-96 rounded-lg overflow-hidden"
                  style={{
                    backgroundImage: 'url(/Container.png)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center right',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

