import React, { useState, useEffect, useRef } from "react";
import Cards from "./Cards";
import { FaSearch, FaBars, FaFilter } from "react-icons/fa";
import "./NavbarHome.css";

const Content = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'Engagement', 'Productivity', 'Performance'];



  const filterRef = useRef(null);

  // Toggle filter visibility
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Hide filter if clicked outside
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsFilterVisible(false);
    }
  };

  useEffect(() => {
    // Adding event listener for clicks outside the filter section
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden content " >
      {/* Sub-navbar */}
      <div className="subnav border-b shadow-sm px-2 ">
        {/* Desktop View */}
        <div className="flex items-center md:justify-between justify-end p-2 px-3">
          {/* Buttons A, B, C */}
          <div className=" hidden md:flex items-center space-x-4">

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full focus:outline-none categorybtn hover:shadow-2xl categoryhover shadow-black ${selectedCategory === category
                  ? 'selectcategorybg text-white' // Style for the selected button
                  : 'bg-white text-gray-700'   // Style for the unselected buttons
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Right Side: Search and Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search Box */}
            <div className="flex items-center space-x-2">


              <FaSearch className="text-gray-100 text-xl mr-1" />

              <input
                type="text"
                placeholder="Search Products"
                className="p-2 border font-normal border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-400 searchOutline"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Buttons Favorite, All */}

            <label className="flex items-center mt-2 space-x-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 checked:bg-black"
              />
              <span className="text-gray-100">Favorites</span>
            </label>

          </div>

          <div className="flex lg:hidden justify-end items-right p-2">
          <FaBars
            className="text-gray-700 text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div>

        </div>

        {/* Mobile View */}
        {/* <div className="flex md:hidden justify-end items-center p-2">
          <FaBars
            className="text-gray-700 text-2xl cursor-pointer"
            onClick={toggleMenu}
          />
        </div> */}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sidebar relative flex z-100 flex-col space-y-2 p-4 md:hidden bg-gray-100 border-t ">
            {/* Buttons A, B, C */}

            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full">
              Productivity
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full">
              Dashboards
            </button>

            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full">
              Self-Serve
            </button>

            {/* Search Box */}
            <div className="flex items-center space-x-2">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Widgets"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400 w-full"
              />
            </div>

            {/* Buttons Favorite, All */}
            {/* <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full">
              Favorite
            </button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 w-full">
              All
            </button> */}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 z-10 p-6 overflow-hidden " id="bgimg" >
        <Cards searchText={searchQuery} category={selectedCategory} />
      </div>
    </div>
  );
};

export default Content;
