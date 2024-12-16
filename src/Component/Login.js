import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import { config, configdev, msalInstance } from '../config';
import './Login.css';

import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const Login = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [username, setUsername] = useState('');
 
 
 
  // login via Username and password
 
  const handleLoginViaUsername = (e) => {
    e.preventDefault(); // Prevent form submission
 
    // Predefined credentials
    const validUsername = 'uagarwal@acuitas360.com';
    const validPassword = 'A360**';
 
    if (username === validUsername && password === validPassword) {
      alert('Login successful!');
      setErrorMessage('');
        } else {
      setErrorMessage('Invalid Credentials. Please reach out to your administrator.');
    }
  };

  useEffect(() => {
    const initializeMsal = async () => {
      await msalInstance.initialize();
      const accounts = msalInstance.getAllAccounts();
      console.log(accounts)
      if (accounts && accounts.length > 0) {
        setIsAuthenticated(true);
        console.log("setIsAuthenticated", isAuthenticated)
        navigate('/home');

      }
      setIsInitialized(true); // Set initialization complete
    };
    initializeMsal();
  }, [navigate]);

  const particlesInit = useCallback(async engine => {
    console.log(engine);
    await loadSlim(engine);
}, []);

const particlesLoaded = useCallback(async container => {
    await console.log(container);
}, []);

  // logout
  const handleLogin = async (event) => {
    event.preventDefault()
    
    if (!isInitialized) {
      console.warn('MSAL instance is not initialized yet');
      return;
    }

    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ['user.read']
      });
      if (loginResponse) {
        setIsAuthenticated(true);
        navigate('/home'); // Redirect to /home on successful login
        window.location.reload();// Redirect to /home if already logged in
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (

    <div class=" flex justify-center items-center h-screen">
      <div class="w-1/2 h-screen hidden lg:block">
        <img src="/images/sidefull.png" alt="Placeholder Image" class="object-cover  w-full h-full" />

        {/* <img src="/images/sideIcon.png" alt="Placeholder Image" class="absolute z-20 top-20 left-32 w-2/5" /> */}
      </div>

      <div class="lg:py-28 lg:px-20 md:p-52 sm:20 px-8 w-full lg:w-1/2 flex flex-col justify-center h-screen">
     
        <div id='bgg'>

        <Particles
className="z-0"
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#F5F5F5",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 0,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#84A7A1",
                    },
                    links: {
                        color: "#84A7A1",
                        distance: 150,
                        enable: true,
                        opacity: 0.25,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 3,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 60,
                    },
                    opacity: {
                        value: 0.3,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
        />

          <div class="flex justify-center ">
            <img src="images/OneHumLogo.png"
              alt="One Hum Logo"
              class=" mb-8 mt-1 md:mt-6  logo" />
          </div>
          {!isAuthenticated&&(
          <form action="#" method="POST" class="space-y-4 maincard mx-auto">
            <div>
              <label for="username" class="text-left my-0 mb-1 block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="username" name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
                class=" w-full my-0  px-3  py-2 text- border border-gray-300 text-sm rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username" />
            </div>
            <div>
              <label for="password" class=" text-left my-0 mb-1 block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="password" name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
                class=" w-full my-0 px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password" />
            </div>
            <div class="flex items-center justify-between ">
              <a href="#" class="text-sm text-blue-500 hover:underline my-0 py-0">Forgot Your Password?</a>
            </div>
            {errorMessage && (
          <div className="text-red-600 text-sm">
            {errorMessage}
          </div>
        )}
            <button type="submit"
             onClick={handleLoginViaUsername}
 
              class="userlogin my-1 mt-2 w-full mx-auto bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              Log In
            </button>

            <div class="flex items-center my-0 my-2">
              <div class="flex-1 border-t py-0 border-gray-300"></div>
              <span class="px-4 text-gray-500 py-0 font-medium">SSO login</span>
              <div class="flex-1 border-t py-0 border-gray-300"></div>
            </div>


            <button type="submit"
            onClick={handleLogin}
              class="sso w-full mx-auto my-1 bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
              Sign in
            </button>

          </form>
          )}
        </div>
        <footer class="text-center text-gray-600 text-sm pt-16 pb-4">
        © 2024 Acuitas360 LLC. All rights reserved 
    </footer>
      </div>
    </div>

 


  );
};


{/* <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
{!isAuthenticated && isInitialized && (
  <button onClick={handleLogin} style={{ padding: '10px 20px', fontSize: '16px' }}>
    Sign in with Microsoft
  </button>
)}
</div> */}


export default Login;
