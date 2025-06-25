import React, {useContext, useEffect, useState} from "react";
import {UserDataContext} from "../context/EmployeeContext.jsx";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const EmployeeProtectedWrapper = ({children}) => {
  const {user, setUser} = useContext(UserDataContext);

  const [isLoading, setIsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/employee/emp-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate("/login");
      });
  }, [token]);

  if (isLoading) {
    return <div>Loding ....</div>;
  }

  return <div>{children}</div>;
};

export default EmployeeProtectedWrapper;
