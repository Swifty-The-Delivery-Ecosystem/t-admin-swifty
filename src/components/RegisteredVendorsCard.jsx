import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useVendors } from "../context/vendorContext";

const RegisteredVendorCard = () => {
  const { setallVendors, allVendors } = useVendors();

  const locationMapping = [
    { Kanhar: 1 },
    { Indravati: 2 },
    { MSH: 3 },
    { "Mess Block": 4 },
    { Delta: 5 },
  ];

  const denyVendor = async (vendor_id, newStatus) => {
    try {
      const updatedVendors = allVendors.filter(
        (vendor) => vendor._id !== vendor_id
      );
      await axios.put(
        `https://auth-six-pi.vercel.app/api/v1/auth/admins/vendors/${vendor_id}/status`,
        {
          newStatus: newStatus,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.token,
          },
        }
      );
      setallVendors(updatedVendors);
    } catch (error) {
      console.error("Error updating vendor:", error);
      // Handle the error appropriately
    }
  };

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
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  return (
    <div className="flex justify-between">
      {allVendors &&
        allVendors.map((vendor) => (
          <div
            key={vendor._id}
            className="border-4 w-fit md:p-6 p-4 m-2 bg-white rounded-lg shadow-md py-auto items-center"
          >
            <div className="text-gray-600">Owner Name : {vendor.ownerName}</div>
            <div className="text-gray-600">
              Restaurant Name : {vendor.restaurantName}
            </div>
            <div className="text-gray-600">
              Location : {Object.keys(locationMapping[vendor.location - 1])[0]}
            </div>
            <div className="text-gray-600">Phone Number : {vendor.phone}</div>

            <div className="mt-4 flex justify-between flex-col gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => denyVendor(vendor._id, "debarred")}
              >
                Debar
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RegisteredVendorCard;
