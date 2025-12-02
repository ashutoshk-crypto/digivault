'use client';

export default function WhyChooseUs() {
  return (
    <section className="relative bg-black py-12 px-4 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Why Choose
              <br />
              Us
            </h2>
           
          </div>

          {/* Right Side - Feature Cards */}
          <div className="relative min-h-[500px]">
            
            {/* Feature Cards Grid */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 z-10 pt-4">
              {/* Card 1: 8+ Years */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <img 
                    src="/c1.png" 
                    alt="8+ Years Experience" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">8+ Years</h3>
                <p className="text-black text-sm">
                  Deep Understanding of Regulatory & Operational Requirements
                </p>
              </div>

              {/* Card 2: Dual Expertise */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <img 
                    src="/c2.png" 
                    alt="Dual Expertise" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Dual Expertise</h3>
                <p className="text-black text-sm">
                  Only Group With SEBI-Regulated Equity + Crypto Businesses
                </p>
              </div>

              {/* Card 3: Global-Grade Security */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <img 
                    src="/c3.png" 
                    alt="Global-Grade Security" 
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Global-Grade Security</h3>
                <p className="text-black text-sm">
                  Regular Audits by Leading Security Firms
                </p>
              </div>

              {/* Card 4: India-Focused Compliance */}
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <div className="mb-4">
                  <img 
                    src="/c4.png" 
                    alt="India-Focused Compliance" 
                    className="w-12 h-12 object-contain"
                  />
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

