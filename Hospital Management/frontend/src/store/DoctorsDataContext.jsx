import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const DoctorsContext = createContext();

export const useDoctorsContext = () => useContext(DoctorsContext);

export const DoctorsDataContext = ({ children }) => {
  const [DoctorsDetails, setDoctorsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1000/api/v1/fetch-doctors",
        {
          withCredentials: true,
        }
      );
      setDoctorsDetails(res.data.doctors);
    } catch (error) {
      console.error("Failed to fetch doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorsContext.Provider value={{ DoctorsDetails, loading, fetchDoctors }}>
      {children}
    </DoctorsContext.Provider>
  );
};
