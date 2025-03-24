import React, { useState } from "react";
import { Heart, Share2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
const selectedProduct = {
  name: "Stylish Jacket",
  price: 120,
  originalPrice: 150,
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. Nullam vel eros sit amet arcu vestibulum accumsan in in leo.",
  brand: "Nike",
  sizes: ["S", "M", "L", "XL"],
  colors: ["#000", "#f00", "#0f0", "#00f"],
  images: [
    {
      url: "https://picsum.photos/500/500?random=9",
      altText: "Stylish Jacket",
    },
    {
      url: "https://picsum.photos/500/500?random=92",
      altText: "Stylish Jacket side view",
    },
    {
      url: "https://picsum.photos/500/500?random=91",
      altText: "Stylish Jacket back view",
    },
    {
      url: "https://picsum.photos/500/500?random=93",
      altText: "Stylish Jacket detail",
    },
  ],
};
const similarProducts = [
  {
    _id: "1",   
    name: "Product 1",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=23", altText: "Stylish Jacket" }],
  },
  {
    _id: "2",   
    name: "Product 2",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=13", altText: "Stylish Jacket" }],
  },
  {
    _id: "3",   
    name: "Product 3",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=9", altText: "Stylish Jacket" }],
  },
  {
    _id: "4",   
    name: "Product 4",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=1", altText: "Stylish Jacket" }],
  },
  {
    _id: "5",   
    name: "Product 5",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=2", altText: "Stylish Jacket" }],
  },
  {
    _id: "6",   
    name: "Product 6",
    price: 120, 
    images: [{ url: "https://picsum.photos/500/500?random=5", altText: "Stylish Jacket" }],
  },
];





const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const colorNames = {
    "#000": "Black",
    "#f00": "Red",
    "#0f0": "Green",
    "#00f": "Blue",
  };

  const handleAddToCart = () => {
    if (selectedColor === null) {
      toast.error("Please select a Color");
      return;
    }
    if (selectedSize === null) {
      toast.error("Please select a size");
      return;
    }

    toast.success(`Added ${quantity} ${selectedProduct.name} to cart`);
  };

  return (
    <div className="  py-8">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Left Side - Images */}
          <div className="md:w-1/2 p-6">
            {/* Main Image */}
            <div className="mb-4 overflow-hidden rounded-lg">
              <img
                src={selectedProduct.images[selectedImage].url}
                alt={selectedProduct.images[selectedImage].altText}
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 ${
                    selectedImage === index
                      ? "ring-2 ring-black"
                      : "ring-1 ring-gray-200"
                  } rounded-md overflow-hidden transition-all`}
                >
                  <img
                    src={image.url}
                    alt={image.altText}
                    className="w-16 h-16 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Details */}
          <div className="md:w-1/2 p-8 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {selectedProduct.name}
                </h1>
                <div className="flex items-center mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    By {selectedProduct.brand}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-900">
                ${selectedProduct.price}
              </span>
              {selectedProduct.originalPrice && (
                <span className="ml-2 text-sm font-medium text-gray-500 line-through">
                  ${selectedProduct.originalPrice}
                </span>
              )}
              {selectedProduct.originalPrice && (
                <span className="ml-2 text-sm font-medium text-green-600">
                  Save ${selectedProduct.originalPrice - selectedProduct.price}
                </span>
              )}
            </div>

            <p className="text-gray-600 mb-6">{selectedProduct.description}</p>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Color</h3>
                <span className="text-sm text-gray-600">
                  {colorNames[selectedProduct.colors[selectedColor]]}
                </span>
              </div>
              <div className="flex space-x-3">
                {selectedProduct.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full ${
                      selectedColor === index
                        ? "ring-2 ring-offset-2 ring-gray-800"
                        : ""
                    } transition-all`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${colorNames[color]} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(index)}
                    className={`group w-12 h-10 flex items-center justify-center rounded-md border ${
                      selectedSize === index
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-300 text-gray-900 hover:bg-gray-50"
                    } transition-colors`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-2">
                Quantity
              </h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-l border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 h-10 border-t border-b border-gray-300 text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-r border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-black text-white py-3 px-6 rounded-md font-medium hover:bg-gray-800 transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>





        </div>
        <div className="mt-20">
            <h2 className=" text-3xl text-center font-semibold mb-4">
                You May Also Like
            </h2>
            <ProductGrid products={similarProducts}/>
          </div>

      </div>
    </div>
  );
};

export default ProductDetails;
