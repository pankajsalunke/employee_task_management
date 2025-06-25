import React from 'react';
import AdminTaskTable from './AdminTaskTable';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const EmployeeStats = () => {
  return (
    <div>
      <div> <div className="px-2 py-2 bg-gray-900 flex items-center justify-between shadow-md">
        <Link
          to={"/admin-home"}
          className="px-6 py-2 flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300 transition"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Link>
        {/* <Link
          to={"/admin-stats"}
          className="px-6 py-2 flex items-center gap-2 text-lg font-medium text-blue-400 hover:text-blue-300 transition"
        >
          Stats
          <ArrowRightIcon className="w-5 h-5" />
        </Link> */}
      </div></div>
      <div>
        <div className="bg-gray-800 min-h-screen w-full p-4 sm:p-6 md:p-8">
     
      <div className="text-center mb-6">
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold underline">
          Admin Assigned Tasks Details
        </h1>
      </div>

      <div className="overflow-x-auto">
        <AdminTaskTable />
      </div>
    </div>
      </div>
    </div>
  );
};

export default EmployeeStats;
