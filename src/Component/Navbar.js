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



    return (
        <div>
            <nav className="navbar flex justify-between items-center   ">
                <Link className="navbar-brand nav-img" to="/home">
                    <img src="/images/OneHumLogo2.png" className="nav-image" />
                </Link>

                {/* Center Image */}
                <div className="relative flex-shrink-0 text-right ml-auto nav-img" ref={boxRef}>
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
                </div>
                {/* <div className="w-25 flex items-center">
                    <button
                        className="text-black ml-auto " id="" name="menu"
                        onClick={toggleSidebar}
                        ref={menuButtonRef} // Attach ref to menu button
                    >
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 hover:w-10 hover:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div> */}
            </nav>

            {/* Side Navbar */}
            {/* <div
                ref={sidebarRef} // Attach ref to sidebar
                className={`highz fixed top-0 right-0 w-64 h-full bg-gray-800 text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <button
                    className="absolute top-4 right-4 text-white"
                    onClick={toggleSidebar}
                >
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 hover:w-10 hover:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                <ul className="mt-16 space-y-4 px-4">

                    {Cards_Data
                        .filter(item => {
                            var usr = UserAccess.find(user => user.email.toLowerCase() == props.username.toLowerCase()) //get the info of user
                            return usr ? usr.pagesid.includes(item.id) && item.id != props.val.id : false;
                        })
                        .map((item) => (
                            <li key={item.id}>
                                <Link className="text-white hover:text-gray-300" to={`../${item.route}`}>
                                    {item.title}
                                </Link>
                            </li>
                        ))}

                </ul>
            </div> */}

            <div className="subnav border-b shadow-sm pl-8">
                {/* Desktop View */}
                <div className="hidden md:flex items-center justify-between p-2">
                    {/* Buttons A, B, C */}
                    <div className="flex items-center space-x-4">

                        <button className="px-2   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-100 hover:text-gray-100">
                            <Link className="hover:decoration-gray-100 hover:text-gray-100" to="../home">
                                Products
                            </Link>
                        </button>

                        <h2 className="text-xl font-bold text-gray-100"> {`>`} </h2>

                        <button className="px-2   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-500 ">
                            <Link className="hover:decoration-gray-100 hover:text-gray-100" to="../home">
                                {props.val.category}
                            </Link>

                        </button>

                        <h2 className="text-xl font-bold text-gray-100"> {`>`} </h2>

                        <button className="px-2 cursor-pointer text-gray-100 underline decoration-gray-200 hover:decoration-gray-100 hover:text-gray-100">
                            {props.val.title}
                        </button>

                        {Cards_Data
                            .filter(item => {
                                var usr = UserAccess.find(user => user.email.toLowerCase() == props.username.toLowerCase()) //get the info of user
                                return usr ? usr.pagesid.includes(item.id) && item.id != props.val.id && item.category == props.val.category : false;
                            })
                            .map((item) => (
                                <>
                                    <h2 className="text-xl text-gray-200 font-semibold"> {`|`} </h2>
                                    <button className="px-2   cursor-pointer text-gray-100 hover:underline hover:decoration-gray-100 ">
                                        <Link className="hover:decoration-gray-100 hover:text-gray-100" to={`../${item.route}`}>
                                            {item.title}
                                        </Link>

                                    </button>
                                </>
                            ))}

                    </div>

                    <h2 className="absolute text-white pb-1 title text-center flex-1 text-l sm:text-2xl md:text-3xl font-bold left-1/2 -translate-x-1/2">
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
            <div
                ref={filterRef}
                className={`absolute top-14 right-0 w-64 bg-white shadow-xl shadow-gray-700 z-20  transform transition-all duration-300 ${isFilterVisible ? "translate-x-0" : "translate-x-full"
                    } h-full`}

            >
                <h2 className="text-xl text-left pl-4 text-white  sidenavbar font-semibold mb-2 border-b shadow-sm">Categories</h2>

                <div className=" px-4">
                    <ul className="   text-center">

                        {
                            disCategory.map(cat => {
                                return (
                                    <>
                                        <li className="cursor-pointer text-left text-gray-400 font-medium text-lg mt-4">
                                            {cat} :
                                            <ol className="text-left border-l-2 space-y-2 list-disc list-inside mt-2">
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
                                                    >
                                                        <li className="font-medium text-gray-500 text-base ml-4 rounded-lg hover:text-gray-700 hover:bg-gray-100 px-2 py-1 m-0">
                                                            {item.title}
                                                        </li>
                                                    </Link>
                                                ))}
                                            </ol>
                                        </li>

                                    </>
                                )
                            })
                        }

                    </ul>
                </div>
            </div>
        </div >
    );
};


export default Navbar;