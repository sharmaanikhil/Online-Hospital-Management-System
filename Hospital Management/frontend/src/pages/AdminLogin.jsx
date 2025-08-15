import React, { useState } from "react";
import { FaUserShield, FaLock } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { changeRole, changeUser } = useAuth();
  const history = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:1000/api/v1/admin-login",
        formData,
        { withCredentials: true }
      );
      changeUser({ email: data.user.email });
      toast.success("Login successful");
      changeRole("admin");
      history("/admin-dashboard");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-200 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl border border-blue-200 animate-fadeIn">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Admin Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaUserShield className="text-blue-600 mr-2" />
            <input
              type="email"
              name="email"
              required
              placeholder="Admin Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaLock className="text-blue-600 mr-2" />
            <input
              type="password"
              name="password"
              required
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
