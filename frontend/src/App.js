import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import CreateAccount from "./components/CreateAccount/CreateAccount";
import Login from "./components/Login/Login";
// import "./App.css";
import "./custom.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <div>
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
