import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Admin from './pages/Admin';

function App() {
  return (
    <div> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<ErrorPage />} /> 
      </Routes>
    </div>
  );
}

export default App;
