import {Task} from "../../models/tasks.model.js";
import {Admin} from "../../models/admin.model.js";
import {Employee} from "../../models/employee.model.js";

const createTask = async (req, res) => {
  const {title, description, dueDate, dept, e_email} = req.body;

  const employee = await Employee.findOne({email: e_email});
  if (!employee) {
    return res.status(400).json({message: "Invalid employee email"});
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    dept,
    assignedTo: employee._id,
    assignedBy: req.admin._id,
  });

  await Employee.findByIdAndUpdate(employee._id, {
    $inc: {"taskNumbers.newTask": 1},
  });

  res.status(201).json({message: "Task created successfully", task});
};

// admin can get task on there dashboard to view task complete, accept , faild or completed

const getTasksByAdmin = async (req, res) => {
  try {
    const adminId = req.admin._id;

    const tasks = await Task.find({assignedBy: adminId}).populate({
      path: "assignedTo",
      select: "fullname",
    });

    res.status(200).json({tasks});
  } catch (err) {
    console.error("Error getting admin tasks:", err);
    res.status(500).json({error: "Failed to get tasks assigned by admin"});
  }
};

export {createTask, getTasksByAdmin};
