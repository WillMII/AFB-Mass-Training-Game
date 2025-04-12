import React from "react";
import { Routes, Route } from "react-router-dom";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
// import "./App.css";
import "./custom.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useUser } from "./context/UserContext";
import { Navigate } from "react-router-dom";

function App() {

  // Set User Context on Refresh
  const { user, setUser } = useUser();
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/user", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          console.log("User data:", data);
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      }
    };
  
    checkSession();
  }, [setUser]);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/create-account"
          element=<CreateAccount />
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/user-progress"
          element={
            user ? (
              <ProtectedRoute adminOnly={true}>
                <Admin />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-management"
          element={
            user ? (
              <ProtectedRoute adminOnly={true}>
                <UserManagement />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/user-profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="*" element={user ? <ErrorPage /> : <Navigate to="login" />} />
      </Routes>
    </div>
  );
}

export default App;
