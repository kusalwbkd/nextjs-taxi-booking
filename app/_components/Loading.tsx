import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-[#d17842] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
