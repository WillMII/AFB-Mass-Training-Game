import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useUser(); // Get user from context
    if (!user) return <Navigate to="/login" replace />; // Redirect to login if not authenticated
    if (adminOnly && user.training_manager !== 1) return <ErrorPage />; // Redirect or show error if not authorized
    return children; // If everything is fine, render the children
};

export default ProtectedRoute;
