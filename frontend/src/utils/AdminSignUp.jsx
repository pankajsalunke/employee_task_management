import axios from "axios";
import React, {useContext} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {AdminDataContext} from "../context/AdminContext.jsx";

const AdminSignUp = () => {
  const navigate = useNavigate();
  const {admin, setAdmin} = useContext(AdminDataContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    const adminInfo = {
      fullname: {
        firstname: data.firstname,
        lastname: data.lastname,
      },
      email: data.email,
      password: data.password,
      role: data.role,
      dept: data.dept,
    };
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/register/admin`,
      adminInfo
    );

    if (response.status === 201) {
      const data = response.data;
      setAdmin(data.admin);
      localStorage.setItem("admintoken", data.admintoken);
      navigate("/admin-home");
    }

    reset();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-6">Admin Registration</h2>
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="text-lg font-medium">Full Name:</label>
            <div className="flex gap-2 mt-2">
              <input
                className="bg-gray-200 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="First Name"
                {...register("firstname", {required: "First Name is required"})}
              />
              <input
                className="bg-gray-200 rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base"
                type="text"
                placeholder="Last Name"
                {...register("lastname", {required: "Last Name is required"})}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            {errors.fullname && (
              <p className="text-red-500 text-sm">{errors.fullname.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Email:</label>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Department:</label>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Enter your department"
              {...register("dept", {required: "Department is required"})}
            />
            {errors.dept && (
              <p className="text-red-500 text-sm">{errors.dept.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Role:</label>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="text"
              placeholder="Enter your role"
              {...register("role", {required: "Role is required"})}
            />
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="text-lg font-medium">Password:</label>
            <input
              className="bg-gray-200 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <button
              className="bg-black text-white font-semibold rounded px-4 py-2 w-full text-lg mt-6 hover:bg-gray-800 transition"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>
        <p className="mt-2 text-md text-center">
          Aleready have an account{" "}
          <Link
            to={"/admin-login"}
            className="text-blue-700 underline font-bold"
          >
            login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminSignUp;
