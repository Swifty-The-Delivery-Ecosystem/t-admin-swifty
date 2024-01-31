import React, { createContext, useContext, useState, useEffect } from "react";

const VendorContext = createContext();

export const useVendors = () => {
  return useContext(VendorContext);
};

export const VendorProvider = ({ children }) => {
  const [vendors, setVendors] = useState([]);
  const [allVendors, setallVendors] = useState([]);

  const contextValue = {
    vendors,
    setVendors,
    allVendors,
    setallVendors,
  };

  const handleVendorFetch = async () => {
    try {
      const response = await fetch(
        "https://auth-six-pi.vercel.app/api/v1/auth/admins/new_vendors",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );

      const result = await response.json();
      setVendors(result.data.newVendors);
    } catch (e) {
      console.log(e);
    }
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    handleVendorFetch();
  }, []);

  const getAllVendors = async () => {
    try {
      const response = await fetch(
        "https://auth-six-pi.vercel.app/api/v1/auth/admins/vendors/view",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );

      const result = await response.json();
      setallVendors(result.vendors);
      console.log("hell yeah", result.vendors);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  return (
    <VendorContext.Provider value={contextValue}>
      {children}
    </VendorContext.Provider>
  );
};
