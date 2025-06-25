import React from "react";

// import EmployeeDash from "./employee/EmployeeDash";
import { Routes, Route, useParams } from "react-router-dom";
import EmpLogin from "./utils/EmpLogin";
import EmpRegistration from "./utils/EmpRegistration";
import AdminLogin from "./utils/AdminLogin";
import AdminSignUp from "./utils/AdminSignUp";
import EmployeeHome from "./utils/EmployeeHome";
import AdminHome from "./utils/AdminHome";
import EmployeeProtectedWrapper from "./utils/EmployeeProtectedWrapper";
import EmployeeLogout from "./utils/EmployeeLogout";
import AdminProtectedWrapper from "./utils/AdminProtectedWrapper";
import Start from "./utils/Start";
import AdminLogout from "./utils/AdminLogout";
import TaskDetail from "./component/TaskDetail";
import EmployeeStats from "./admin/EmployeeStats";
import AllTasksPage from "./component/AllTaskPage";
import EmployeeDash from "./component/EmployeeDash";
import AdminForm from "./admin/AdminForm";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Start />}
      />
      <Route
        path="/login"
        element={<EmpLogin />}
      />
      <Route
        path="/signup"
        element={<EmpRegistration />}
      />
      <Route
        path="/emp-home"
        element={
          <EmployeeProtectedWrapper>
            <EmployeeHome />
          </EmployeeProtectedWrapper>
        }
      />
      <Route
        path="/alltask"
        element={
          <EmployeeProtectedWrapper>
            <AllTasksPage />
          </EmployeeProtectedWrapper>
        }
      />
      <Route
        path="/dashboard"
        element={
          <EmployeeProtectedWrapper>
            <EmployeeDash />
          </EmployeeProtectedWrapper>
        }
      />
      <Route
        path="/tasks/:taskId"
        element={
          <EmployeeProtectedWrapper>
            <TaskDetail />
          </EmployeeProtectedWrapper>
        }
      />
      <Route
        path="/emp/logout"
        element={
          <EmployeeProtectedWrapper>
            <EmployeeLogout />
          </EmployeeProtectedWrapper>
        }
      />

      <Route
        path="/taskdetail"
        element={<TaskDetail />}
      />

      <Route
        path="/admin-login"
        element={<AdminLogin />}
      />
      <Route
        path="/admin-signup"
        element={<AdminSignUp />}
      />
      <Route
        path="/admin-home"
        element={
          <AdminProtectedWrapper>
            <AdminHome />
          </AdminProtectedWrapper>
        }
      />
      <Route
        path="/create-task"
        element={
          <AdminProtectedWrapper>
            <AdminForm />
          </AdminProtectedWrapper>
        }
      />
      <Route
        path="/admin-stats"
        element={
          <AdminProtectedWrapper>
            <EmployeeStats />
          </AdminProtectedWrapper>
        }
      />
      <Route
        path="/admin-logout"
        element={
          <AdminProtectedWrapper>
            <AdminLogout />
          </AdminProtectedWrapper>
        }
      />
    </Routes>
  );
};

export default App;
