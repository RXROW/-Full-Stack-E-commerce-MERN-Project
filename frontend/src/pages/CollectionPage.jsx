// CollectionPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { Filter } from "lucide-react";
import FilterSideBar from "../components/Products/FilterSideBar";
import SortOptions from "../components/Products/SortOptions";
import { Link } from "react-router-dom";
import ProductGrid from "../components/Products/ProductGrid";

const CollectionPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    genders: [],
    colors: [],
    sizes: [],
    priceSort: "lowToHigh",
  });

  const sidebarRef = useRef(null);

  // Fetch products on component mount
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const fetchedProducts = [
        {
          _id: "1",
          name: "V-Neck Classic T-Shirt",
          price: 14.99,
          category: "topWear",
          gender: "men",
          colors: ["white", "black"],
          sizes: ["s", "m", "l", "xl"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=23",
              altText: "V-Neck T-Shirt",
            },
          ],
        },
        {
          _id: "2",
          name: "Oversized Graphic T-Shirt",
          price: 19.99,
          category: "topWear",
          gender: "men",
          colors: ["red", "yellow"],
          sizes: ["m", "l", "xl"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=13",
              altText: "Graphic T-Shirt",
            },
          ],
        },
        {
          _id: "3",
          name: "Regular-Fit Henley Shirt",
          price: 22.99,
          category: "topWear",
          gender: "men",
          colors: ["white"],
          sizes: ["s", "m", "l"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=9",
              altText: "Henley Shirt",
            },
          ],
        },
        {
          _id: "4",
          name: "Polo T-Shirt with Ribbed Collar",
          price: 24.99,
          category: "topWear",
          gender: "men",
          colors: ["green"],
          sizes: ["m", "l", "xl"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=1",
              altText: "Polo T-Shirt",
            },
          ],
        },
        {
          _id: "5",
          name: "Slim-Fit Chino Pants",
          price: 29.99,
          category: "bottomWear",
          gender: "men",
          colors: ["black", "blue", "cream"],
          sizes: ["s", "m", "l"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=2",
              altText: "Chino Pants",
            },
          ],
        },
        {
          _id: "6",
          name: "Floral Print Blouse",
          price: 24.99,
          category: "topWear",
          gender: "women",
          colors: ["pink", "cream"],
          sizes: ["xs", "s", "m"],
          images: [
            {
              url: "https://picsum.photos/500/500?random=5",
              altText: "Floral Blouse",
            },
          ],
        },
      ];

      setProducts(fetchedProducts);
      setFilteredProducts(fetchedProducts);
      setLoading(false);
    }, 1000);
  }, []);

  // Apply filters to products
  const applyFilters = (filters) => {
    setActiveFilters(filters);

    let results = [...products];

    // Filter by category
    if (filters.categories.length > 0) {
      results = results.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by gender
    if (filters.genders.length > 0) {
      results = results.filter((product) =>
        filters.genders.includes(product.gender)
      );
    }

    // Filter by color
    if (filters.colors.length > 0) {
      results = results.filter((product) =>
        product.colors.some((color) => filters.colors.includes(color))
      );
    }

    // Filter by size
    if (filters.sizes.length > 0) {
      results = results.filter((product) =>
        product.sizes.some((size) => filters.sizes.includes(size))
      );
    }

    // Sort by price
    if (filters.priceSort === "lowToHigh") {
      results.sort((a, b) => a.price - b.price);
    } else {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(results);
  };

  // Handle click outside sidebar to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Close sidebar when pressing escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on mobile, static on desktop */}
      <div className="lg:flex">
        <div
          className={`fixed inset-y-0 left-0 z-30 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 lg:w-64 lg:min-h-screen transition duration-200 ease-in-out`}
        >
          <FilterSideBar
            ref={sidebarRef}
            isOpen={true} // Always true because visibility controlled by parent div
            onClose={() => setSidebarOpen(false)}
            applyFilters={applyFilters}
          />
        </div>

        {/* Main content */}
        <div className="flex-1">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pt-6 pb-24">
              <div className=" flex items-center  justify-between">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  ALL COLLECTION
                </h1>
                <div className="">
                  <SortOptions
                    applyFilters={applyFilters}
                    activeFilters={activeFilters}
                  />
                </div>
              </div>

              <div className="pt-12">
                {/* Mobile filter button and sort */}
                <div className="flex items-center justify-between lg:hidden mb-6">
                  <button
                    type="button"
                    className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <Filter
                      className="flex-shrink-0 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Filters</span>
                  </button>

                  <div className="flex items-center">
                    <label htmlFor="mobile-sort" className="sr-only">
                      Sort
                    </label>
                    <select
                      id="mobile-sort"
                      name="sort"
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      onChange={(e) =>
                        applyFilters({
                          ...activeFilters,
                          priceSort: e.target.value,
                        })
                      }
                      value={activeFilters.priceSort}
                    >
                      <option value="lowToHigh">Price: Low to High</option>
                      <option value="highToLow">Price: High to Low</option>
                    </select>
                  </div>
                </div>

                {/* Product grid */}
                <div className="w-full">
                  {loading ? (
                    // Loading skeleton
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-3 px-1">
                      {Array.from({ length: 6 }).map((_, index) => (
                        <div
                          key={index}
                          className="animate-pulse bg-white rounded-lg overflow-hidden p-4"
                        >
                          <div className="w-full h-60 bg-gray-200 rounded-lg" />
                          <div className="mt-4 h-4 bg-gray-200 rounded w-3/4 mb-2" />
                          <div className="h-4 bg-gray-200 rounded w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : filteredProducts.length === 0 ? (
                    // No results
                    <div className="text-center py-12">
                      <h3 className="text-lg font-medium text-gray-900">
                        No products found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your filters to find what you're looking
                        for.
                      </p>
                    </div>
                  ) : (
                    <ProductGrid products={filteredProducts} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
