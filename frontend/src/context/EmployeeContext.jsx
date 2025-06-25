import React, {createContext, useState} from "react";

export const UserDataContext = createContext();

const EmployeeContext = ({children}) => {
  const [user, setUser] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    role: "",
    dept: "",
  });

  return (
    <div>
      <UserDataContext.Provider value={{user, setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  );
};

export default EmployeeContext;
