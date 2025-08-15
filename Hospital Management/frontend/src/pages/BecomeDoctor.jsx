import React, { useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaEnvelope,
  FaFileUpload,
  FaUserGraduate,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";
const BecomeDoctor = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    specialization: "",
    degree: "",
    address: "",
    description: "",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formDataObj = new FormData();
    formDataObj.append("profilePhoto", formData.profilePhoto);
    formDataObj.append("specialization", formData.specialization);
    formDataObj.append("degree", formData.degree);
    formDataObj.append("address", formData.address);
    formDataObj.append("description", formData.description);

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/doctor-request",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data.message);
      setFormData({
        name: "",
        email: "",
        specialization: "",
        degree: "",
        address: "",
        description: "",
        profilePhoto: null,
      });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 border border-blue-200 animate-fadeIn">
        <h2 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Become a Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaUserMd className="text-blue-600 mr-2" />
            <input
              type="text"
              name="name"
              required
              placeholder="Full Name"
              value={user.name}
              className="w-full outline-none bg-transparent"
              disabled
            />
          </div>

          {/* Email */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaEnvelope className="text-blue-600 mr-2" />
            <input
              type="email"
              name="email"
              required
              placeholder="Email Address"
              value={user.email}
              className="w-full outline-none bg-transparent"
              disabled
            />
          </div>

          {/* Profile Photo */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaFileUpload className="text-blue-600 mr-2" />
            <input
              type="file"
              name="profilePhoto"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-600 file:mr-4 file:py-1 file:px-2 file:border file:rounded file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Specialization */}
          <div className="border rounded-lg px-3 py-2 bg-white shadow-sm">
            <label className="text-gray-600 font-medium mb-1 block">
              Specialization
            </label>
            <select
              name="specialization"
              required
              value={formData.specialization}
              onChange={handleChange}
              className="w-full outline-none bg-transparent text-gray-700"
            >
              <option value="">Select Specialization</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Psychiatrist">Psychiatrist</option>
              <option value="Gynecologist">Gynecologist</option>
            </select>
          </div>

          {/* Degree */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaUserGraduate className="text-blue-600 mr-2" />
            <input
              type="text"
              name="degree"
              required
              placeholder="Your Degree"
              value={formData.degree}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Address */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm">
            <FaMapMarkerAlt className="text-blue-600 mr-2" />
            <input
              type="text"
              name="address"
              required
              placeholder="Clinic or Practice Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full outline-none bg-transparent"
            />
          </div>

          {/* Description */}
          <div className="border rounded-lg px-3 py-2 bg-white shadow-sm">
            <label className="text-gray-600 font-medium mb-1 block">
              About You
            </label>
            <textarea
              name="description"
              required
              rows="4"
              placeholder="Write a brief description about your experience and background..."
              value={formData.description}
              onChange={handleChange}
              className="w-full outline-none bg-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full  ${
              loading ? "bg-blue-500 disabled" : "bg-blue-600"
            }  hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition duration-200`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BecomeDoctor;
