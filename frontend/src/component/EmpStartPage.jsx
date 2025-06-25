import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmpStartPage = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchProfile = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/employee/emp-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  };
   const demo = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/task/gettask/${user._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        if (response.status === 200) {
          setUser((prev) => ({
            ...prev,
            taskNumbers: response.data.taskNumbers,
          }));
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchProfile();
   
  }, [token]);

  useEffect(() =>{
     if (user?._id) {
      demo();
    }
  },[user])

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 min-h-screen">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Welcome, {user.fullname?.firstname}!</h1>

        <div className="space-y-4">
          <InfoRow label="Full Name" value={`${user.fullname?.firstname} ${user.fullname?.lastname}`} />
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Department" value={user.dept} />
          <InfoRow label="Role" value={user.role} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Task Summary</h2>
          <div className="grid grid-cols-2 gap-4 ">
            <TaskCard label="New Tasks "   count={user.taskNumbers?.newTask || 0} />
            <TaskCard label="Active Tasks" count={user.taskNumbers?.active || 0}  />
            <TaskCard label="Completed Tasks" count={user.taskNumbers?.completed || 0}  />
            <TaskCard label="Failed Tasks" count={user.taskNumbers?.failed || 0}  />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-gray-600">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);

const TaskCard = ({ label, count, color }) => (
  <div className={`bg-amber-100 hover:bg-amber-200 border-l-4 border-${color}-500 p-4 rounded-lg`}>
    <h3 className="text-md font-medium text-${color}-800">{label}</h3>
    <p className="text-2xl font-bold text-${color}-700">{count}</p>
  </div>
);

export default EmpStartPage;
