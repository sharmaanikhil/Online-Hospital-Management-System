import React, { useEffect, useState } from "react";
import axios from "axios"; 
import { FaUserMd, FaClock, FaCalendarAlt } from "react-icons/fa";

const PatitentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/my-appointments",
          {
            withCredentials: true,
          }
        );
        

        setAppointments(response.data.appointments || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 text-lg mt-10">
        Loading appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 text-lg mt-10">{error}</div>
    );
  }

  const joinCall = (room) => {
    const jitsiUrl = `https://meet.jit.si/${room}`;
    window.open(jitsiUrl, "_blank");
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-10">
          No Appointments Scheduled Yet 😌
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {appointments.map((appointment) => (
            <div
              key={appointment._id} 
              className="bg-blue-50 p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold text-blue-800 flex items-center gap-2 mb-2">
                <FaUserMd className="text-blue-600" />
                {appointment.doctor?.name || "Unknown Doctor"}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium text-gray-700">Specialty:</span>{" "}
                {appointment.doctor?.doctorInfo?.specialization ||
                  "Not Available"}
              </p>
              <div className="flex items-center gap-4 mt-3 text-gray-700">
                <span className="flex items-center gap-1">
                  <FaCalendarAlt className="text-blue-500" />
                  {appointment.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock className="text-blue-500" />
                  {appointment.time}
                </span>
                <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 border border-yellow-700 rounded-full px-4 py-1">
                  {appointment.status}
                </span>
              </div>
              <div>
                <button
                  disabled={appointment.status !== "Confirmed"}
                  className={` ${
                    appointment.status !== "Confirmed" && "cursor-not-allowed"
                  } mt-4 bg-green-100 text-green-600 px-4 py-2 rounded-full border border-green-600`}
                  onClick={() => joinCall(appointment.roomId)}
                >
                  Join the call
                </button>{" "}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatitentAppointments;
