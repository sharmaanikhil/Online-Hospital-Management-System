import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios"; 

const ConsultDoctor = () => {
  const { id } = useParams(); 
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState({});
  const timeSlots = [
    "09:00 AM",
    "09:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "12:00 PM",
    "12:30 PM",
    "03:00 PM",
    "03:30 PM",
    "04:00 PM",
    "04:30 PM",
    "05:00 PM",
    "05:30 PM",
  ];

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dayjs().add(i, "day").format("YYYY-MM-DD")
  );

  const isBooked = (date, time) => bookedAppointments[date]?.includes(time);

  const handleBookingClick = () => {
    if (isBooked(selectedDate, selectedTime)) {
      toast.error("This time slot is already booked.");
    } else if (!selectedTime) {
      toast.error("Please select a time slot.");
    } else {
      setShowModal(true);
    }
  };

  const confirmBooking = async () => {
    try {
      setBookingLoading(true);

      const { data } = await axios.post(
        `http://localhost:1000/api/v1/book-appointment`,
        {
          doctorId: id,
          date: selectedDate,
          time: selectedTime,
        },
        { withCredentials: true }
      );

      setShowModal(false);
      toast.success(data.message || "Appointment booked successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to book appointment."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:1000/api/v1/doctor-details/${id}`,
          { withCredentials: true }
        );
        console.log(data);
        setDoctor(data.user);

        
        const formattedAppointments = {};

        data.appointments.forEach((appt) => {
          const { date, time } = appt;
          if (!formattedAppointments[date]) {
            formattedAppointments[date] = [];
          }
          formattedAppointments[date].push(time);
        });

        setBookedAppointments(formattedAppointments);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load doctor details.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-lg font-semibold">
        Loading doctor details...
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-lg font-semibold text-red-500">
        Doctor not found.
      </div>
    );
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Appointment
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to book an appointment on{" "}
              <strong>{dayjs(selectedDate).format("DD MMM YYYY")}</strong> at{" "}
              <strong>{selectedTime}</strong>?
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300 transition"
                disabled={bookingLoading}
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                disabled={bookingLoading}
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-16 py-10 bg-zinc-50">
        <div className="flex flex-col md:flex-row gap-10 mb-10">
          {/* Doctor Info */}
          <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 text-center">
            <img
              src={doctor.doctorInfo.profilePhoto}
              alt={doctor.name}
              className="w-32 h-32 mx-auto rounded-full border-4 border-blue-200 object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700">
              {doctor.name}
            </h3>
            <p className="text-sm text-gray-600">
              {doctor.doctorInfo.specialization}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {doctor.doctorInfo.address}
            </p>
          </div>

          {/* About + Experience */}
          <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6">
            <h4 className="text-xl font-semibold text-blue-800 mb-2">About</h4>
            <p className="text-gray-700 mb-4">
              {doctor.doctorInfo.description}
            </p>
          </div>
        </div>

        {/* Date Selection */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">
            Select a Date
          </h4>
          <div className="flex flex-wrap gap-4">
            {weekDates.map((date) => (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={`px-4 py-2 rounded-full border transition ${
                  selectedDate === date
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-50"
                }`}
              >
                {dayjs(date).format("ddd, DD MMM")}
              </button>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div className="mb-10">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">
            Select a Time
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {timeSlots.map((time) => {
              const booked = isBooked(selectedDate, time);
              return (
                <button
                  key={time}
                  onClick={() => !booked && setSelectedTime(time)}
                  className={`px-4 py-2 rounded-md text-sm border ${
                    booked
                      ? "bg-red-100 text-red-500 cursor-not-allowed"
                      : selectedTime === time
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-800 hover:bg-blue-50"
                  }`}
                  disabled={booked}
                >
                  {time}
                </button>
              );
            })}
          </div>
        </div>

        {/* Book Button */}
        <div className="text-center">
          <button
            onClick={handleBookingClick}
            className="px-6 py-3 bg-blue-700 text-white rounded-full text-lg hover:bg-blue-800 transition"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default ConsultDoctor;
