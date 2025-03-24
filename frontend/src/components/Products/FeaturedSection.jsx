import React from 'react';
import { Truck, RotateCcw, ShieldCheck } from 'lucide-react';

const FeaturedSection = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-gray-800" />,
      title: "FREE INTERNATIONAL SHIPPING",
      description: "On all orders over $100.00"
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-gray-800" />,
      title: "45 DAYS RETURN",
      description: "Money back guarantee"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-gray-800" />,
      title: "SECURE CHECKOUT",
      description: "100% secured checkout process"
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;