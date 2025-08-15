
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); 

  // Backend base URL
  const BASE_URL = "http://localhost:1000"; // or your deployed URL

 
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      const userData = res.data.user;
      setUser(userData);
      setRole(userData.role);
      setIsLoggedIn(true);
      console.log(userData);
    } catch (err) {
      console.error("Login failed", err.response?.data?.message || err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await axios.get(`${BASE_URL}/api/v1/logout`, { withCredentials: true });
    } catch (err) {
      console.error("Logout failed", err.message);
    } finally {
      setUser(null);
      setRole("user");
      setIsLoggedIn(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user-details`, {
        withCredentials: true,
      });
      const userData = res.data.user;
      setUser(userData);
      setRole(userData.role);
      setIsLoggedIn(true);
    } catch (err) {
      //console.log("Not logged in or session expired");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const changeRole = (value) => {
    setRole(value);
  };
  const changeUser = (value) => {
    setUser(value);
  };
  const uploadReportContext = (value) => {
    setUser({ ...user, patientReport: value });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn,
        login,
        logout,
        fetchCurrentUser,
        loading,
        changeRole,
        changeUser,
        uploadReportContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
