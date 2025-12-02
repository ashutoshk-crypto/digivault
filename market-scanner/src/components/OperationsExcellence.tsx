'use client';

import Image from 'next/image';

export default function OperationsExcellence() {
  const features = [
    {
      id: 1,
      title: 'Robust Processes',
      description: 'Proven systems built from managing ₹3,000+ crore across exchanges.',
      image: '/o1.png',
    },
    {
      id: 2,
      title: 'Custom Workflows',
      description: 'Designed for Indian businesses with compliance-ready frameworks.',
      image: '/o2.png',
    },
    {
      id: 3,
      title: '24/7 Local Support',
      description: 'Always-on assistance from teams who understand your needs.',
      image: '/o3.png',
    },
    {
      id: 4,
      title: 'Rapid Implementation',
      description: 'Fast, seamless deployment backed by deep integration expertise.',
      image: '/o4.png',
    },
  ];

  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Operations Excellence
          </h2>
        </div>

        {/* Cards Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 justify-items-center mx-auto"
          style={{ 
            gap: '12.68px',
            width: '816px',
            height: '576px',
            maxWidth: '100%'
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-100 shadow-sm"
              style={{
                width: '401.66px',
                maxWidth: '100%',
                height: '281.66px',
                borderRadius: '16px',
                paddingTop: '22.82px',
                paddingRight: '30.43px',
                paddingBottom: '22.82px',
                paddingLeft: '30.43px',
              }}
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 flex items-center justify-center">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={80}
                    height={80}
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-3 text-left">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black text-base leading-relaxed text-left">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

