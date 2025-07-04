import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row bg-customDark min-h-screen">
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1 className="text-xl font-bold">Peter Mindset</h1>
        <button
          className="text-white border p-2 rounded"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 border-r`}
      >
        <h1 className="ml-4 mt-4 pt-4 text-xl font-bold text-center">Peter Mindset</h1>

        <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
      </div>

      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
