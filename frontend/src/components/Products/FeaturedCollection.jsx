import React from 'react';

const FeaturedCollection = () => {
  return (
    <section className="container bg-white  py-16  ">
      <div className="container mx-auto px-4 bg-gradient-to-r rounded-xl from-green-50 to-gray-50">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Content */}
          <div className="lg:w-1/2 lg:p-12 mb-8 lg:mb-0">
            <div className="max-w-md">
              <span className="text-gray-600 font-medium">Comfort and Style</span>
              <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
                Apparel made for your everyday life
              </h2>
              <p className="text-gray-600 mb-8">
                Discover high-quality, comfortable clothing that effortlessly blends fashion and
                function. Designed to make you look and feel great every day.
              </p>
              <button className="bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="lg:w-1/2">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://picsum.photos/500/500?random=5" 
                alt="Group of diverse people in yoga and fitness apparel" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollection;