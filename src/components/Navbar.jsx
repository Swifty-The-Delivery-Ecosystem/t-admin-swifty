import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import swiftyLogo from "../assets/swifty_bg.png";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-xl sticky top-0 p-4 flex items-center justify-between">
      <img
        src={swiftyLogo}
        alt="Logo"
        className="max-w-14 rounded-full shadow-md"
      />

      <div className="flex items-center">
        <a href="#" className=" mr-8 font-semibold">
          Analytics
        </a>
        <div
          onClick={handleLogout}
          className="t mr-8 cursor-pointer font-semibold"
        >
          <FontAwesomeIcon
            icon={faRightFromBracket}
            style={{ color: "black" }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
