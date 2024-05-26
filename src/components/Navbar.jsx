import React, { useState } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [bearerToken, setBearerToken] = useState(
    localStorage.getItem("access_token") || ""
  );

  const handleLogout = () => {
    navigate("/Login");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };
  return (
    <div className="bg-gray-800">
      <div className="h-6rem px-5 flex align-items-center justify-content-between ">
        <h2 className="text-white font-bold">
          Rentify - Where renting meets simplicity!
        </h2>
       
      </div>
    </div>
  );
};

export default Navbar;
