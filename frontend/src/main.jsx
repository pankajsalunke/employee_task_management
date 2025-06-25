import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import AdminContext from "./context/AdminContext.jsx";
import EmployeeContext from "./context/EmployeeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdminContext>
      <EmployeeContext>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </EmployeeContext>
    </AdminContext>
  </StrictMode>
);
