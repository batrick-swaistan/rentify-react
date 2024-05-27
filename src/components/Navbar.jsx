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
        <div>
          <h2 className="text-white font-bold">
            Rentify - Where renting meets simplicity!
          </h2>
        </div>
        <div className="flex flex-column gap-2">
          <small className="text-white font-bold">
            Get Project Details at: <a
              href="https://github.com/batrick-swaistan/rentify-react"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2"
            >
              <i className="pi pi-github" style={{ color: "white" }}></i>
            </a>
          </small>
          <small className="text-white font-bold">
            View  Project Documentation : <a
              href="Rentify-Presidio Challenge.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-white"
              style={{textDecoration:"none"}}
            > Download 
              <i className="pi pi-arrow-circle-down ml-2" style={{ color: "white" }}></i>
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
