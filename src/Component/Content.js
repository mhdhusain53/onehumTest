import React, { useState, useEffect, useRef } from "react";
import Cards from "./Cards";
import { FaSearch, FaBars, FaChevronRight } from "react-icons/fa";
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
  const closeSidebar = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>


      <div className="h-screen flex flex-col overflow-visible content " >
        {/* Sub-navbar */}
        <div className="subnav md:absolute md:-top-10 z-50  md:shadow-sm px-2 md:mt-2 md:mx-28 md:rounded-lg">
          {/* Desktop View */}
          <div className="flex items-center  justify-between  py-2 pr-3 ">

            <div className=" md:hidden  flex-shrink-0 h-auto w-32 sm:w-40  md:w-44 lg:w-56 ">
              <img
                src="/images/companylogodark.png"
                alt="Left Logo"
                className="h-8 sm:h-10 lg:h-12 xl:h-14 cursor-pointer"
              />
            </div>


            {/* Buttons A, B, C */}
            {/* <div className=" hidden md:flex items-center space-x-4 pl-3">


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
            </div> */}


            <div className="hidden md:flex items-center space-x-3 2xl:space-x-4 pl-3 animate-fadeInLeft">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg focus:outline-none categorybtn  categoryhover shadow-black ${selectedCategory === category
                    ? 'selectcategorybg text-white' // Style for the selected button
                    : 'bgunselect text-gray-700'   // Style for the unselected buttons
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>






            {/* Right Side: Search and Buttons */}
            <div className="hidden lg:flex items-center space-x-4">

              {/* <div className="relative w-full mx-auto my-0.5">
                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                  </div>
                  <input type="search"
                    value={searchQuery}
                    id="default-search"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    class="block w-full p-2 pl-5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-orange-400" placeholder="Search Products" />
                </div>
              </div> */}


              <div className="hidden lg:flex items-center space-x-4 animate-fadeInRight">
                {/* Search Box */}
                <div className="relative w-full mx-auto my-0.5">
                  {/* Search Icon */}
                  <label
                    htmlFor="default-search"
                    className="mb-2 text-sm font-medium text-gray-900 sr-only "
                  >
                    Search
                  </label>
                  <div className="relative">
                    {/* Search Icon */}
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-5 h-5 darkborder"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    {/* Input Field */}
                    <input
                      type="search"
                      value={searchQuery}
                      id="default-search"
                      autoComplete="off"
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="serachborder block w-full px-2 py-1.5 pl-5 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      placeholder="Search Products"
                    />
                    {/* Cross Icon to Clear Text */}
                    {searchQuery && (
                      <div
                        onClick={() => setSearchQuery('')}
                        className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                      >
                        <svg
                          className="w-6 h-6 darkborder"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 6L14 14M6 14L14 6"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>


                {/* <label className="flex items-center mt-2 space-x-2">
                  <input
                    type="checkbox"

                    className=" w-4 h-4 text-blue-600 bg-white border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2"
                  />
                  <span className="text-gray-800">Favorites</span>
                </label> */}
              </div>




              {/* Buttons Favorite, All */}

              {/* <label className="flex items-center mt-2 space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 checked:bg-black"
                />
                <span className="text-gray-100">Favorites</span>
              </label> */}

            </div>

            <div className="flex lg:hidden justify-end items-right p-2">
              <FaBars
                className="text-orange-500 btnn  rounded-md text-2xl cursor-pointer"
                onClick={toggleMenu}
              />
            </div>

          </div>



        </div>

        {/* Main Content */}
        <div className="flex-1 z-0 p-6 overflow-hidden " id="bgimg" >
          <Cards searchText={searchQuery} category={selectedCategory} />
        </div>
      </div>

      {/* Mobile Menu */}
      {
        isMenuOpen && (
          <div
            ref={sidebarRef} className="absolute h-full top-12 right-0 w-52 bg-gray-50 px-3 shadow-lg shadow-gray-500  rounded-tl-lg flex z-50 flex-col space-y-2 py-2 lg:hidden bg-gray-100 border-t overflow-y-auto max-h-[calc(100vh-3rem)]"
            id="sidenavbar">

            <button
              className="flex text-gray-600 hover:text-gray-800 focus:outline-none items-right mr-auto font-light my-2 mb-2  duration-300 hover:scale-[1.09]" onClick={closeSidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-8 py-0.5 text-white hover:shadow-lg   pr-2 filterback absolute left-0 rounded-r-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.3"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 12h14M12 5l7 7-7 7"
                />
              </svg>
            </button>

            <div className="relative w-full mx-auto mt-4 pt-4">
              {/* Search Icon */}
              <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only ">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-5 h-5 darkborder " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search"
                  id="default-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  class=" serachborder block w-full py-2 pl-10 text-base text-gray-900 border rounded-lg bg-gray-50 focus:outline-none focus:ring focus:ring-orange-400 " placeholder="Search Products" />
                {searchQuery && (
                  <div
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 end-0 flex items-center pe-3 cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6 darkborder"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 6L14 14M6 14L14 6"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>


            {/* Buttons Favorite, All */}
            {/* <label className="flex items-center mx-auto mt-2 space-x-2  ">
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-400 checked:bg-black"
              />
              <span className="text-gray-600">Favorites</span>
            </label> */}

            {/* <h2 className="text-lg md:hidden font-semibold pt-3 mt-3  text-gray-600">Categories:</h2> */}

            <div className=" my-0 flex mt-3 pt-4  border-t-2 md:hidden  ">
              <h2 className="text-lg  pr-2 pb-0.5 text-gray-600 sidenavbar font-semibold  inline align-middle">
                Categories
              </h2>

              <img
                src="/images/Categories.png"
                alt="Center Logo"
                className="h-8 w-8 bg-blue-100 p-1  rounded-lg cursor-pointer inline align-middle"
              />


            </div>


            <div className="border-2 bg-gray-50 border-gray-200 py-2 rounded-lg px-1 md:hidden">

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={` px-2  w-100  py-0.5 my-0 focus:outline-none  hover:shadow-2xl categoryhover shadow-black ${selectedCategory === category
                    ? ' ' // Style for the selected button
                    : ' text-gray-700'   // Style for the unselected buttons
                    }`}
                >
                  <span className={`text-base text-gray-500 font-semibold w-100 block text-left px-3  py-1 rounded-md ${selectedCategory === category
                    ? 'bg-gray-200 text-orange-500' // Style for the selected button
                    : 'hover:bg-gray-100'   // Style for the unselected buttons
                    }`}>{` ${category}`}</span>

                </button>
              ))}
            </div>

            {/* Search Box */}


          </div>
        )
      }
    </div >
  );
};

export default Content;
