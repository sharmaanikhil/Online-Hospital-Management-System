import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import {
  FaUser,
  FaCalendarCheck,
  FaCloudUploadAlt,
  FaRobot,
  FaPhoneAlt,
  FaLock,
  FaSignOutAlt,
  FaClipboardList,
} from "react-icons/fa";
import { useAuth } from "../../store/AuthContext";

const SideBar = ({ showSidebar, setShowSidebar }) => {
  const { role, logout } = useAuth();
  const [linksToRender, setlinksToRender] = useState([]);
  const patientLinks = [
    { label: "My Profile", to: "/profile", icon: <FaUser /> },
    {
      label: "My Appointments",
      to: "/profile/my-appointments",
      icon: <FaCalendarCheck />,
    },
    {
      label: "Upload Report",
      to: "/profile/upload-report",
      icon: <FaCloudUploadAlt />,
    },
    { label: "AI Chat Bot", to: "/profile/ai-chat", icon: <FaRobot /> },
    {
      label: "Reset Password",
      to: "/profile/reset-password",
      icon: <FaLock />,
    },
  ];

  const doctorLinks = [
    { label: "My Profile", to: "/profile", icon: <FaUser /> },
    {
      label: "All Appointments",
      to: "/profile/all-appointments",
      icon: <FaClipboardList />,
    },

    {
      label: "Reset Password",
      to: "/profile/reset-password",
      icon: <FaLock />,
    },
  ];
  useEffect(() => {
    role === "patient"
      ? setlinksToRender(patientLinks)
      : setlinksToRender(doctorLinks);
  }, []);

  return (
    <div
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-full"
      } fixed md:static top-0 left-0 w-64 h-full bg-white md:bg-none z-40 shadow-lg md:shadow-none transition-transform duration-300 md:translate-x-0`}
    >
      <div className="md:bg-white min-h-auto md:shadow-md w-full max-h-fit p-6 rounded-lg md:border md:border-blue-100">
        <h2 className="text-2xl font-semibold text-center mb-8">Dashboard</h2>
        <button
          className="absolute md:hidden top-6 right-3 bg-blue-600 text-white font-semibold p-2 rounded-full "
          onClick={() => setShowSidebar(false)}
        >
          <RxCross2 />
        </button>
        <nav className="flex flex-col gap-3">
          {linksToRender.map((link, idx) => (
            <NavLink
              key={idx}
              to={link.to}
              end={link.to === "/profile"} 
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg font-medium text-sm transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-blue-700 hover:bg-blue-100"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={async () => {
            await logout();
          }}
          className="mt-10 flex items-center justify-center gap-2 w-full bg-red-500 text-white font-semibold py-3 px-4 rounded-lg hover:bg-red-600 transition-all text-lg"
        >
          <FaSignOutAlt className="text-xl" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;
