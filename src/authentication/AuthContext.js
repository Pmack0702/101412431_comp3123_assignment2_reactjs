import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on initial load
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     setIsAuthenticated(true);
  //   }
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token found in localStorage:", token); // Debug: Check token on app load
    setIsAuthenticated(!!token); // Update state based on token presence
  }, []);
  
  const login = (token) => {
    try {
      console.log("Token before storage:", token);
      localStorage.setItem("token", token);
      console.log("Token stored in localStorage.");
      setIsAuthenticated(true);
      console.log("Authentication state set to true.");
    } catch (error) {
      console.error("Error storing token in localStorage:", error);
    }
  };
  

  const logout = () => {
    console.log("Clearing token");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    // window.location.reload(); // Ensure a clean state

  };

  useEffect(() => {
    console.log("Authentication State:", isAuthenticated);
  }, [isAuthenticated]);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
