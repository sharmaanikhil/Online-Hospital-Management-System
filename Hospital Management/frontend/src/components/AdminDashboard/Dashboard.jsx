import React, { useEffect, useState } from "react";
import { FaUserInjured, FaUserMd, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    admins: 0,
  });

  const fetchCounts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1000/api/v1/dashboard-details",
        { withCredentials: true }
      );
      setCounts(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch user counts");
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  const stats = [
    {
      title: "Total Patients",
      count: counts.patients,
      icon: <FaUserInjured className="text-4xl text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      title: "Total Doctors",
      count: counts.doctors,
      icon: <FaUserMd className="text-4xl text-green-600" />,
      bg: "bg-green-100",
    },
    {
      title: "Total Admins",
      count: counts.admins,
      icon: <FaUserShield className="text-4xl text-purple-600" />,
      bg: "bg-purple-100",
    },
  ];

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between p-6 rounded-2xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-200"
          >
            <div
              className={`w-16 h-16 flex items-center justify-center rounded-full ${item.bg} mb-4`}
            >
              {item.icon}
            </div>
            <h2 className="text-lg font-semibold text-gray-600">
              {item.title}
            </h2>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {item.count}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
