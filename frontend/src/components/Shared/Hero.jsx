import React from 'react';
import bgHero from "../../assets/images/bg-hero.jpg"
const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative h-[600px] w-full">
        <div className="absolute inset-0">
          <img
            src={bgHero}
            alt="Hero background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 h-full flex justify-center text-center items-center">
          <div className="text-center md:text-left max-w-xl">
            <h1 className="text-4xl font-bold text-center tracking-tight text-white sm:text-5xl lg:text-6xl">
              New Season Arrivals
            </h1>
            <p className="mt-6 text-xl text-center text-gray-100">
              Discover our latest collection of premium clothing and accessories. 
              Up to 40% off on selected items.
            </p>
            <div className="mt-10 flex flex-col text-center sm:flex-row gap-4 justify-center">
              <button className="bg-white text-center text-gray-900 px-8 py-3 rounded text-base font-medium hover:bg-gray-100 transition-colors">
                Shop Women
              </button>
              <button className="bg-red-600 text-white px-8 py-3 rounded text-base font-medium hover:bg-red-800 transition-colors">
                Shop Men
              </button>
            </div>

            {/* Featured Benefits */}
            <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 max-w-2xl">
              <div className="flex items-center justify-center md:justify-start space-x-2 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"/>
                </svg>
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-white">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-white col-span-2 md:col-span-1">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Promotional Banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white py-3">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm font-medium">Limited Time Offer</span>
            <span className="text-sm">|</span>
            <span className="text-sm">Free Shipping on Orders Over $50</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;