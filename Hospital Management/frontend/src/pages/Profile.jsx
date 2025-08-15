import React, { useState } from "react";
import SideBar from "../components/Profile/SideBar";
import { Outlet } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useAuth } from "../store/AuthContext";

const Profile = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { role } = useAuth();

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 md:flex min-h-screen max-h-auto my-12 md:gap-8">
      {/* Toggle Button (Arrow) to open/close the sidebar */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="md:hidden flex items-center justify-between gap-4  mb-6 left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full"
      >
        Click Here {showSidebar ? <FaArrowLeft /> : <FaArrowRight />}
      </button>

      {/* Sidebar Component */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 w-64 h-full bg-white z-40 shadow-lg transition-transform duration-300 md:static md:translate-x-0`}
      >
        <SideBar
          role={role}
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />
      </div>

      {/* Main Content Area */}
      <div className="w-full md:w-[78%]">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
