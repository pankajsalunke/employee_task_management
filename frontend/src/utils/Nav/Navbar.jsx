import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const token = localStorage.getItem("token");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/employee/emp-profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);

        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [token]);


  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="bg-gradient-to-r from-gray-600 to-gray-800 p-4 w-full flex justify-between items-center shadow-lg">
      <div className="w-full flex justify-around items-center">
        <div>
          <div className="flex flex-row items-center gap-4">
            <h1 className="text-2xl font-bold text-white">Hello</h1>
            <h2 className="text-2xl font-medium text-gray-300 " >{user?.fullname?.firstname}</h2>
          </div>
        </div>
        <div className="flex gap-10 justify-end pr-10 w-full ">

          <div>
            <Link to={'/dashboard'} className="text-white font-medium text-2xl hover:text-cyan-600" >Dashboard</Link>
          </div>
          <div>
            <Link to={'/alltask'} className="text-white font-medium text-2xl hover:text-cyan-600" >View Tasks</Link>
          </div>
          <div>
            <Link
              to="/emp/logout"
              className="bg-red-500 px-4 py-2 rounded-xl text-lg font-semibold text-white transition-transform duration-200 hover:bg-red-600 active:scale-95 shadow-md"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const StartNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Quirk</h1>
      <ul className="hidden md:flex space-x-6 ">
        <li className="hover:text-pink-950 text-xl rounded">About us</li>
        <li className="hover:text-pink-950 text-xl rounded">How it works</li>
        <li className="hover:text-pink-950 text-xl rounded">Blog</li>
        <li className="hover:text-pink-950 text-xl rounded">Pricing</li>
      </ul>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="border px-4 py-2 font-semibold hover:bg-sky-100 hover:text-pink-500 rounded-full"
        >
          Log In
        </button>
        <button
          onClick={() => navigate("/signup")}
          className="bg-white hover:bg-amber-100 text-purple-600 px-4 py-2 font-semibold rounded-full"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
