import React from "react";

const DasboardPreview = () => {
  return (
    <div className="bg-white text-gray-900 max-w-5xl mx-auto mt-8 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-semibold">Dashboard Preview</h3>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-center">
          <h4 className="text-2xl font-bold">1820</h4>
          <p className="">Total Tasks</p>
        </div>
        <div className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-center">
          <h4 className="text-2xl font-bold">650</h4>
          <p className="">Due Tasks</p>
        </div>
        <div className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-center">
          <h4 className="text-2xl font-bold">250</h4>
          <p className="">In Progress</p>
        </div>
        <div className="p-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-center">
          <h4 className="text-2xl font-bold">120</h4>
          <p className="">Assigned Tasks</p>
        </div>
      </div>
    </div>
  );
};

export default DasboardPreview;
