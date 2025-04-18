import React from 'react';

function IntegrationSection() {
  const integrations = [
    {
      title: 'Shopify',
      logo: '🛍️',
      description: 'Integrate your Shopify store to sync products, orders, and customers.',
    },
    {
      title: 'eBay',
      logo: '📦',
      description: 'Connect your eBay account to manage listings and orders in one place.',
    },
    {
      title: 'Custom Website',
      logo: '💻',
      description: 'Use our API to integrate sales from your custom-built website.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 bg-[#111] rounded-xl">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xl">NEX - MCF</span>
        <button className="text-sm bg-transparent border border-gray-600 px-3 py-1 rounded">
          &lt;
        </button>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Integrate Sales Channels</h2>
      <p className="text-gray-400 mb-8">
        Connect your various sales channels to our dashboard for centralized management and reporting.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {integrations.map((integration) => (
          <div key={integration.title} className="bg-[#1A1A1A] p-6 rounded-lg">
            <div className="text-4xl mb-4">{integration.logo}</div>
            <h3 className="text-xl font-bold mb-2">{integration.title}</h3>
            <p className="text-gray-400 mb-4">{integration.description}</p>
            <button className="bg-white text-black px-6 py-2 rounded-full w-full">
              Integrate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntegrationSection;