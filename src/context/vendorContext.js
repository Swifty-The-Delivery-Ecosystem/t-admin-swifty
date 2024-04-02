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

  return (
    <VendorContext.Provider value={contextValue}>
      {children}
    </VendorContext.Provider>
  );
};
