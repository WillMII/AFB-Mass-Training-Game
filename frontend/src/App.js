import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import logo from "./logo.svg";
import "./App.css";

import "./custom.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        
        {/* Navigation Links */}
        <nav>
          <Link to="/" className="App-link">Home</Link>
          {" | "}
          <Link to="/create-account" className="App-link">Create Account</Link>
          {" | "}
          <Link to="/login" className="App-link">Login</Link>
          {" | "}
          <Link to="/admin" className="App-link">Admin</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
