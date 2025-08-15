import React, { useState, useEffect } from "react";
import { FaVideo, FaEye } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get(
          "http://localhost:1000/api/v1/doctor-appointments",
          {
            withCredentials: true,
          }
        );
        if (res.data && res.data.appointments) {
          const formattedAppointments = res.data.appointments.map((appt) => ({
            id: appt._id,
            patientName: appt.patient?.name || "Unknown Patient",
            date: appt.date,
            time: appt.time,
            reportUrl: appt.patient?.patientReport || "",
            roomId: appt.roomId,
            status: appt.status, // include status
          }));
          setAppointments(formattedAppointments);
        }
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const handleSeeDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
  };

  const startCall = (room) => {
    const jitsiUrl = `https://meet.jit.si/${room}`;
    window.open(jitsiUrl, "_blank");
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await axios.put(
        `http://localhost:1000/api/v1/update-appointment-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Appointment status updated!");
        setAppointments((prev) =>
          prev.map((appt) =>
            appt.id === id ? { ...appt, status: newStatus } : appt
          )
        );
      }
    } catch (error) {
      console.error("Failed to update status:", error);
      toast.error("Failed to update status.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Scheduled Appointments
      </h2>

      {/* Appointments Table */}
      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">
          No appointments scheduled yet.
        </p>
      ) : (
        <table className="w-full text-left border border-gray-300 shadow rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3">Patient Name</th>
              <th className="p-3">Date</th>
              <th className="p-3">Time</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id} className="border-t">
                <td className="p-3">{appointment.patientName}</td>
                <td className="p-3">{appointment.date}</td>
                <td className="p-3">{appointment.time}</td>

                {/* Status Dropdown */}
                <td className="p-3">
                  <select
                    value={appointment.status}
                    onChange={(e) =>
                      updateStatus(appointment.id, e.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>

                {/* Actions */}
                <td className="p-3 flex items-center justify-center gap-4">
                  <button
                    className={`${
                      appointment.status !== "Confirmed"
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-green-600 hover:scale-110 transition"
                    }`}
                    title="Video Call"
                    onClick={() =>
                      appointment.status === "Confirmed" &&
                      startCall(appointment.roomId)
                    }
                    disabled={appointment.status !== "Confirmed"}
                  >
                    <FaVideo size={18} />
                  </button>
                  <button
                    className="text-blue-600 hover:scale-110 transition"
                    title="See Details"
                    onClick={() => handleSeeDetails(appointment)}
                  >
                    <FaEye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Appointment Details */}
      <Dialog
        open={!!selectedAppointment}
        onClose={closeModal}
        className="fixed inset-0 z-50"
      >
        <div className="fixed inset-0 bg-black bg-opacity-30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-lg w-full rounded-lg shadow-lg p-6 relative">
            <Dialog.Title className="text-xl font-semibold mb-2">
              Patient Details
            </Dialog.Title>
            {selectedAppointment && (
              <>
                <p className="mb-2">
                  Patient Name:{" "}
                  <strong>{selectedAppointment.patientName}</strong>
                </p>

                {selectedAppointment.reportUrl ? (
                  <img
                    src={selectedAppointment.reportUrl}
                    alt="Patient Report"
                    className="w-full object-contain max-h-96"
                  />
                ) : (
                  <p className="text-gray-500 text-sm mt-4">
                    No report available.
                  </p>
                )}
              </>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AllAppointments;
