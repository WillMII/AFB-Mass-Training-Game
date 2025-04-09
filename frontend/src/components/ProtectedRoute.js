import React, { useEffect, useState } from "react";
import ErrorPage from "../pages/ErrorPage";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { user } = useUser(); // Get user from context
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        // Check if user exists and if they have the required role
        if (user) {
            if (adminOnly && user.training_manager !== 1) {
                setIsAuthorized(false);
            } else {
                setIsAuthorized(true);
            }
        } else {
            setIsAuthorized(false);
        }
        setAuthChecked(true); // Done checking authorization
    }, [adminOnly, user]);

    if (!authChecked) return null; // Wait until authentication check is done

    if (!isAuthorized) {
        // Redirect or show error if not authorized
        return <ErrorPage />;
    }

    // If authorized, return the protected children components
    return children;
};

export default ProtectedRoute;
