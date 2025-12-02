'use client';

import Image from 'next/image';

export default function CTABanner() {
  return (
    <section id="cta" className="relative bg-white py-6 sm:py-8 lg:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Image
          src="/cta.png"
          alt="Ready to See Digivault Custody at Work?"
          width={1200}
          height={400}
          className="w-full h-auto rounded-xl sm:rounded-2xl"
          priority
        />
      </div>
    </section>
  );
}

