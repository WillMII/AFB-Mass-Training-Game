import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import "./App.css";
import "./custom.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import ResetPasswordPage from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import { Navigate } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

function App() {
  const { user, setUser } = useUser();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [setUser]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status">
          <span className="text-primary visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-account"
          element={<CreateAccount />}
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-progress"
          element={
            <ProtectedRoute adminOnly={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-management"
          element={
            <ProtectedRoute adminOnly={true}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <ErrorPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
