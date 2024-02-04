import React, { useState, useContext } from "react";
import axios from "axios";
import { useVendors } from "../context/vendorContext";

const RegisteredVendorCard = (vendor) => {
  const { vendors, setVendors, setallVendors, allVendors } = useVendors();

  const locationMapping = [
    { Kanhar: 1 },
    { Indravati: 2 },
    { MSH: 3 },
    { "Mess Block": 4 },
    { Delta: 5 },
  ];

  const denyVendor = async (vendor_id, newStatus) => {
    console.log(vendor_id, newStatus);
    const updatedVendors = allVendors.filter((vendor) => {
      console.log(vendor);
      return vendor._id !== vendor_id;
    });

    // const updatedOrders = orders.filter((order) => order.order_id !== order_id);
    try {
      const response = await axios.put(
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
      setallVendors([...updatedVendors]);
    } catch (error) {
      console.error("Error updating order:", error);
      // Handle the error appropriately
    }
  };

  const locationIndex = vendor.vendor.location - 1;
  const locationName =
    locationIndex >= 0 && locationIndex < locationMapping.length
      ? Object.keys(locationMapping[locationIndex])[0]
      : "Unknown Location";

  return (
    <div className="border-4 w-fit md:p-6 p-4 m-2 bg-white rounded-lg shadow-md py-auto content-center flex flex-col items-center justify-between ">
      <div className="text-gray-600">
        Owner Name : {vendor.vendor.ownerName}
      </div>
      <div className="text-gray-600">
        Restaurant Name : {vendor.vendor.restaurantName}
      </div>
      <div className="text-gray-600"> Location : {locationName}</div>
      <div className="text-gray-600">Phone Number : {vendor.vendor.phone}</div>

      <div className="mt-4 flex justify-between flex-col gap-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => denyVendor(vendor.vendor._id, "debarred")}
        >
          Debar
        </button>
      </div>
    </div>
  );
};

export default RegisteredVendorCard;
