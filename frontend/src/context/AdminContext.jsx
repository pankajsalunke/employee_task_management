import React, {createContext, useContext, useState} from "react";

export const AdminDataContext = createContext();

const AdminContext = ({children}) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateAdmin = (adminData) => {
    setAdmin(adminData);
  };

  const value = {
    admin,
    setAdmin,
    isLoading,
    setIsLoading,
    error,
    setError,
    updateAdmin,
  };

  return (
    <div>
      <AdminDataContext.Provider value={value}>
        {children}
      </AdminDataContext.Provider>
    </div>
  );
};

export default AdminContext;
