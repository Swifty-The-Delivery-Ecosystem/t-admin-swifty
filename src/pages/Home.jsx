import React, { createContext, useState, useContext } from "react";
import { useVendors } from "../context/vendorContext";
import VendorCard from "../components/VendorCard";

const Home = () => {
  const { vendors } = useVendors();
//   const searchCards = () => {
//     if (search !== "") {
//       const filteredOrders = orders.filter(
//         (order) =>
//           order.itemName.toLowerCase().includes(search.toLowerCase()) ||
//           order.deliveryLocation.toLowerCase().includes(search.toLowerCase())
//       );

//       return filteredOrders.map((e) => (
//         <VendorCard
//           order={e}
//           // itemName={e.itemName}
//           // quantity={e.quantity}
//           // deliveryLocation={e.deliveryLocation}
//           // orderId={e.orderId}
//           // timestamp={e.timestamp}
//           // key={e.orderId}
//         />
//       ));
//     } else {
//       return vendors.map((vendor) => <VendorCard order={e} />);
//     }
//   };

//   const PendCards = () => {
//     console.log(pendingOrders);
//     return pendingOrders.map((e) => <PendingCard order={e} />);
//   };

  return (
    <>
      <div className="min-h-screen px-10 mx-auto text-center divide-x divide-black divide-dashed">
        <div className="my-4">
          <div className="py-4 px-10 font-bold text-2xl text-center">
            New Vendors
          </div>
          {vendors.map((vendor) => {
            return <VendorCard vendor={vendor} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
