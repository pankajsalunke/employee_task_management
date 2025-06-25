import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminStartPage = () => {
  const [profile, setProfile] = useState({});
  const [taskTotals, setTaskTotals] = useState({
    newTask: 0,
    active: 0,
    completed: 0,
    failed: 0,
  });
  const [relod, setRelod] = useState(false);

  const admintoken = localStorage.getItem("admintoken");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/task/task`,
        {
          headers: { Authorization: `Bearer ${admintoken}` },
        }
      );

      const tasksArray = res.data.tasks || [];
      let newTask = 0,
        active = 0,
        completed = 0,
        failed = 0;

      tasksArray.forEach((task) => {
        if (task.status?.newTask) newTask += 1;
        if (task.status?.active) active += 1;
        if (task.status?.completed) completed += 1;
        if (task.status?.failed) failed += 1;
      });

      setTaskTotals({ newTask, active, completed, failed });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/admin/admin-profile`,
        {
          headers: { Authorization: `Bearer ${admintoken}` },
        }
      );
      setProfile(res.data);
    } catch (err) {
      console.error("Error fetching admin profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchTasks();
  }, [relod]);

  const fullName = `${profile?.fullname?.firstname || "Admin"} ${
    profile?.fullname?.lastname || ""
  }`;

  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-md p-6 sm:p-8 border border-gray-800">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-400 mb-6">
        Admin Profile
      </h2>

      <div className="text-center grid grid-cols-1 sm:grid-cols-2 gap-6">
        <InfoItem label="Full Name" value={fullName} />
        <InfoItem label="Email" value={profile.email} />
        <InfoItem label="Department" value={profile.dept} />
        <InfoItem label="Role" value={profile.role} />
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold text-white mb-4">
          Overall Task Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <TaskCard label="New Tasks" count={taskTotals.newTask} color="yellow" />
          <TaskCard label="Active Tasks" count={taskTotals.active} color="blue" />
          <TaskCard label="Completed Tasks" count={taskTotals.completed} color="green" />
          <TaskCard label="Failed Tasks" count={taskTotals.failed} color="red" />
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ label, count, color }) => {
  const colorMap = {
    red: "bg-red-700 text-white hover:bg-red-600",
    green: "bg-green-700 text-white hover:bg-green-600",
    blue: "bg-blue-700 text-white hover:bg-blue-600",
    yellow: "bg-yellow-500 text-black hover:bg-yellow-400",
  };

  return (
    <div className={`p-4 rounded-lg shadow ${colorMap[color]} transition-colors`}>
      <h4 className="text-sm font-medium">{label}</h4>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-300">{label}</h3>
    <p className="text-gray-400">{value}</p>
  </div>
);

export default AdminStartPage;
