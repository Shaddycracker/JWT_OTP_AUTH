import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const MainLayout:React.FC = () => {

  
    
  return (
    <div className="bg-stone-400 w-screen h-screen m-0 p-0 overflow-x-hidden">
        <Navbar/>
        <Outlet />
    </div>
  );
};

export default MainLayout;
