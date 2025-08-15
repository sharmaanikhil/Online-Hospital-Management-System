import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorRequests = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorRequests = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1000/api/v1/fetch-doctors-requests",
        { withCredentials: true }
      );
      setRequests(data.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch doctor requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorRequests();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/update-doctor-request/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      toast.success("Status updated!");
      fetchDoctorRequests();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen ">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">
        Doctor Requests
      </h1>

      {loading ? (
        <div className="text-center text-lg font-semibold">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center text-gray-500">No doctor requests yet.</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow rounded-xl">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Avatar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Specialization
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((req) => (
                <tr key={req._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      src={req.profilePhotoUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {req.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{req.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {req.specialization}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={req.status}
                      onChange={(e) =>
                        handleStatusChange(req._id, e.target.value)
                      }
                      className="border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedRequest(req)}
                      className="text-indigo-600 hover:text-indigo-900 font-semibold"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-8 w-11/12 md:w-1/2 relative animate-fadeIn">
            <button
              onClick={() => setSelectedRequest(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <div className="flex flex-col items-center">
              <img
                src={selectedRequest.profilePhotoUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h2 className="text-2xl font-bold text-indigo-700">
                {selectedRequest.name}
              </h2>
              <p className="text-gray-600">{selectedRequest.email}</p>
            </div>

            <div className="mt-6 space-y-3 text-gray-700">
              <div>
                <strong>Specialization:</strong>{" "}
                {selectedRequest.specialization}
              </div>
              <div>
                <strong>Degree:</strong> {selectedRequest.degree}
              </div>
              <div>
                <strong>Address:</strong> {selectedRequest.address}
              </div>
              <div>
                <strong>Description:</strong> <br />
                <p className="mt-1">{selectedRequest.description}</p>
              </div>
              <div>
                <strong>Status:</strong> {selectedRequest.status}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Requested at:{" "}
                {new Date(selectedRequest.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorRequests;
