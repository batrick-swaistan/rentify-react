import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SellerDashboard from "./components/SellerDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <div>
          <Routes>
            <Route path="/" exact element={<Dashboard />}></Route>
            <Route path="/Dashboard" element={<Dashboard/>}></Route>
            <Route index element={<Dashboard />}></Route>
            <Route path="/SellerDashboard" element={<SellerDashboard />}></Route>
            <Route path="/Signup" element={<Signup />}></Route>
            <Route path="/Login" element={<Login />}></Route>
            
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
