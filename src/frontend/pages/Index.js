import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

function Index() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-customDark text-white">
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-900 border-b border-gray-700">
        <h1 className="text-lg font-semibold">Peter Mindset</h1>
        <button
          onClick={toggleSidebar}
          className="text-white text-2xl p-2 rounded focus:outline-none"
        >
          ☰
        </button>
      </div>

      <div
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } md:block md:w-64 bg-gray-900 border-r border-gray-700`}
      >
        <h1 className="text-xl font-bold text-center mt-4  border-b border-red-500 pb-2">
          Peter Mindset
        </h1>
        <Sidebar onLinkClick={() => setIsSidebarOpen(false)} />
      </div>

      <main className="flex-1 p-4 w-full lg:w-[800px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Index;
