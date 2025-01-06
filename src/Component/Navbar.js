import React from "react";
import './Navbar.css';
import Cards_Data from "../Data";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { useEffect, useRef } from 'react';
import UserAccess from "../UserAccess";

const Navbar = (props) => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const menuButtonRef = useRef(null); // Ref for the menu button to detect clicks outside
    const [isBoxVisible, setIsBoxVisible] = useState(false);
    const boxRef = useRef(null); // Ref for the hidden box

    // Close the box when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                boxRef.current &&
                !boxRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target)
            ) {
                setIsBoxVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleBox = () => {
        setIsBoxVisible(!isBoxVisible);
    };


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


    const arrayCategory = Cards_Data.map(item => item.category);
    const disCategory = [...new Set(arrayCategory)];
    console.log(disCategory)

    const closeSidebar = () => {
        setIsFilterVisible(false);
        setOpenCategory(null)
    };



    const [openCategory, setOpenCategory] = useState(null);

    // Function to toggle the dropdown
    const toggleDropdown = (category) => {
        setOpenCategory(openCategory === category ? null : category);
    };








    return (
        <div>
            <nav className="navbar flex justify-between items-center   ">
                <div  className="flex-grow flex justify-left ">
                <Link to="../home">
                    <img
                        src="/images/OneHumLogo2.png"
                        alt="Center Logo"
                        className="h-auto w-20 sm:w-24 md:w-32 lg:w-36  cursor-pointer"
                    />
                </Link>

                </div>
               

                {/* Right Div */}
                <div className="relative flex-shrink-0 text-right text-xs sm:text-sm md:text-base my-1.5 z-0  w-32 sm:w-40  md:w-44 lg:w-56 " >
                    {/* Welcome Text and Name */}
                    <button className="border-2 rounded-full bg-white py-1.5 px-2 flex ml-auto justify- items-center user"
                        onClick={toggleBox}  ref={menuButtonRef}>

                        <img src="./images/User2.png" className="w-7 h-5 mx-auto pr-2" />

                        {!isBoxVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="8 4 16 12 8 20"></polyline>
                        </svg>
                            :
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="4 8 12 16 20 8"></polyline>
                            </svg>
                        }

                    </button>

                  
                </div>
            </nav>

            {/* Side Navbar */}
            <div className="subnav2 md:absolute md:-top-8 z-50 md:shadow-sm md:mx-28   px-2  md:py-1 md:rounded-lg">
                {/* Desktop View */}
                <div className="flex  items-center justify-end xl:justify-between py-1">
                    {/* Buttons A, B, C */}
                    <div className="hidden xl:flex items-center space-x-3">

                        <button className="  pl-4 cursor-pointer darkOrange hover:underline hover:decoration-gray-400 ">
                            <Link className="hover:decoration-gray-400 darkOrange" to="../home">
                                Products
                            </Link>
                        </button>

                        <h2 className="text-xl font-bold darkOrange mb-1"> {`>`} </h2>

                        <button className="   cursor-pointer darkOrange0 hover:underline hover:decoration-gray-400 ">
                            <Link className="hover:decoration-gray-400 darkOrange" to="../home">
                                {props.val.category}
                            </Link>

                        </button>

                        <h2 className="text-xl font-bold darkOrange mb-1"> {`>`} </h2>

                        <button className="  darkOrange  bg-gray-200 rounded-md px-2 py-0.5 cursor-not-allowed">
                        {props.val.title}
                            
                        </button>

                        {Cards_Data
                            .filter(item => {
                                var usr = UserAccess.find(user => user.email.toLowerCase() == props.username.toLowerCase()) //get the info of user
                                return usr ? usr.pagesid.includes(item.id) && item.id != props.val.id && item.category == props.val.category : false;
                            })
                            .map((item) => (
                                <>
                                    <h2 className="text-xl mb-1 darkOrange font-semibold"> {`|`} </h2>
                                    <button className="   cursor-pointer darkOrange hover:underline hover:decoration-gray-400 ">
                                        <Link className="hover:decoration-gray-400 darkOrange" to={`../${item.route}`}>
                                            {item.title}
                                        </Link>

                                    </button>
                                </>
                            ))}

                    </div>

                    <h2 className="absolute darkOrange pb-1 title text-center flex-1 text-xl sm:text-2xl md:text-3xl font-bold left-1/2 -translate-x-1/2">
                        {props.val.title}
                    </h2>


                    {/* Right Side: Search and Buttons */}
                    <div className="flex items-right md:items-center  space-x-4">

                        <button
                            onClick={toggleFilter}
                            className="md:px-4 py-2 text-xl text-orange-500 focus:border-0 btnn transform transition-transform duration-300 hover:scale-[1.15] rounded-md "
                        >
                            <FaBars />
                        </button>


                    </div>
                </div>

            </div>

            {/* Filters Section (Full Height Below Navbar) */}
            {isFilterVisible && (<div
                ref={filterRef}
                className={`absolute top-12 mt-2 right-0 w-52 md:w-64 bg-white shadow-lg shadow-gray-500 z-20  rounded-tl-lg h-full  overflow-y-auto max-h-[calc(100vh-3rem)] pb-3`}

            >
                <button
                    className="flex focus:outline-none items-right mr-auto font-light  mb-1  py-2 pt-3 transform transition-transform duration-300 hover:scale-[1.09]" onClick={closeSidebar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-10 h-8 py-0.5 text-white hover:shadow-lg  bgback rounded-r-full pr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 12h14M12 5l7 7-7 7"
                        />
                    </svg>
                </button>

                <div className="px-3 my-0 flex items-center ">
                    <h2 className="text-xl 2xl:text-2xl text-left pr-2 pb-1 darkBlue sidenavbar font-bold  inline align-middle">
                        Categories
                    </h2>

                    <img
                        src="/images/Categories.png"
                        alt="Center Logo"
                        className="h-8 w-8 p-1  rounded-lg cursor-pointer inline align-middle"
                    />


                </div>



                <div className=" px-2 my-2 mx-3 border-2 bg-gray-50 border-gray-200 pt-2 rounded-lg">
                    <ul className=" text-center">

                    

                        <>
                            {disCategory.map((cat) => {
                                return (
                                    <li key={cat} className="cursor-pointer text-left text-gray-400 font-medium text-base 2xl:text-lg mb-3">
                                        {/* Category name with a toggle for dropdown */}
                                        <div
                                            className="flex items-center justify-between"
                                            onClick={() => toggleDropdown(cat)}
                                        >
                                            <span className="darkOrange">{cat}:</span>
                                            <button className="ml-2 darkBlue xl:text-2xl focus:outline-none focus:ring-0">
                                                {openCategory === cat ? '−' : '+'}
                                            </button>
                                        </div>

                                        {/* Dropdown content */}
                                        {openCategory === cat && (
                                            <ol className="text-left border-l-2 space-y-2 list-disc list-inside mt-1 ml-1">
                                                {Cards_Data.filter((item) => {
                                                    var usr = UserAccess.find(
                                                        (user) => user.email.toLowerCase() === props.username.toLowerCase()
                                                    );
                                                    return usr
                                                        ? usr.pagesid.includes(item.id) &&
                                                        item.id !== props.val.id &&
                                                        item.category === cat
                                                        : false;
                                                }).map((item) => (
                                                    <Link
                                                        key={item.id}
                                                        className="cursor-pointer hover:no-underline hover:decoration-gray-500"
                                                        to={`../${item.route}`}
                                                        onClick={closeSidebar}
                                                    >
                                                        <li className="font-medium text-gray-500 text-sm 2xl:text-base ml-3 rounded-lg hover:text-orange-500 hover:bg-gray-100 px-2 py-1  ">
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ol>
                                        )}
                                    </li>
                                );
                            })}
                        </>






                    </ul>
                </div>
            </div>)}



            {/* logout card */}
            {isBoxVisible && (<div
                        className={`absolute right-2 top-14 bg-white shadow-md rounded-lg w-40 md:w-44  hover:bg-gray-100 p-2 z-100
            }`}
            ref={boxRef}
                        id="signoutbox"
                    >
                        <p className="text-gray-400 font-semibold text-sm text-center bg-gray-100 rounded-lg py-1.5 px-1.5">
                            Welcome
                            <span
                                className="block font-normal text-sm cursor-pointer text-gray-600 "
                            >
                                {props.name}
                            </span>
                        </p>

                        <hr className="text-gray-400 my-2 mb-3 border-t-1 border-gray-400" />

                        {/* <button
                            className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex jutify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500 "
                        >
                            <img src="./images/Account.png" className="w-5 h-5" />
                            <span className="ml-1">Account</span>

                        </button>

                        <button
                            className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex jutify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500 "
                        >
                            <img src="./images/Setting.png" className="w-5 h-5" />
                            <span className="ml-1">Setting</span>

                        </button> */}

                        <button
                            onClick={() => props.logout()}
                            className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex jutify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500 "
                        >
                            <img src="./images/SignOut.png" className="w-5 h-4" />
                            <span className="ml-1">Sign Out</span>

                        </button>
                    </div>)}
        </div >
    );
};


export default Navbar;