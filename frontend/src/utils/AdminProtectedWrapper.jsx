import axios from "axios";
import React, {useContext, useEffect, useState} from "react";
import {AdminDataContext} from "../context/AdminContext";
import {useNavigate} from "react-router-dom";


const AdminProtectedWrapper = ({children}) => {
  const {admin, setAdmin} = useContext(AdminDataContext);
  const navigate = useNavigate();
  const admintoken = localStorage.getItem("admintoken");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!admintoken) {
      navigate("/admin-login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_UR}/admin/admin-profile`, {
        headers: {
          Authorization: `Bearer ${admintoken}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setAdmin(response.data.admin);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("admintoken");
        navigate("/admin-login");
      });
  }, [admintoken]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>{children}</div>;
};

export default AdminProtectedWrapper;
