import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";
import { Container, InputGroup, Button, Form } from "react-bootstrap";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    squadron: "",
    flight: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const squadronOptions = ["577th Squadron", "578th Squadron", "579th Squadron", "580th Squadron", "581st Squadron", "Directorate", "N/A"];
  const flightOptions = ["A", "B", "C", "N/A"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/create-account`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          squadron: formData.squadron,
          flight: formData.flight,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Account created successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Error connecting to the server.");
    }
  };


  const navigate = useNavigate();

  return (
    <Container className="my-5">
      <div class="create-account-container">
        <form onSubmit={handleSubmit} class="login-form">
          <h1>Create Account</h1>
          <hr class="blue-line" />
          <div class="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
              class="login-input"
            />
          </div>

          <div class="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
              class="login-input"
            />
          </div>

          <div class="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Air Force email"
              class="login-input"
            />
          </div>

          <div class="form-group-horizontal">
            <div class="form-group">
              <label htmlFor="squadron">Squadron:</label>
              <select
                id="squadron"
                name="squadron"
                value={formData.squadron}
                onChange={handleChange}
                className={`login-input ${formData.squadron === "" ? "select-placeholder" : ""}`}
              >
                <option value="" disabled hidden>
                  Select Squadron
                </option>
                {squadronOptions.map((squadron) => (
                  <option key={squadron} value={squadron}>{squadron}</option>
                ))}
              </select>
            </div>

            <div class="form-group">
              <label htmlFor="flight">Flight:</label>
              <select
                id="flight"
                name="flight"
                value={formData.flight}
                onChange={handleChange}
                className={`login-input ${formData.flight === "" ? "select-placeholder" : ""}`}
              >
                <option value="" disabled hidden>
                  Select Flight
                </option>
                {flightOptions.map((flight) => (
                  <option key={flight} value={flight}>{flight}</option>
                ))}
              </select>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="password">Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
              <Button
                className="btn btn-outline-secondary rounded-end-pill btn-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label htmlFor="confirmPassword">Confirm Password:</Form.Label>
            <InputGroup>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
              />
              <Button
                className="btn btn-outline-secondary rounded-end-pill btn-light"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </Button>
            </InputGroup>
          </Form.Group>

          <button type="submit" class="btn btn-primary login-button">
            Create Account
          </button>

          <div className="form-group-remember remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  rememberMe: e.target.checked,
                }))
              }
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <hr class="blue-line" />

          <div class="form-footer">
            <p>
              Already have an account?{" "}
              <a href="/login" class="login-link">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default CreateAccount;
