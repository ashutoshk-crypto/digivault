'use client';

export default function OperationsExcellence() {
  const features = [
    {
      id: 1,
      title: 'Robust Processes',
      description: 'Proven systems built from managing ₹3,000+ crore across exchanges.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
          <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'Custom Workflows',
      description: 'Designed for Indian businesses with compliance-ready frameworks.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 3,
      title: '24/7 Local Support',
      description: 'Always-on assistance from teams who understand your needs.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">
          <path d="M12 2L4 5V11C4 16.55 7.16 21.74 12 23C16.84 21.74 20 16.55 20 11V5L12 2Z" fill="currentColor"/>
          <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Rapid Implementation',
      description: 'Fast, seamless deployment backed by deep integration expertise.',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-500">
          <path d="M12 2C8 2 5 4 5 8C5 12 8 16 12 20C16 16 19 12 19 8C19 4 16 2 12 2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M8 10C9 11 10 12 12 12C14 12 15 11 16 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Our Operations Excellence
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-100 rounded-lg p-6 shadow-sm"
            >
              {/* Icon */}
              <div className="mb-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

