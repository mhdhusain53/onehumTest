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
  const sidebarRef = useRef(null);

  // Toggle filter visibility
  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Hide filter if clicked outside
  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setIsFilterVisible(false);
    }

    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsMenuOpen(false); // Close sidebar if clicked outside
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
    <div>


      <div className="h-screen flex flex-col overflow-hidden content " >
        {/* Sub-navbar */}
        <div className="subnav border-b shadow-sm px-2 ">
          {/* Desktop View */}
          <div className="flex items-center  justify-between py-2 pr-3">

            <div className=" md:hidden  flex-shrink-0 h-auto w-32 sm:w-40  md:w-44 lg:w-56 ">
              <img
                src="/images/CompanyLogo.png"
                alt="Left Logo"
                className="h-8 sm:h-10 lg:h-12 cursor-pointer"
              />
            </div>


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
                className="text-gray-100 hover:text-gray-800 btnn rounded-md text-2xl cursor-pointer"
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


        </div>

        {/* Main Content */}
        <div className="flex-1 z-0 p-6 overflow-hidden " id="bgimg" >
          <Cards searchText={searchQuery} category={selectedCategory} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
        ref={sidebarRef} className="absolute top-14 right-0 w-60 bg-white shadow-xl shadow-gray-600 flex z-50 flex-col space-y-2 p-4 lg:hidden bg-gray-100 border-t "
          id="sidenavbar">



          <div className="flex items-center space-x-2 w-full mx-auto">
            <FaSearch className="text-gray-500 w-6 h-6" />

            <input
              type="text"
              placeholder="Search Products"
              className="p-2 border-2 font-normal border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-orange-400 searchOutline w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Buttons Favorite, All */}
          <label className="flex items-center mx-auto mt-2 space-x-2  ">
            <input
              type="checkbox"
              className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 checked:bg-black"
            />
            <span className="text-gray-600">Favorites</span>
          </label>

          <h2 className="text-lg md:hidden font-semibold pt-3 mt-2 mb-1 border-t-2">Categories:</h2>

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`md:hidden px-4 w-100  py-1 my-0  border-l-2 border-gray-300 focus:outline-none  hover:shadow-2xl categoryhover shadow-black ${selectedCategory === category
                ? ' ' // Style for the selected button
                : 'bg-white text-gray-700'   // Style for the unselected buttons
                }`}
            >
              <span className={`text-base text-gray-600 list-disc list-inside font-semibold w-100 block text-left px-3  py-1 rounded-lg ${selectedCategory === category
                ? 'bg-gray-200 ' // Style for the selected button
                : 'hover:bg-gray-100'   // Style for the unselected buttons
                }`}>{`• ${category}`}</span>
              
            </button>
          ))}


          {/* Search Box */}




          
        </div>
      )}
    </div>
  );
};

export default Content;
