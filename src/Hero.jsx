import React from 'react';

function Hero() {
  return (
    <div className="text-center max-w-7xl mx-auto py-20">
      <h1 className="text-6xl font-bold mb-8">
        <span className="text-white">NEX-MCF Versatile Tool</span>
        <br />
        <span className="text-white">for </span>
        <span className="text-[#F4A460]">Amazon MCF</span>
      </h1>
      <p className="text-gray-300 max-w-3xl mx-auto mb-8">
        Our innovative solution simplifies order management and fulfillment,
        streamlining operations across multiple sales channels with Amazon
        reliable logistics.
      </p>
      <button className="bg-white text-black px-8 py-3 rounded-full font-medium">
        Go to Dashboard
      </button>
    </div>
  );
}

export default Hero;