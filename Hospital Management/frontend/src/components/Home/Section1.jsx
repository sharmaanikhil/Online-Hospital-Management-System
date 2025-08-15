import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const Section1 = () => {
  const navigate = useNavigate();
  const { user, role } = useAuth();

  const handleNavigation = () => {
    if (role !== "doctor") {
      navigate("/all-doctors");
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 h-fit md:min-h-screen bg-blue-600 rounded-xl my-8 text-white flex flex-col md:flex-row">
      {/* Left Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 p-6 md:p-12 justify-center">
        <h5 className="bg-white text-black w-fit px-4 py-2 md:py-3 text-base md:text-xl rounded-full font-semibold">
          #1 Best Medical Center
        </h5>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Bringing Quality Healthcare Services to you
        </h2>
        <p className="text-sm md:text-base">
          Delivering comprehensive health support through video call and our AI
          agent that seamlessly connects you with our specialists.
        </p>

        {/* Buttons (Only show if user is NOT a doctor) */}
        {user?.role !== "doctor" && (
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleNavigation}
              className="px-6 py-3 w-full sm:w-auto hover:shadow-xl transition-all duration-300 text-center border border-white rounded-full text-base md:text-xl font-semibold"
            >
              Get Started
            </button>
            <button
              onClick={handleNavigation}
              className="px-6 py-3 w-full sm:w-auto hover:shadow-xl transition-all duration-300 text-center rounded-full bg-white text-blue-600 text-base md:text-xl font-semibold"
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>

      {/* Right Image */}
      <div className="w-full md:w-1/2 mt-6 md:mt-0 px-4 md:px-0">
        <img
          src="./section1.png"
          alt="doctor"
          className="w-full h-full object-cover rounded-b-xl md:rounded-none md:rounded-r-xl"
        />
      </div>
    </div>
  );
};

export default Section1;
