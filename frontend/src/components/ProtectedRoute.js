// src/components/ProtectedRoute.js or .tsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        axios.get(`${apiUrl}/api/user`, { withCredentials: true })
            .then(res => {
                const user = res.data;
                console.log("User data:", user);
                if (adminOnly && user.training_manager !== 1) {
                    setIsAuthorized(false);
                } else {
                    setIsAuthorized(true);
                }
            })
            .catch(err => {
                console.error("Auth check failed:", err);
                setIsAuthorized(false);
            })
            .finally(() => {
                setAuthChecked(true);
            });
    }, [adminOnly]);

    if (!authChecked) return null;

    return isAuthorized ? children : <ErrorPage />;
};

export default ProtectedRoute;
