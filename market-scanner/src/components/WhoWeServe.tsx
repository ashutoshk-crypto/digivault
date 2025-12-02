'use client';

import Image from 'next/image';

export default function WhoWeServe() {
  const audiences = [
    {
      id: 1,
      title: 'Individuals',
      image: '/individual.png',
    },
    {
      id: 2,
      title: 'HNIs',
      image: '/hni.png',
    },
    {
      id: 3,
      title: 'Institutions',
      image: '/institution.png',
    },
    {
      id: 4,
      title: 'Web3 teams',
      image: '/web3.png',
    },
  ];

  return (
    <section id="audience" className="relative bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ scrollMarginTop: '80px' }}>
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-4 sm:mb-6 lg:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Who We Serve
          </h2>
        </div>

        {/* Images Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              className="flex items-center justify-center"
            >
              {/* Image */}
              <Image
                src={audience.image}
                alt={audience.title}
                width={400}
                height={400}
                className="object-contain w-full h-auto max-w-full"
                priority={audience.id <= 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

