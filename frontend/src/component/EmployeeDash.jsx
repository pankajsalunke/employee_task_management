import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/24/outline";

const EmployeeDash = () => {
  const [user, setUser] = useState(null);
  const [task, setTask] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchProfile = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/employee/emp-profile`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data);
          setIsLoading(false);
        }
      })
      .catch((err) => console.error("Error fetching profile:", err));
  };

  const fetchTasks = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/task/gettask/${user._id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then((response) => {
        if (response.status === 200) {
          setTask(response.data);
          console.log(response.data);

          setProfile((prev) => ({
            ...prev,
            taskNumbers: response.data.taskNumbers,
          }));
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  };

  useEffect(() => {
    fetchProfile();
  }, [token, refreshFlag]);

  useEffect(() => {
    if (user?._id) {
      fetchTasks();
    }
  }, [user]);

  const handleCardClick = (statusKey) => {
    if (task?.tasks) {
      const filtered = task.tasks.filter((t) => t.status[statusKey] === true);
      setFilteredTasks(filtered);
      setSelectedStatus(statusKey);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="px-2 py-2 bg-gray-50 flex items-center justify-between">
        <Link
          to={"/emp-home"}
          className="px-6 py-2 flex items-center gap-2 text-xl font-medium text-blue-500"
        >
          <ArrowLeftIcon className="w-6 h-6 text-blue-500" />
          Back
        </Link>
        <Link
          to={"/alltask"}
          className="px-6 py-2 flex items-center gap-2 text-xl font-medium text-blue-500"
        >
          View Task
          <ArrowRightIcon className="w-6 h-6 text-blue-500" />
        </Link>
      </div>

      <div className="flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8  min-h-screen">
        <div className="max-w-6xl w-full bg-gray-100 rounded-xl shadow-md p-6 sm:p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-blue-800 uppercase tracking-wider mb-8">
            Employee Dashboard
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <Card
              color="blue"
              label="Active Tasks"
              value="active"
              count={profile?.taskNumbers?.active || 0}
              onClick={handleCardClick}
            />
            <Card
              color="green"
              label="Completed Tasks"
              value="completed"
              count={profile?.taskNumbers?.completed || 0}
              onClick={handleCardClick}
            />
            <Card
              color="yellow"
              label="New Tasks"
              value="newTask"
              count={profile?.taskNumbers?.newTask || 0}
              onClick={handleCardClick}
            />
            <Card
              color="red"
              label="Failed Tasks"
              value="failed"
              count={profile?.taskNumbers?.failed || 0}
              onClick={handleCardClick}
            />
          </div>

          {filteredTasks.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 capitalize">
                {selectedStatus}
              </h2>
              <ul className="space-y-4">
                {filteredTasks.map((taskItem) => (
                  <li
                    key={taskItem._id}
                    className="border border-gray-200 p-4 rounded-md bg-white shadow-sm"
                  >
                    <p className="font-medium text-gray-900">
                      Title: {taskItem.title}
                    </p>

                    <p className="text-sm text-gray-500">
                      Description: {taskItem.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Card = ({color, label, count, value, onClick}) => {
  return (
    <div
      className={`bg-${color}-500 text-white p-5 sm:p-6 rounded-lg shadow transition transform hover:scale-105`}
    >
      <h2
        className="text-base sm:text-lg font-medium cursor-pointer"
        onClick={() => onClick(value)}
      >
        {label}
      </h2>
      <p className="text-3xl sm:text-4xl font-bold mt-2">{count}</p>
    </div>
  );
};

export default EmployeeDash;
