import  { useEffect, useState } from "react";
import axios from "axios";

const AdminTaskTable = ({relod,setRelod}) => {
  const [employeeStats, setEmployeeStats] = useState([]);
  const token = localStorage.getItem("admintoken");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/task/task`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      
      const tasksArray = res.data.tasks || [];

      const grouped = {};

      tasksArray.forEach((task) => {
        const employeeId = task.assignedTo?._id;
        const fullName = `${task.assignedTo?.fullname?.firstName || ""} ${task.assignedTo?.fullname?.firstname || ""}`;

        if (!grouped[employeeId]) {
          grouped[employeeId] = {
            employeeId,
            name: fullName,
            newTask: 0,
            active: 0,
            completed: 0,
            failed: 0,
          };
        }

        if (task.status?.newTask) grouped[employeeId].newTask += 1;
        if (task.status?.active) grouped[employeeId].active += 1;
        if (task.status?.completed) grouped[employeeId].completed += 1;
        if (task.status?.failed) grouped[employeeId].failed += 1;
      });

      const employeeStatsArray = Object.values(grouped);
      setEmployeeStats(employeeStatsArray);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [relod]);

  return (
    <div className="bg-gray-900 p-6 rounded shadow w-full overflow-x-auto">
      <div className="grid grid-cols-6 font-bold text-center text-white bg-teal-800 rounded py-2 min-w-[700px]">
        <div>Employee Name</div>
        <div>New Task</div>
        <div>Active Task</div>
        <div>Completed</div>
        <div>Failed</div>
        <div>Total</div>
      </div>

      {employeeStats.length === 0 ? (
        <div className="text-center text-gray-400 py-4">No employee task data available.</div>
      ) : (
        employeeStats.map((emp) => (
          <div
            key={emp.employeeId}
            className="grid grid-cols-6 text-center py-2 border-b-2 m-1 hover:bg-gray-800 border-gray-700 text-sm text-white min-w-[700px]"
          >
            <div>{emp.name}</div>
            <div>{emp.newTask}</div>
            <div className="text-yellow-400">{emp.active}</div>
            <div className="text-green-400">{emp.completed}</div>
            <div className="text-red-400">{emp.failed}</div>    
            <div className="text-blue-400">
              {emp.newTask + emp.active + emp.completed + emp.failed}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminTaskTable;
