'use client';

export default function WhyChooseUs() {
  return (
    <section id="experience" className="relative bg-black py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: '80px' }}>
      {/* Background Pattern Image - Full Section */}
      <div 
        className="absolute inset-0 opacity-80"
        style={{
          backgroundImage: 'url(/mask-group.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start lg:items-center">
          {/* Left Side - Text Content */}
          <div className="text-white mb-4 sm:mb-6 lg:mb-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 leading-tight">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-4 sm:mb-6 leading-relaxed">
              Trusted by India's leading investors with proven expertise in regulatory compliance and enterprise-grade security
            </p>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="relative min-h-0 sm:min-h-[400px] lg:min-h-[500px]">
            
            {/* Feature Cards Grid */}
            <div className="relative grid grid-cols-2 gap-3 sm:gap-4 z-10 pt-2 sm:pt-4">
              {/* Card 1: 8+ Years */}
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <img 
                    src="/c1.png" 
                    alt="8+ Years Experience" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">8+ Years</h3>
                <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed">
                  Deep Understanding of Regulatory & Operational Requirements
                </p>
              </div>

              {/* Card 2: Dual Expertise */}
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <img 
                    src="/c2.png" 
                    alt="Dual Expertise" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">Dual Expertise</h3>
                <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed">
                  Only Group With SEBI-Regulated Equity + Crypto Businesses
                </p>
              </div>

              {/* Card 3: Global-Grade Security */}
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <img 
                    src="/c3.png" 
                    alt="Global-Grade Security" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">Global-Grade Security</h3>
                <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed">
                  Regular Audits by Leading Security Firms
                </p>
              </div>

              {/* Card 4: India-Focused Compliance */}
              <div className="bg-white rounded-lg p-3 sm:p-4 lg:p-6 shadow-lg">
                <div className="mb-2 sm:mb-3 lg:mb-4">
                  <img 
                    src="/c4.png" 
                    alt="India-Focused Compliance" 
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 object-contain"
                  />
                </div>
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black mb-1 sm:mb-2">India-Focused Compliance</h3>
                <p className="text-black text-xs sm:text-sm leading-tight sm:leading-relaxed">
                  Deep Understanding of Regulatory & Operational Requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

