import React, { useState, useEffect, useRef } from "react";
import "./NavbarHome.css";

const NavbarHome = (props) => {
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const buttonRef = useRef(null); // Ref for the button
  const boxRef = useRef(null); // Ref for the hidden box

  // Close the box when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
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

  return (
    <nav className="flex navv items-center justify-between shadow-md bg-beige">
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
      <div className="relative flex-shrink-0 text-right text-xs sm:text-sm md:text-base z-50 w-32 sm:w-40 md:w-44 lg:w-56">
        <button
          className="border-2 rounded-full bg-white py-1.5 px-2 flex ml-auto justify- items-center user"
          ref={buttonRef}
          onClick={toggleBox}
        >
          <img src="./images/User2.png" className="w-7 h-5 mx-auto pr-2" />

          {!isBoxVisible ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="8 4 16 12 8 20"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="4 8 12 16 20 8"></polyline>
            </svg>
          )}
        </button>

        {/* Hidden Box */}
        {isBoxVisible && (
          <div
            ref={boxRef}
            className="absolute -right-3 mt-2 bg-white shadow-md rounded-lg w-40 md:w-44 hover:bg-gray-100 p-2"
            id="signoutbox"
          >
            <p className="text-gray-400 font-semibold text-sm text-center bg-gray-100 rounded-lg py-1.5 px-1.5">
              Welcome
              <span className="block font-normal text-sm cursor-pointer text-gray-600">
                {props.name}
              </span>
            </p>

            <hr className="text-gray-400 my-2 mb-3 border-t-1 border-gray-400" />

            {/* <button className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex justify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500">
              <img src="./images/Account.png" className="w-5 h-5" />
              <span className="ml-1">Account</span>
            </button>

            <button className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex justify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500">
              <img src="./images/Setting.png" className="w-5 h-5" />
              <span className="ml-1">Setting</span>
            </button> */}

            <button
              onClick={() => props.logout()}
              className="block w-full px-2 py-1.5 my-1 text-left text-xs sm:text-sm md:text-base flex justify- items-center rounded-lg hover:bg-gray-100 text-gray-700 hover:underline hover:decoration-gray-500"
            >
              <img src="./images/SignOut.png" className="w-5 h-4" />
              <span className="ml-1">Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarHome;
