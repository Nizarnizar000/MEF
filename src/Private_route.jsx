import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("user_id"); // or sessionStorage
  

  return isAuthenticated ? children : <Navigate to="/Log_In" />;
}