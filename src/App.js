import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Component/Home';
import Cards_Data from "./Data";
import Product from './Component/Product';
import MsLogin from './Component/Login';
import { PublicClientApplication } from '@azure/msal-browser';
import { config, msalInstance } from './config';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Router>
      <Routes>
       
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <MsLogin />} />
        <Route path="/home" element={isAuthenticated ? <Home /> : <Navigate to="/" />} />
        {Cards_Data.map((item) => (
          <Route path={item.route} element={isAuthenticated ? <Product val={item} />: <Navigate to="/" />} key={item.route} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
