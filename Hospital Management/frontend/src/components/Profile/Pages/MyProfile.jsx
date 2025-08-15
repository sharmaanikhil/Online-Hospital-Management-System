import React from "react";
import { useAuth } from "../../../store/AuthContext";

const MyProfile = () => {
  const { role, user } = useAuth();

  // Extract doctor info if user is a doctor
  const doctorInfo = role === "doctor" ? user.doctorInfo : {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-3xl font-semibold text-blue-700 mb-10">Welcome</h2>
      {role === "doctor" && (
        <div className="flex justify-center mb-10">
          <img
            src={user.doctorInfo.profilePhoto}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover"
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        {/* Common fields */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            value={user.name || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            value={user.email || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Gender</label>
          <input
            value={user.gender || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Contact Number
          </label>
          <input
            value={user.contact || ""}
            readOnly
            className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
          />
        </div>

        {role === "doctor" && (
          <>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Specialization
              </label>
              <input
                value={doctorInfo.specialization || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Degree
              </label>
              <input
                value={doctorInfo.degree || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Address
              </label>
              <input
                value={doctorInfo.address || ""}
                readOnly
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                value={doctorInfo.description || ""}
                readOnly
                rows={4}
                className="w-full bg-gray-100 border border-gray-300 rounded px-4 py-2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
