import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUserMd,
  FaEnvelope,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";

const AdminSideBar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard", icon: <FaTachometerAlt /> },
    {
      name: "Doctor Requests",
      path: "/admin-dashboard/doctor-requests",
      icon: <FaUserMd />,
    },
    {
      name: "Messages",
      path: "/admin-dashboard/messages",
      icon: <FaEnvelope />,
    },
    {
      name: "Change Password",
      path: "/admin-dashboard/change-password",
      icon: <FaLock />,
    },
  ];

  return (
    <div className="h-screen w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col justify-between p-4 sticky top-0">
      <div>
        <h2 className="text-2xl font-bold text-blue-700 mb-8 text-center">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-4">
          {navItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              end={item.path === "/admin-dashboard"} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all 
        ${
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
        }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-md font-medium">{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div>
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition-all"
        >
          <FaSignOutAlt className="text-lg" />
          <span className="text-md font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;
