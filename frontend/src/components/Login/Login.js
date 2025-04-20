import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";
import { InputGroup, Button, Form } from "react-bootstrap";
import ForgotPasswordModal from "../ForgotPasswordModal"; // Import the modal component

const Login = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);

  const [showForgotModal, setShowForgotModal] = useState(false);

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
      const response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        },
        {
          withCredentials: true, // Include cookies in request
        }
      );

      if (response.status === 200) {
        alert("Login successful!");
        const token = response.data.token; // Assuming response contains token
        localStorage.setItem("token", token); // Store token in local storage
        console.log("Token:", token);

        const userResponse = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });

        if (userResponse.status === 200) {
          setUser(userResponse.data); // Assuming the user data is in response.data
          navigate("/"); // Redirect to dashboard (change later)

        } else {
          setError("Error fetching user data.");
        }
      } else {
        setError(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Error connecting to the server.");
    }
  };

  return (
    <>
      <div className="login-form-container">
        <Form onSubmit={handleSubmit} className="login-form">
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
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              // className="login-input"
              />
              <Button
                className="btn btn-outline-secondary rounded-end-pill btn-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>
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
            <Link
              className="forgot-password"
              onClick={(e) => {
                setShowForgotModal(true)
              }}
            >
              Forgot Password?
            </Link>
            {showForgotModal && <ForgotPasswordModal onClose={() => setShowForgotModal(false)} />}

          </div>
          <hr className="blue-line" />
          <div className="register-option">
            <p>
              Don't have an account? <Link to="/create-account">Create Account</Link>
            </p>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
