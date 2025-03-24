import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const FilterSideBar = React.forwardRef(({ isOpen, onClose }, ref) => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Toggle section visibility states
  const [sections, setSections] = useState({
    category: true,
    gender: true,
    color: true,
    size: true,
    brand: true,
    priceRange: true,
  });

  // Filter states - initialized from URL params
  const [categoryFilters, setCategoryFilters] = useState({
    topWear: searchParams.get("topWear") === "true",
    bottomWear: searchParams.get("bottomWear") === "true",
  });

  const [genderFilters, setGenderFilters] = useState({
    men: searchParams.get("men") === "true",
    women: searchParams.get("women") === "true",
  });

  const [colorFilters, setColorFilters] = useState({
    red: searchParams.get("color_red") === "true",
    blue: searchParams.get("color_blue") === "true",
    black: searchParams.get("color_black") === "true",
    green: searchParams.get("color_green") === "true",
    yellow: searchParams.get("color_yellow") === "true",
    gray: searchParams.get("color_gray") === "true",
    pink: searchParams.get("color_pink") === "true",
    cream: searchParams.get("color_cream") === "true",
    navy: searchParams.get("color_navy") === "true",
  });

  const [sizeFilters, setSizeFilters] = useState({
    xs: searchParams.get("size_xs") === "true",
    s: searchParams.get("size_s") === "true",
    m: searchParams.get("size_m") === "true",
    l: searchParams.get("size_l") === "true",
    xl: searchParams.get("size_xl") === "true",
  });
  
  const [brandFilters, setBrandFilters] = useState({
    urbanThreads: searchParams.get("brand_urbanThreads") === "true" || false,
    modernFit: searchParams.get("brand_modernFit") === "true" || false,
    streetStyle: searchParams.get("brand_streetStyle") === "true" || false,
    beachBreeze: searchParams.get("brand_beachBreeze") === "true" || false,
    fashionista: searchParams.get("brand_fashionista") === "true" || false,
    chicStyle: searchParams.get("brand_chicStyle") === "true" || false,
  });

  const [priceRange, setPriceRange] = useState(
    searchParams.get("priceRange") || "24"
  );
  
  const [priceSort, setPriceSort] = useState(
    searchParams.get("priceSort") || "lowToHigh"
  );

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    // Update category params
    Object.entries(categoryFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
    });
    
    // Update gender params
    Object.entries(genderFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, "true");
      } else {
        params.delete(key);
      }
    });
    
    // Update color params
    Object.entries(colorFilters).forEach(([key, value]) => {
      if (value) {
        params.set(`color_${key}`, "true");
      } else {
        params.delete(`color_${key}`);
      }
    });
    
    // Update size params
    Object.entries(sizeFilters).forEach(([key, value]) => {
      if (value) {
        params.set(`size_${key}`, "true");
      } else {
        params.delete(`size_${key}`);
      }
    });
    
    // Update brand params
    Object.entries(brandFilters).forEach(([key, value]) => {
      if (value) {
        params.set(`brand_${key}`, "true");
      } else {
        params.delete(`brand_${key}`);
      }
    });
    
    // Update price range
    if (priceRange !== "24") {
      params.set("priceRange", priceRange);
    } else {
      params.delete("priceRange");
    }
    
    // Update price sort
    if (priceSort !== "lowToHigh") {
      params.set("priceSort", priceSort);
    } else {
      params.delete("priceSort");
    }
    
    setSearchParams(params);
  }, [categoryFilters, genderFilters, colorFilters, sizeFilters, brandFilters, priceRange, priceSort, setSearchParams]);

  const toggleSection = (section) => {
    setSections({
      ...sections,
      [section]: !sections[section],
    });
  };

  // Handle filter changes
  const handleCategoryChange = (category) => {
    setCategoryFilters({
      ...categoryFilters,
      [category]: !categoryFilters[category],
    });
  };

  const handleGenderChange = (gender) => {
    setGenderFilters({
      ...genderFilters,
      [gender]: !genderFilters[gender],
    });
  };

  const handleColorChange = (color) => {
    setColorFilters({
      ...colorFilters,
      [color]: !colorFilters[color],
    });
  };

  const handleSizeChange = (size) => {
    setSizeFilters({
      ...sizeFilters,
      [size]: !sizeFilters[size],
    });
  };
  
  const handleBrandChange = (brand) => {
    setBrandFilters({
      ...brandFilters,
      [brand]: !brandFilters[brand],
    });
  };
  
  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
  };

  const handlePriceChange = (sortOrder) => {
    setPriceSort(sortOrder);
  };

  // Reset filters
  const resetFilters = () => {
    setCategoryFilters({ topWear: false, bottomWear: false });
    setGenderFilters({ men: false, women: false });
    setColorFilters(
      Object.keys(colorFilters).reduce(
        (acc, color) => ({ ...acc, [color]: false }),
        {}
      )
    );
    setSizeFilters(
      Object.keys(sizeFilters).reduce(
        (acc, size) => ({ ...acc, [size]: false }),
        {}
      )
    );
    setBrandFilters(
      Object.keys(brandFilters).reduce(
        (acc, brand) => ({ ...acc, [brand]: false }),
        {}
      )
    );
    setPriceRange("24");
    setPriceSort("lowToHigh");
    setSearchParams(new URLSearchParams());
  };

  // Color swatches mapping
  const colorSwatches = {
    red: "bg-red-600",
    blue: "bg-blue-600",
    black: "bg-black",
    green: "bg-green-600",
    yellow: "bg-yellow-400",
    gray: "bg-gray-500",
    pink: "bg-pink-300",
    cream: "bg-yellow-50",
    navy: "bg-blue-900",
  };

  return (
    <div
      ref={ref}
      className={`h-full w-64 bg-white border-r border-gray-200 overflow-y-auto`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-xl">Filter</h2>
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="lg:hidden bg-slate-300 rounded-full p-2 text-red-500"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Brand Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("brand")}
          >
            <h3 className="font-semibold">Brand</h3>
            {sections.brand ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.brand && (
            <div className="space-y-2 ml-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urbanThreads"
                  checked={brandFilters.urbanThreads}
                  onChange={() => handleBrandChange("urbanThreads")}
                  className="mr-2"
                />
                <label htmlFor="urbanThreads" className="text-sm">
                  Urban Threads
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="modernFit"
                  checked={brandFilters.modernFit}
                  onChange={() => handleBrandChange("modernFit")}
                  className="mr-2"
                />
                <label htmlFor="modernFit" className="text-sm">
                  Modern Fit
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="streetStyle"
                  checked={brandFilters.streetStyle}
                  onChange={() => handleBrandChange("streetStyle")}
                  className="mr-2"
                />
                <label htmlFor="streetStyle" className="text-sm">
                  Street Style
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="beachBreeze"
                  checked={brandFilters.beachBreeze}
                  onChange={() => handleBrandChange("beachBreeze")}
                  className="mr-2"
                />
                <label htmlFor="beachBreeze" className="text-sm">
                  Beach Breeze
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="fashionista"
                  checked={brandFilters.fashionista}
                  onChange={() => handleBrandChange("fashionista")}
                  className="mr-2"
                />
                <label htmlFor="fashionista" className="text-sm">
                  Fashionista
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="chicStyle"
                  checked={brandFilters.chicStyle}
                  onChange={() => handleBrandChange("chicStyle")}
                  className="mr-2"
                />
                <label htmlFor="chicStyle" className="text-sm">
                  ChicStyle
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Category Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("category")}
          >
            <h3 className="font-semibold">Category</h3>
            {sections.category ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.category && (
            <div className="space-y-2 ml-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="topWear"
                  checked={categoryFilters.topWear}
                  onChange={() => handleCategoryChange("topWear")}
                  className="mr-2"
                />
                <label htmlFor="topWear" className="text-sm">
                  Top Wear
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bottomWear"
                  checked={categoryFilters.bottomWear}
                  onChange={() => handleCategoryChange("bottomWear")}
                  className="mr-2"
                />
                <label htmlFor="bottomWear" className="text-sm">
                  Bottom Wear
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Gender Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("gender")}
          >
            <h3 className="font-semibold">Gender</h3>
            {sections.gender ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.gender && (
            <div className="space-y-2 ml-1">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="men"
                  checked={genderFilters.men}
                  onChange={() => handleGenderChange("men")}
                  className="mr-2"
                />
                <label htmlFor="men" className="text-sm">
                  Men
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="women"
                  checked={genderFilters.women}
                  onChange={() => handleGenderChange("women")}
                  className="mr-2"
                />
                <label htmlFor="women" className="text-sm">
                  Women
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("priceRange")}
          >
            <h3 className="font-semibold">Price Range</h3>
            {sections.priceRange ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.priceRange && (
            <div className="space-y-4 ml-1">
              <div className="flex justify-between">
                <span className="text-sm">$0</span>
                <span className="text-sm">${priceRange}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="w-full"
              />
            </div>
          )}
        </div>

        {/* Color Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("color")}
          >
            <h3 className="font-semibold">Color</h3>
            {sections.color ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.color && (
            <div className="grid grid-cols-3 gap-2 ml-1">
              {Object.entries(colorFilters).map(([color, checked]) => (
                <div key={color} className="flex flex-col items-center">
                  <button
                    className={`w-8 h-8 rounded-full border ${
                      checked
                        ? "ring-2 ring-blue-500"
                        : "ring-1 ring-gray-300"
                    } ${colorSwatches[color]}`}
                    onClick={() => handleColorChange(color)}
                    aria-label={`${color} color`}
                  />
                  <span className="text-xs mt-1 capitalize">{color}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Size Section */}
        <div className="mb-6">
          <div
            className="flex justify-between items-center cursor-pointer mb-2"
            onClick={() => toggleSection("size")}
          >
            <h3 className="font-semibold">Size</h3>
            {sections.size ? (
              <ChevronUp size={18} />
            ) : (
              <ChevronDown size={18} />
            )}
          </div>

          {sections.size && (
            <div className="space-y-2 ml-1">
              {Object.entries(sizeFilters).map(([size, checked]) => (
                <div key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    id={size}
                    checked={checked}
                    onChange={() => handleSizeChange(size)}
                    className="mr-2"
                  />
                  <label htmlFor={size} className="text-sm uppercase">
                    {size}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
 
        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="w-full py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
});

FilterSideBar.displayName = "FilterSideBar";

export default FilterSideBar;