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
                className={`absolute top-14 right-0 w-52 bg-white shadow-xl shadow-gray-700 z-20  transform transition-all duration-300  h-full`}

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
            </div>)}
        </div >
    );
};


export default Navbar;