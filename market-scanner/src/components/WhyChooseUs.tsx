'use client';

export default function WhyChooseUs() {
  return (
    <section className="relative bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Why Choose
              <br />
              Us
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Lorem Ipsum is simply dummy text of the.
            </p>
          </div>

          {/* Right Side - Feature Cards with Background Pattern */}
          <div className="relative min-h-[500px]">
            {/* Background Pattern Image */}
            <div 
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: 'url(/mask-group.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'bottom right',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
            
            {/* Feature Cards Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-10 pt-4">
              {/* Card 1: 8+ Years */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                      {/* Gear-like border */}
                      <path d="M12 6L13 9L16 10L13 11L12 14L11 11L8 10L11 9L12 6Z" stroke="white" strokeWidth="1.5" fill="none"/>
                      <path d="M12 8L13 9L14 8L13 7L12 8Z" stroke="white" strokeWidth="1.5" fill="none"/>
                      <path d="M12 12L13 13L14 12L13 11L12 12Z" stroke="white" strokeWidth="1.5" fill="none"/>
                      {/* Checkmark */}
                      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">8+ Years</h3>
                <p className="text-black text-sm">
                  Deep Understanding of Regulatory & Operational Requirements
                </p>
              </div>

              {/* Card 2: Dual Expertise */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Dual Expertise</h3>
                <p className="text-black text-sm">
                  Only Group With SEBI-Regulated Equity + Crypto Businesses
                </p>
              </div>

              {/* Card 3: Global-Grade Security */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z" fill="currentColor"/>
                      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Global-Grade Security</h3>
                <p className="text-black text-sm">
                  Regular Audits by Leading Security Firms
                </p>
              </div>

              {/* Card 4: India-Focused Compliance */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                      {/* Simplified India map outline */}
                      <path d="M12 2C8 2 5 4 5 8C5 12 8 16 12 20C16 16 19 12 19 8C19 4 16 2 12 2Z" stroke="white" strokeWidth="1.5" fill="none"/>
                      <path d="M8 10C9 11 10 12 12 12C14 12 15 11 16 10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">India-Focused Compliance</h3>
                <p className="text-black text-sm">
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

