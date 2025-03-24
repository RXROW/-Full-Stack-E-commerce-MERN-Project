import { User } from "lucide-react";
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag ,HiBars3BottomRight } from "react-icons/hi2"; 
import SeachBar from "./SearchBar"; 
import CartDrawer from "./CartDrawer/CartDrawer";
import { HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [navDrawerOpen, setNavDrawerOpen] = useState(false);
    const handleOpenCart = () => {
      setIsOpenCart(!isOpenCart);
    };
    const handleNavDrawer = () => {
      setNavDrawerOpen(!navDrawerOpen);
    };
  return (
    <>
    <nav className="container  mx-auto flex items-center justify-between py-4 px-6">
      {/* Logo */} 
      <div>
        <Link to="/" className=" text-2xl font-medium text-slate-900  ">
          Rabbit
        </Link>
      </div>
      <div className=" hidden md:flex space-x-6">
        <Link
          to="collections/all"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Men
        </Link>
        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Women
        </Link>
        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Top Wear
        </Link>
        <Link
          to="#"
          className=" text-gray-700 hover:text-black text-sm font-medium uppercase"
        >
          Bottom Wear
        </Link>
      </div>
      {/* Icons */}
      <div className=" flex items-center space-x-4">
      <Link to="/admin/dashbourd" className=" text-gray-200 hover:bg-black p-1 rounded bg-red-800 ">
        Admin
        </Link>
        <Link to="/profile" className=" text-gray-700 hover:text-black ">
          <User className=" w-5 h-5" />
        </Link>
        <button onClick={handleOpenCart}  className=" relative hover:text-black">
          <HiOutlineShoppingBag className=" w-6 h-6" />
          <span className=" absolute -top-0 -right-3 bg-red-600 text-white text-sm rounded-full px-2 py-0.5">
            2
          </span>
        </button>
        {/* Seach Bar  */}
        <div className=" overflow-hidden">

        <SeachBar/>
        </div>
        <button onClick={handleNavDrawer}   className=" md:hidden">
        <HiBars3BottomRight className=" w-6 h-6 text-gray-700" />
        </button>
      </div>
    </nav>
    {/* Cart Drawer  */}
    <CartDrawer isOpen={isOpenCart} setIsOpenCart={setIsOpenCart}/>
    {/* Nav Mobile  */}
    <div className={` fixed top-0 left-0 w-3/4 sm:w-1/2 h-full md:w-1/3 bg-gray-100/60 backdrop-blur-md 
        transition-all duration-300 z-50 ${navDrawerOpen ? ' translate-x-0' : ' -translate-x-full'}`}>
          <div className=" flex justify-end p-4">
            <button  className="p-2  rounded-full bg-gray-100 ">
              <HiOutlineX className=" w-6 h-6  text-red-400"
               onClick={handleNavDrawer}/>
            </button>
          </div>
          <div className="p-4">
            <h2  className=" text-xl font-semibold mb-4 ">Menu</h2>
            <nav>
              <Link to="#"
              onClick={handleNavDrawer}
              className=" block text-lg py-2 font-medium text-gray-700
               hover:text-black">
                Men
              </Link>
              <Link to="#"
              onClick={handleNavDrawer}
              className=" block text-lg py-2 font-medium text-gray-700
               hover:text-black">
                     Women
              </Link>
              <Link to="#"
              onClick={handleNavDrawer}
              className=" block text-lg py-2 font-medium text-gray-700
               hover:text-black">
              Top Wear
              </Link>
              <Link to="#"
              onClick={handleNavDrawer}
              className=" block text-lg py-2 font-medium text-gray-700
               hover:text-black">
            Bottom Wear
              </Link>
              
            </nav>


          </div>



    </div>
    
    </>
  );
};

export default Navbar;
