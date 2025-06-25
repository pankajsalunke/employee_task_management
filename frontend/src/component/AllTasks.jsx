import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

const AllTasks = ({employeeId, fetchProfile, id}) => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!employeeId?._id) return;

    axios
      .get(
        `${import.meta.env.VITE_BASE_URL}/employee/gettask/${employeeId._id}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        }
      )
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.tasks;
          setTasks(data);

          setIsLoading(false);
        }
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, [employeeId, token]);

  return (
    <div className="w-full max-w-4xl mt-8">
      {isLoading ? (
        <p className="text-gray-500">Loading tasks...</p>
      ) : tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border rounded-lg shadow-md bg-gray-50 "
            >
              <h3 className="text-lg font-semibold">Titel: {task.title}</h3>
              <p className="text-gray-600">Description: {task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500 font-medium">
                Assigned By: {task.assignedBy?.fullname?.firstname || "Unknown"}
              </p>

              <p
                className={`font-bold ${
                  task.status.completed
                    ? "text-green-600"
                    : task.status.failed
                    ? "text-red-600"
                    : task.status.active
                    ? "text-blue-600"
                    : "text-yellow-600"
                }`}
              >
                Status:{" "}
                {task.status.completed
                  ? "Completed"
                  : task.status.failed
                  ? "Failed"
                  : task.status.active
                  ? "Active"
                  : "New Task"}
              </p>

              <Link
                to={`/tasks/${task._id}`}
                className=" mt-2 flex items-center justify-start  text-lg font-medium text-fuchsia-700"
              >
                View Full Task Detail
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No tasks assigned yet.</p>
      )}
    </div>
  );
};

export default AllTasks;
