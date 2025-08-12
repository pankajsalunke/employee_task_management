import React from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const EmployeeLogout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");


axios
.get(`${import.meta.env.VITE_BASE_URL}/employee/emp-logout`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then((response) => {
  console.log(response);
  
  if (response.status === 200) {
    localStorage.removeItem("token");
    navigate("/");
  }
});

  return (
    <div>
    </div>
  );
};

export default EmployeeLogout;
