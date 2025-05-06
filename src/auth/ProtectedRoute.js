import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 1. If user is not logged in, redirect to the login page
  if (!user) {
    console.warn("Unauthorized: No user found. Redirecting to /login");
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  // 2. Normalize roles to lowercase for comparison
  const userRole = user.role.toLowerCase();
  const normalizedRoles = allowedRoles.map((role) => role.toLowerCase());

  // 3. If user role is not allowed, redirect to home
  if (!normalizedRoles.includes(userRole)) {
    console.warn(`Access Denied: User role '${user.role}' is not allowed. Redirecting to /`);
    return <Navigate to="/" replace />;
  }

  // 4. User is authenticated and authorized – render the protected route
  return <Outlet />;
};

export default ProtectedRoute;
