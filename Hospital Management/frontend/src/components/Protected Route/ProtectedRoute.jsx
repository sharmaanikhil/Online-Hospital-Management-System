import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Authenticating...</div>;
  }

  if (!user && loading === false) {
    return <Navigate to="/get-started" replace />;
  }

  if (allowedRole !== role) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
