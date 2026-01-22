// src/pages/AllTasksPage.jsx
import {useEffect, useState} from "react";
import axios from "axios";
import AllTasks from "./AllTasks";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";

const AllTasksPage = () => {
  const [user, setUser] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProfile = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/employee/emp-profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((res) => {
        if (res.status === 200) {
          setUser(res.data);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  };

  useEffect(() => {
    fetchProfile();
  }, [token, refreshFlag]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <div className="px-2 py-2 bg-gray-50 flex items-center justify-between ">
        <Link
          to={"/dashboard"}
          className=" px-6 py-2 flex items-center gap-2 text-xl font-medium text-blue-500 "
        >
          <ArrowLeftIcon className="w-6 h-6 text-blue-500 " />
          Back
        </Link>
      </div>
      <div className="flex items-center justify-center flex-col py-4">
        <h2 className="text-2xl font-bold text-center text-blue-800 uppercase tracking-wider mb-6">
          All Tasks
        </h2>
        <AllTasks
          employeeId={user}
          fetchProfile={fetchProfile}
          setRefreshFlag={setRefreshFlag}
        />
      </div>
    </div>
  );
};

export default AllTasksPage;
