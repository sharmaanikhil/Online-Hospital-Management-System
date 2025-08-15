import React from "react";
import AdminSideBar from "../components/AdminDashboard/AdminSideBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex gap-8">
      <div className="w-1/6">
        <AdminSideBar />
      </div>
      <div className="w-5/6 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
