import React, { useState } from "react";
import "./CreateAccount.css";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // account create method/logic
    console.log(formData);
  };

  const navigate = useNavigate();

  return (
    <div className="create-account-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Create Account</h1>
        <hr className="blue-line" />
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            className="login-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            className="login-input"
          />
        </div>

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

        <div className="form-group-horizontal">
          <div className="form-group">
            <label htmlFor="squadron">Squadron:</label>
            <select
              id="squadron"
              name="squadron"
              value={formData.squadron}
              onChange={handleChange}
              className="login-input"
            >
              <option value="" disabled hidden>
                Select Squadron
              </option>
              <option value="Squadron 1">Squadron 1</option>
              <option value="Squadron 2">Squadron 2</option>
              <option value="Squadron 3">Squadron 3</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="flight">Flight:</label>
            <select
              id="flight"
              name="flight"
              value={formData.flight}
              onChange={handleChange}
              className="login-input"
            >
              <option value="" disabled hidden>
                Select Flight
              </option>
              <option value="Flight A">Flight A</option>
              <option value="Flight B">Flight B</option>
              <option value="Flight C">Flight C</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
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

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className="login-input"
          />
        </div>

        <button type="submit" className="btn btn-primary login-button" onClick={() => navigate("/")}>
          Create Account
        </button>

        <div className="form-group-remember">
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

        <hr className="blue-line" />

        <div className="form-footer">
          <p>
            Already have an account?{" "}
            <a href="/login" className="login-link">
              Log In
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
