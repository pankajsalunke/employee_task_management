import React from "react";
import Navbar from "./Nav/Navbar";
import EmployeeDash from "../component/EmployeeDash";
import EmpStartPage from "../component/EmpStartPage";

const EmployeeHome = () => {
  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-200">
     
      <div className="w-full h-22 shadow-md bg-white">
        <Navbar />
      </div>
      
      <EmpStartPage />
      
    </div>
  );
};

export default EmployeeHome;