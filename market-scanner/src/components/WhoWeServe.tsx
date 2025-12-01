'use client';

export default function WhoWeServe() {
  const audiences = [
    {
      id: 1,
      title: 'Individuals',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-green-500">
          <circle cx="60" cy="40" r="25" fill="currentColor"/>
          <path d="M30 100C30 80 45 70 60 70C75 70 90 80 90 100" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none"/>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'HNIs',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-green-500">
          <path d="M60 20L70 40L90 45L75 60L78 80L60 70L42 80L45 60L30 45L50 40L60 20Z" fill="currentColor"/>
          <rect x="50" y="85" width="20" height="30" rx="5" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Institutions',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-green-500">
          <rect x="20" y="40" width="80" height="60" rx="5" fill="currentColor"/>
          <rect x="35" y="55" width="15" height="15" fill="white"/>
          <rect x="55" y="55" width="15" height="15" fill="white"/>
          <rect x="75" y="55" width="15" height="15" fill="white"/>
          <rect x="35" y="75" width="15" height="15" fill="white"/>
          <rect x="55" y="75" width="15" height="15" fill="white"/>
          <rect x="75" y="75" width="15" height="15" fill="white"/>
          <path d="M60 20L70 30L60 35L50 30L60 20Z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      id: 4,
      title: 'Web3 teams',
      icon: (
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="text-green-500">
          <rect x="30" y="30" width="30" height="30" rx="3" fill="currentColor"/>
          <rect x="70" y="30" width="30" height="30" rx="3" fill="currentColor"/>
          <rect x="30" y="70" width="30" height="30" rx="3" fill="currentColor"/>
          <rect x="70" y="70" width="30" height="30" rx="3" fill="currentColor"/>
          <line x1="45" y1="45" x2="85" y2="45" stroke="currentColor" strokeWidth="3"/>
          <line x1="45" y1="85" x2="85" y2="85" stroke="currentColor" strokeWidth="3"/>
          <line x1="45" y1="45" x2="45" y2="85" stroke="currentColor" strokeWidth="3"/>
          <line x1="85" y1="45" x2="85" y2="85" stroke="currentColor" strokeWidth="3"/>
        </svg>
      ),
    },
  ];

  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
            Who We Serve
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => (
            <div
              key={audience.id}
              className="bg-gray-100 rounded-lg p-6 relative overflow-hidden"
            >
              {/* Title */}
              <h3 className="text-2xl font-bold text-black mb-4 relative z-10">
                {audience.title}
              </h3>

              {/* Icon - positioned bottom-right, partially cropped */}
              <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-80">
                {audience.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

