import React, {useContext} from "react";

import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AdminDataContext} from "../context/AdminContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const {admin, setAdmin} = useContext(AdminDataContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm();

  const onsubmit = async (data) => {
    const adminLogin = {
      email: data.email,
      password: data.password,
    };

    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/admin/login`,
      adminLogin
    );

    if (response.status === 200) {
      const data = response.data;
      setAdmin(data.admin);
      localStorage.setItem("admintoken", data.admintoken);
      navigate("/admin-home");
    }

    reset();
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-6">Admin Login</h2>
        <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
          <form onSubmit={handleSubmit(onsubmit)}>
            {/* Email */}
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
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                className="bg-black text-white font-semibold rounded px-4 py-2 w-full text-lg mt-6 hover:bg-gray-800 transition"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <p className="mt-2 text-md text-center">
            You don`t have an account{" "}
            <Link
              to={"/admin-signup"}
              className="text-blue-700 underline font-bold"
            >
              Singnup here
            </Link>
          </p>

          <div className="mt-10">
            <Link
              to={"/login"}
              className="bg-[#d5622d] text-white flex justify-center items-center font-semibold rounded px-4 py-2 w-full mb-5 text-lg placeholder:text-base"
            >
              Sign in as User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
