import React from "react";
import Hero from "../components/Shared/Hero";
import GenderCollection from "../components/Products/GenderCollection";
import NewArrvials from "../components/Products/NewArrvials";
import ProductDetalis from "../components/Products/ProductDetalis";
import ProductGrid from "../components/Products/ProductGrid";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Products/FeaturedSection";


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




const Home = () => {
  return (
    <div>
      <Hero />
      <GenderCollection />
      <NewArrvials />
      {/* Bast Seller */}
      <h2 className=" text-3xl text-center font-bold mb-4">Best Sellers</h2>
      <ProductDetalis />

      <div className="container mx-auto my-8">
        <h2 className=" text-3xl text-center font-bold mb-4">Top Wears For Women</h2>
        <ProductGrid products={similarProducts}/>
      </div>
      <FeaturedCollection/>
      <FeaturedSection/>


    </div>
  );
};

export default Home;
