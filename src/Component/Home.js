import React, { useEffect, useState, useMemo } from "react";
import './Home.css';
import Footer from "./Footer";
import Cards from "./Cards";
import { useNavigate } from "react-router-dom";
import { PublicClientApplication } from "@azure/msal-browser";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { config, configdev, msalInstance } from "../config";
import NavbarHome from "./NavbarHome";
import Content from "./Content";

import { useCallback } from "react";
import Particles from "react-tsparticles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.


const Home = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        await loadSlim(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

        


  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [showSignOut, setShowSignOut] = useState(false);

  // Toggle visibility of the Sign out button when the p tag is clicked
  const handleClick = () => {
    setShowSignOut(!showSignOut);
  };

  


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
      setUsername(account.username); // username
      setName(account.name); 
      console.log(account)

    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        msalInstance.acquireTokenPopup({
          scopes: ['user.read']
        }).then((response) => {
          setUsername(response.account.username);
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

  return (
    <div>
      <div className="relative">
      <NavbarHome logout={handleLogout} name={name}/>
      <Content />
      </div>
        


      
      <Footer />
    </div>
  );
};

export default Home;
