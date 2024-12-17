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
            if (boxRef.current && !boxRef.current.contains(event.target)) {
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

                <Link className="flex-grow flex justify-left " to="../home">
                    <img
                        src="/images/OneHumLogo2.png"
                        alt="Center Logo"
                        className="h-auto w-20 sm:w-24 md:w-32 lg:w-36  cursor-pointer"
                    />
                </Link>

                {/* Right Div */}
                <div className="relative flex-shrink-0 text-right text-xs sm:text-sm md:text-base  z-50  w-32 sm:w-40  md:w-44 lg:w-56 " ref={boxRef}>
                    {/* Welcome Text and Name */}
                    <p className="text-gray-300">
                        Welcome,
                        <span
                            onClick={toggleBox}
                            className="block cursor-pointer text-gray-100 hover:underline hover:decoration-gray-200"
                        >
                            {props.name}
                        </span>
                    </p>

                    {/* Hidden Box */}
                    {isBoxVisible && (<div
                        className={`absolute right-2 mt-2 bg-white shadow-md rounded-lg w-32 md:w-40  hover:bg-gray-100
            }`}
                        id="signoutbox"
                    >
                        <button
                            onClick={() => props.logout()}
                            className="block w-full px-2 py-2 text-left text-xs sm:text-sm md:text-base rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500"
                        >
                            Sign Out
                        </button>
                    </div>)}
                </div>



                {/* <Link className="navbar-brand nav-img" to="/home">
                    <img src="/images/OneHumLogo2.png" className="nav-image" />
                </Link> */}

                {/* Center Image */}
                {/* <div className="relative flex-shrink-0 text-right ml-auto nav-img" ref={boxRef}>
                    <p className="text-gray-300">
                        Welcome,
                        <span
                            onClick={toggleBox}
                            className="block cursor-pointer text-gray-100 hover:underline hover:decoration-gray-200"
                        >
                            {props.name}
                        </span>
                    </p>
                    {isBoxVisible && (
                        <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg w-40">
                            <button
                                onClick={() => props.logout()}
                                className="block w-full px-4 py-2 text-left rounded-lg text-gray-700 hover:bg-gray-100 hover:underline hover:decoration-gray-500"
                            >
                                Sign Out
                            </button>
                        </div>
                    )}
                </div> */}
            </nav>

            {/* Side Navbar */}


            <div className="subnav border-b shadow-sm pl-4 md:pl-8">
                {/* Desktop View */}
                <div className="flex items-center justify-end xl:justify-between py-1">
                    {/* Buttons A, B, C */}
                    <div className="hidden xl:flex items-center space-x-4">

                        <button className="   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-100 hover:text-gray-100">
                            <Link className="hover:decoration-gray-100 hover:text-gray-100" to="../home">
                                Products
                            </Link>
                        </button>

                        <h2 className="text-xl font-bold text-gray-100 mb-1"> {`>`} </h2>

                        <button className="   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-500 ">
                            <Link className="hover:decoration-gray-100 hover:text-gray-100" to="../home">
                                {props.val.category}
                            </Link>

                        </button>

                        <h2 className="text-xl font-bold text-gray-100 mb-1"> {`>`} </h2>

                        <button className=" cursor-pointer text-gray-100 underline decoration-gray-200 hover:decoration-gray-100 hover:text-gray-100">
                            {props.val.title}
                        </button>

                        {Cards_Data
                            .filter(item => {
                                var usr = UserAccess.find(user => user.email.toLowerCase() == props.username.toLowerCase()) //get the info of user
                                return usr ? usr.pagesid.includes(item.id) && item.id != props.val.id && item.category == props.val.category : false;
                            })
                            .map((item) => (
                                <>
                                    <h2 className="text-xl mb-1 text-gray-200 font-semibold"> {`|`} </h2>
                                    <button className="   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-100 ">
                                        <Link className="hover:decoration-gray-100 hover:text-gray-100" to={`../${item.route}`}>
                                            {item.title}
                                        </Link>

                                    </button>
                                </>
                            ))}

                    </div>

                    <h2 className="md:absolute text-white pb-1 title text-left md:text-center flex-1 text-xl sm:text-2xl md:text-3xl font-bold md:left-1/2 md:-translate-x-1/2">
                        {props.val.title}
                    </h2>


                    {/* Right Side: Search and Buttons */}
                    <div className="flex items-center space-x-4">

                        <button
                            onClick={toggleFilter}
                            className="px-4 py-2 text-xl text-gray-100 hover:text-gray-800 btnn rounded-md "
                        >
                            <FaBars />
                        </button>


                    </div>
                </div>

            </div>

            {/* Filters Section (Full Height Below Navbar) */}
            {isFilterVisible && (<div
                ref={filterRef}
                className={`absolute top-14 mt-2 right-0 w-52 md:w-56 bg-white shadow-xl shadow-gray-700 z-20  transform transition-all duration-300  h-full`}

            >
                <button
                    className="flex text-gray-600 hover:text-gray-800 focus:outline-none items-right mr-auto font-light  mb-1 pl-3 py-2" onClick={closeSidebar}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600 opacity-70"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 12h14M12 5l7 7-7 7"
                        />
                    </svg>
                </button>

                <div className="px-3 my-0 flex items-center ">
                    <h2 className="text-xl text-left pr-2 pb-1 text-gray-600 sidenavbar font-bold  inline align-middle">
                        Categories
                    </h2>

                    <img
                        src="/images/Categories.png"
                        alt="Center Logo"
                        className="h-8 w-8 bg-blue-100 p-1  rounded-lg cursor-pointer inline align-middle"
                    />


                </div>



                <div className=" px-2 my-2 mx-3 border-2 bg-gray-50 border-gray-200 pt-2 rounded-lg">
                    <ul className=" text-center">

                        {/* {
                            disCategory.map(cat => {
                                return (
                                    <>
                                        <li className="cursor-pointer text-left text-gray-400 font-medium text-base mb-3">
                                            {cat} :
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
                                                        <li className="font-medium text-gray-500 text-sm ml-3 rounded-lg hover:text-gray-700 hover:bg-gray-100 px-2 py-1  ">
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ol>
                                        </li>

                                    </>
                                )
                            })
                        } */}





<>
            {disCategory.map((cat) => {
                return (
                    <li key={cat} className="cursor-pointer text-left text-gray-400 font-medium text-base mb-3">
                        {/* Category name with a toggle for dropdown */}
                        <div
                            className="flex items-center justify-between"
                            onClick={() => toggleDropdown(cat)}
                        >
                            <span>{cat}:</span>
                            <button className="ml-2 text-gray-500">
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
                                        <li className="font-medium text-gray-500 text-sm ml-3 rounded-lg hover:text-gray-700 hover:bg-gray-100 px-2 py-1  ">
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
        </div >
    );
};


export default Navbar;