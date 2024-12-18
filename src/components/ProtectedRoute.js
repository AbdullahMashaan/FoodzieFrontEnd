import React from "react";
import { Navigate } from "react-router-dom";
import { checkToken } from "../api/storage";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = checkToken();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
