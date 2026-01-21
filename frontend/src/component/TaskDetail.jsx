import  { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

const TaskDetail = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const fetchTask = () => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/task/task/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setTask(res.data);
        const s = res.data.status;
        if (s.completed) setStatus("Completed");
        else if (s.failed) setStatus("Failed");
        else if (s.newTask) setStatus("New");
        else if (s.active) setStatus("Active");
        else setStatus("Unknown");
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load task");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const handleStatusUpdate = (action) => {
    axios
      .put(
        `${import.meta.env.VITE_BASE_URL}/task/task/${taskId}/${action}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        fetchTask();
        setTimeout(() => {
          navigate(-1);
        }, 500);
      })
      .catch(() => {
        alert("Failed to update task status");
      });
  };

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen  ">
       <div className="bg-gray-100 mb-4">
          <Link
            to="/alltask"
            className="inline-flex items-center text-blue-600 hover:underline px-2 py-2 text-xl font-medium"
          >
            <ArrowLeftIcon className="w-5 h-10 mr-2 "  />
            Back to All Tasks
          </Link>
        </div>  
      <div className="max-w-4xl mx-auto">
       

        <div className="bg-gray-200 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
            {task.title}
          </h1>

          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Department:</strong> {task.dept}
            </p>
            <p>
              <strong>Assigned Date:</strong>{" "}
              {new Date(task.date).toLocaleDateString()}
            </p>
            <p>
              <strong>Due Date:</strong>{" "}
              {new Date(task.dueDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Assigned To:</strong>{" "}
              {task.assignedTo?.fullname?.firstname}{" "}
              {task.assignedTo?.fullname?.lastname}
            </p>
            <p>
              <strong>Assigned By:</strong>{" "}
              {task.assignedBy?.fullname?.firstname}{" "}
              {task.assignedBy?.fullname?.lastname}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-3 py-1 rounded text-white text-sm font-medium ${
                  status === "Completed"
                    ? "bg-green-600"
                    : status === "Failed"
                    ? "bg-red-600"
                    : status === "New"
                    ? "bg-yellow-500"
                    : status === "Active"
                    ? "bg-blue-500"
                    : "bg-gray-400"
                }`}
              >
                {status}
              </span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {status === "New" && (
              <>
                <button
                  onClick={() => handleStatusUpdate("accept")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleStatusUpdate("reject")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>
              </>
            )}
            {status === "Active" && (
              <>
                <button
                  onClick={() => handleStatusUpdate("complete")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleStatusUpdate("fail")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Fail
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
