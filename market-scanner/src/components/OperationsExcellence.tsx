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
    <section id="excellence" className="relative bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Operations Excellence
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mx-auto w-full max-w-4xl">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-gray-100 shadow-sm rounded-2xl p-3 sm:p-4 md:p-5 lg:p-7 min-h-[180px] sm:min-h-[220px] md:min-h-[260px] lg:min-h-[280px] flex flex-col"
            >
              {/* Icon */}
              <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6 flex justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center">
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
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-1.5 sm:mb-2 md:mb-3 text-left">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-black text-xs sm:text-sm md:text-base leading-tight sm:leading-relaxed text-left flex-grow">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

