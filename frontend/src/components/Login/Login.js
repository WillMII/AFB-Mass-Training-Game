import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [error, setError] = useState(""); // Define error state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error messages

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: formData.email,
            password: formData.password,
        }),
        credentials: "include", // Ensures cookies/sessions are sent
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user session
        navigate("/"); // Redirect to dashboard (change later)
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Log In</h1>
        <hr className="blue-line" />
        {error && <p className="error-message">{error}</p>} {/* Display error message */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Air Force email"
            className="login-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className="login-input"
          />
        </div>
        <button type="submit" className="btn btn-primary login-button">
          Log In
        </button>
        <div className="login-options">
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <a href="#" className="forgot-password">  {/*filler link...change later when creating forgot-pwd page*/}
            Forgot Password?
          </a>
        </div>
        <hr className="blue-line" />
        <div className="register-option">
          <p>
            Don't have an account? <Link to="/create-account">Create Account</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
