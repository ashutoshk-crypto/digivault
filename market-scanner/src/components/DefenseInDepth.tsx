'use client';

export default function DefenseInDepth() {
  const securityFeatures = [
    { id: 1, text: 'Zero Gas Fee Deposits', angle: 30 }, // Top-right (1-2 o'clock)
    { id: 2, text: 'Instant MPC Transfers', angle: 60 }, // Mid-right (3-4 o'clock)
    { id: 3, text: 'Enterprise Access Controls', angle: 120 }, // Bottom-right (5 o'clock)
    { id: 4, text: 'Multi-Level Approver Workflows', angle: 180 }, // Bottom-center (6 o'clock)
    { id: 5, text: 'Fireblocks Infrastructure', angle: 240 }, // Bottom-left (7 o'clock)
    { id: 6, text: 'Enterprise-Grade Encryption', angle: 270 }, // Mid-left (8-9 o'clock)
    { id: 7, text: 'MPC Multi-Layer Security', angle: 315 }, // Top-left (10-11 o'clock)
  ];

  const radius = 280; // Distance from center to feature boxes

  const getPosition = (angle: number) => {
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <section className="relative bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Central Lock with Features */}
        <div className="relative flex items-center justify-center min-h-[700px]">
          {/* Green Circle - encompasses title and lock */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[600px] h-[600px] border-2 border-green-400 rounded-full"></div>
          </div>

          {/* Title - inside the circle, above the lock */}
          <div className="absolute top-[15%] left-1/2 -translate-x-1/2 z-20 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              <span className="text-black">Defense in</span>
              <br />
              <span className="text-green-500">Depth Security</span>
            </h2>
          </div>

          {/* Combination Lock - center of the circle */}
          <div className="relative z-10 mt-16">
            <div 
              className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
              style={{
                backgroundImage: 'url(/Background.png)',
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
            </div>
          </div>

          {/* Dashed Lines connecting features to circle */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" style={{ overflow: 'visible' }}>
            {securityFeatures.map((feature) => {
              const radian = (feature.angle * Math.PI) / 180;
              const circleRadius = 300; // Circle radius
              const lineLength = radius - circleRadius; // Distance from circle edge to feature box
              const startX = Math.cos(radian) * circleRadius;
              const startY = Math.sin(radian) * circleRadius;
              const endX = Math.cos(radian) * radius;
              const endY = Math.sin(radian) * radius;
              return (
                <line
                  key={`line-${feature.id}`}
                  x1={`calc(50% + ${startX}px)`}
                  y1={`calc(50% + ${startY}px)`}
                  x2={`calc(50% + ${endX}px)`}
                  y2={`calc(50% + ${endY}px)`}
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
              );
            })}
          </svg>

          {/* Security Feature Boxes - positioned around the circle */}
          {securityFeatures.map((feature) => {
            const position = getPosition(feature.angle);
            return (
              <div
                key={feature.id}
                className="absolute z-20"
                style={position}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <div className="bg-white px-4 py-2 rounded-lg shadow-md whitespace-nowrap">
                    <span className="text-sm md:text-base text-black font-medium">
                      {feature.text}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


