import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ExploreNewArrivals = () => {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=7", altText: "Stylish Jacket" }],
      category: "Outerwear"
    },
    {
      _id: "9",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Stylish Jacket" }],
      category: "Outerwear"
    },
    {
      _id: "7",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" }],
      category: "Outerwear"
    },
    {
      _id: "2",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=4", altText: "Stylish Jacket" }],
      category: "Outerwear"
    },
    {
      _id: "3",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" }],
      category: "Outerwear"
    },
    {
      _id: "4",
      name: "Stylish Jacket",
      price: 120,
      images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }],
      category: "Outerwear"
    }
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll);
      checkScroll();
      return () => scrollContainer.removeEventListener('scroll', checkScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-6 text-center py-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Explore New Arrivals
          </h2>
          <p className="text-gray-600">
            Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
          </p>
        </div>

        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {newArrivals.map((item) => (
              <div
                key={item._id}
                className="min-w-[270px] relative overflow-hidden rounded"
              >
                <div className="relative h-full">
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].altText}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute bg-slate-950/30 backdrop-blur-sm bottom-0 left-0 p-2   w-full">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-white font-medium">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {showLeftButton && (
            <button
              onClick={() => scroll('left')}
              className="absolute right-12  -top-10 -translate-y-1/2 p-2 ring-1 ring-gray-700 bg-gray-100/90 rounded  z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-900" />
            </button>
          )}

          {showRightButton && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 -top-10 -translate-y-1/2 p-2 ring-1 ring-gray-700 bg-gray-100/90 rounded  z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-900" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ExploreNewArrivals;