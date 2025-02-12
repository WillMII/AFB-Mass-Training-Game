import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // login logic/method
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <hr className="blue-line" />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Air Force email"
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
