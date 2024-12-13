import React, { useState, useEffect, useRef } from "react";
import './Product.css';
import Cards_Data from "../Data";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaExpand } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { config, msalInstance } from "../config";


const Product = (props) => {
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);


  useEffect(() => {
    const initializeMsal = async () => {
      try {
        await msalInstance.initialize();
        setIsInitialized(true); // Mark as initialized
        const accounts = msalInstance.getAllAccounts();
        if (accounts && accounts.length > 0) {
          setIsAuthenticated(true);
          fetchUserDetails();
        }
      } catch (error) {
        console.error('MSAL initialization failed:', error);
      }
    };
    initializeMsal();
  }, []);

  // user detail
  const fetchUserDetails = async () => {
    try {
      const account = msalInstance.getAllAccounts()[0]; // Get the first account
      console.log(account)
      setUsername(account.username); // username
      setName(account.name); 

    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance.acquireTokenPopup({
          scopes: ['user.read']
        }).then((response) => {
          setUsername(response.account.name);
          console.log(response.account);
          setName(response.account.name);
        }).catch((error) => {
          setError('Failed to fetch user details');
        });
      } else {
        setError('Failed to fetch user details');
      }
    }
  };

  const handleLogout = async () => {
    if (!isInitialized) {
      console.warn('MSAL instance is not initialized yet');
      return;
    }

    try {
      await msalInstance.logoutPopup();
      setIsAuthenticated(false);
      setUsername('');
      setName('');
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };



  const iframeRef = useRef(null); // Create a reference for the iframe

  // Function to toggle fullscreen for the iframe
  const toggleFullscreen = () => {
    const iframe = iframeRef.current;

    // Check if the iframe is already in fullscreen
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen(); // For most browsers
    } else if (iframe.mozRequestFullScreen) {
      iframe.mozRequestFullScreen(); // For Firefox
    } else if (iframe.webkitRequestFullscreen) {
      iframe.webkitRequestFullscreen(); // For Safari
    } else if (iframe.msRequestFullscreen) {
      iframe.msRequestFullscreen(); // For IE/Edge
    }
  };

  return (
    <div>
      <Navbar val={props.val}  username={username.toLowerCase()} name={name} logout={handleLogout}/>

      <div className="relative bg-white frame">
        <iframe
          src={props.val.link}
          className=" shadow-xl bg-white shadow-gray-300 border-gray-800 w-100 h-100"
          ref={iframeRef}
        ></iframe>

        {/* Fullscreen button */}
        <button
          onClick={toggleFullscreen}
          className="btn absolute p-2 bg-gray-500 text-white rounded-full shadow-lg fullscreen"
        >
          <FaExpand size={24} className="" /> {/* Icon for fullscreen */}
        </button>
      </div>

      <Footer/>
    </div>
  );
};

export default Product;