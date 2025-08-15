import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDoctorsContext } from "../../store/DoctorsDataContext";
import { useAuth } from "../../store/AuthContext";
import { toast } from "react-toastify";
const ConsultDoctors = () => {
  const { DoctorsDetails, fetchDoctors } = useDoctorsContext();
  const { user } = useAuth();
  const history = useNavigate();
  const bookNow = () => {
    if (!user) {
      toast.error("Please login");
    } else {
      history("/all-doctors");
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="my-12 px-4 md:px-16 bg-zinc-100 py-12">
      <div className="mb-12">
        <h3 className="text-3xl font-semibold text-center">
          Consult Our Doctors
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {DoctorsDetails.splice(0, 5).map((doctor) => (
          <div
            key={doctor.name}
            className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition"
          >
            <img
              src={doctor.doctorInfo.profilePhoto}
              alt={doctor.name}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-200"
            />
            <h4 className="text-xl font-semibold text-blue-800">
              {doctor.name}
            </h4>
            <p className="text-sm text-gray-500">
              {doctor.doctorInfo.specialization}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {doctor.doctorInfo.address}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              onClick={bookNow}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Navigation to All Doctors Page */}
      <div className="mt-12 text-center">
        <Link
          to="/all-doctors"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
        >
          See All Doctors
        </Link>
      </div>
    </div>
  );
};

export default ConsultDoctors;
