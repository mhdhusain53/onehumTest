import React, { useState, useEffect, useRef } from "react";
import "./NavbarHome.css";


const NavbarHome = (props) => {
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


  return (
    <nav className="flex navv items-center justify-between shadow-md bg-beige ">
      {/* Left Image */}
      <div className="hidden md:flex flex-shrink-0 h-auto w-32 sm:w-40  md:w-44 lg:w-56 ">
        <img
          src="/images/CompanyLogo.png"
          alt="Left Logo"
          className="h-8 sm:h-10 lg:h-12 cursor-pointer"
        />
      </div>

      {/* Center Image */}
      <div className="flex-grow flex justify-left md:justify-center">
        <img
          src="/images/OneHumLogo2.png"
          alt="Center Logo"
          className="h-auto w-20 sm:w-24 md:w-32 lg:w-36  cursor-pointer"
        />
      </div>

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
       {isBoxVisible&&( <div
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
     
    </nav>
  );
};

export default NavbarHome;
