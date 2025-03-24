import React, { useState, useEffect, useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const SearchBar = ({ onSearch = () => {}, placeholder = "Search..." }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        handleClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      inputRef.current?.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div ref={searchRef} className="relative">
      {isOpen ? (
        <div 
          className="fixed inset-0 bg-black/10   z-50 transition-opacity duration-200"
          aria-modal="true"
          role="dialog"
          aria-label="Search"
        >
          <div className="fixed top-0 left-0 right-0 bg-white shadow-lg animate-slideDown">
            <form onSubmit={handleSubmit} className="container mx-auto max-w-4xl">
              <div className="flex items-center p-4 gap-3">
                <div className="flex-1 flex items-center bg-gray-100 rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-gray-300">
                  <CiSearch className="w-5 h-5 text-gray-500 ml-3 flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="search"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 focus:outline-none"
                    aria-label="Search input"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 text-gray-600 hover:text-red-400 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close search"
                >
                  <IoClose className="w-6 h-6 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-700 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Open search"
        >
          <CiSearch className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;