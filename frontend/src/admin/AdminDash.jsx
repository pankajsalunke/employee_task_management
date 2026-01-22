import {useEffect, useState} from "react";
import axios from "axios";

import {Link} from "react-router-dom";
import AdminStartPage from "./AdminStartPage";

const AdminDash = () => {
  const [profile, setProfile] = useState({});
  const [relod, setRelod] = useState(false);
  const admintoken = localStorage.getItem("admintoken");

useEffect(() => {
  if (!admintoken) return;

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/admin-profile`,
        {
          headers: { Authorization: `Bearer ${admintoken}` },
          withCredentials: true,
        }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching admin profile", err);
    }
  };

  fetchProfile();
}, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            Hello{" "}
            <span className="text-green-400">
              {profile?.fullname?.firstname || "Admin"} 👋
            </span>
          </h1>
        </div>
        <div>
          <Link
            to={"/create-task"}
            className=" hover:text-cyan-700 px-4 py-2 font-base text-xl rounded "
          >
            Create Task
          </Link>
          <Link
            to={"/admin-stats"}
            className=" hover:text-cyan-700 px-4 py-2 font-base text-xl rounded "
          >
            Employee Stats
          </Link>
          <Link
            to={"/admin-logout"}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Log out
          </Link>
        </div>
      </div>
      <div>
        <AdminStartPage />
      </div>
    </div>
  );
};

export default AdminDash;
