import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";
import { useDoctorsContext } from "../store/DoctorsDataContext";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "Cardiologist",
    address: "Delhi Heart Institute, New Delhi",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Dr. Rajeev Mehta",
    specialty: "Dermatologist",
    address: "SkinGlow Clinic, Mumbai",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 3,
    name: "Dr. Priya Desai",
    specialty: "Gynecologist",
    address: "Wellness Women’s Hospital, Pune",
    img: "https://randomuser.me/api/portraits/women/55.jpg",
  },
  {
    id: 4,
    name: "Dr. Arjun Nair",
    specialty: "Neurologist",
    address: "Brain & Spine Center, Bangalore",
    img: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    id: 5,
    name: "Dr. Neha Kapoor",
    specialty: "Pediatrician",
    address: "Little Angels Hospital, Hyderabad",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const specialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Gynecologist",
  "Neurologist",
  "Pediatrician",
];

const AllDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const { DoctorsDetails } = useDoctorsContext();

  const { user } = useAuth();
  const { fetchDoctors } = useDoctorsContext();
  const navigate = useNavigate();

  const filteredDoctors =
    selectedSpecialty === "All"
      ? DoctorsDetails
      : DoctorsDetails.filter(
          (doc) => doc.doctorInfo.specialization === selectedSpecialty
        );

  const handleBookNow = (id) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    navigate(`/consult-doctor/${id}`);
  };
  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-16 my-12 gap-8">
      {/* Sidebar */}
      <div className="md:w-1/4 mb-8 md:mb-0">
        <h3 className="text-center md:text-start text-lg font-semibold mb-4 text-blue-800">
          Specialties
        </h3>
        <ul className="flex flex-wrap gap-4 justify-center">
          {specialties.map((spec) => (
            <li
              key={spec}
              className={`w-fit md:w-full cursor-pointer px-4 py-2 rounded-md ${
                selectedSpecialty === spec
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border"
              } hover:bg-blue-500 hover:text-white transition`}
              onClick={() => setSelectedSpecialty(spec)}
            >
              {spec}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.name}
            className="bg-white p-8 rounded-lg shadow-md text-center h-fit"
          >
            <img
              src={doctor.doctorInfo.profilePhoto}
              alt={doctor.name}
              className="w-24 h-24 mx-auto rounded-full border-4 border-blue-200 object-cover mb-4"
            />
            <h4 className="text-xl font-semibold text-blue-700">
              {doctor.name}
            </h4>
            <p className="text-sm text-gray-600">
              {doctor.doctorInfo.specialization}
            </p>
            <p className="text-sm text-gray-500">
              {doctor.doctorInfo.address.slice(0, 30)}...
            </p>
            <div className="mt-4">
              <button
                onClick={() => handleBookNow(doctor._id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
