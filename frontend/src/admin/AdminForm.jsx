import React, { useState } from "react";
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminForm = ({ setRelod }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    dept: "",
    a_email: "",
    e_email: "",
  });

  const token = localStorage.getItem("admintoken");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/task/createtask`,
        { ...formData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Task Created!");
      setRelod(true);
      setFormData({
        title: "",
        description: "",
        dueDate: "",
        dept: "",
        a_email: "",
        e_email: "",
      });
    } catch (err) {
      console.error("Error creating task", err);
    }
  };

  return (
    <div className="flex flex-col justify-center">
     
      <div className="px-2 py-2 bg-gray-900 flex items-center justify-between shadow-md">
        <Link
          to={"/admin-home"}
          className="px-6 py-2 flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Link>
        <Link
          to={"/admin-stats"}
          className="px-6 py-2 flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300 transition"
        >
          Stats
          <ArrowRightIcon className="w-5 h-5" />
        </Link>
      </div>

    
      <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-4xl">
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-6">
            
            <div>
              <InputField
                label="Task Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter task title"
              />
              <InputField
                label="Date"
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
              />
              <InputField
                label="Assign To (Employee Email)"
                name="e_email"
                value={formData.e_email}
                onChange={handleChange}
                placeholder="employee@example.com"
              />
              <InputField
                label="Assign By (Admin Email)"
                name="a_email"
                value={formData.a_email}
                onChange={handleChange}
                placeholder="admin@example.com"
              />
              <InputField
                label="Department"
                name="dept"
                value={formData.dept}
                onChange={handleChange}
                placeholder="e.g., design, dev"
              />
            </div>

            
            <div className="flex flex-col justify-between">
              <div className="mb-4">
                <label className="block mb-1 text-sm text-gray-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 h-32 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Enter task description..."
                  required
                ></textarea>
              </div>
              <div className="w-full flex justify-center">
                <button
                  type="submit"
                  className="w-[60%] bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-500 transition"
                >
                  Create Task
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable input component
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}) => (
  <div className="mb-3">
    <label className="block mb-1 text-sm text-gray-300">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      required
    />
  </div>
);

export default AdminForm;
