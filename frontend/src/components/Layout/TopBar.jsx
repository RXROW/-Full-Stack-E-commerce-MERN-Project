import {   Instagram, Mail } from "lucide-react";
import React from "react";
import { AiOutlineX } from "react-icons/ai";
import { FaMeta } from "react-icons/fa6";

const TopBar = () => {
  return (
    <div className="bg-rabbit-main text-white py-2">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Social Icons */}
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-gray-300 transition">
          <AiOutlineX className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
            <Instagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300 transition">
          <FaMeta  className="h-5 w-5" />
          </a>
        </div>

        {/* Shipping Message */}
        <div className="text-sm text-center flex-1 hidden md:block">
          <span>We ship worldwide! Fast and reliable shipping 🚀</span>
        </div>

        {/* Contact Number */}
        <div>
          <a href="tel:+123456789" className="hover:text-gray-300 transition">
            +123456789
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
