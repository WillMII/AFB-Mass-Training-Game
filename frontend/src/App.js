import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
import logo from "./logo.svg";
import "./App.css";

import "./custom.scss";
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Admin from './pages/Admin';


function Home() {
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
        </nav>
      </header>

    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>

    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
