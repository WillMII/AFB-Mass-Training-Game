import React from 'react';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Hdr from '../components/Hdr';
import Footer from '../components/Footer';
import { useUser } from '../context/UserContext';

const ErrorPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="d-flex flex-column min-vh-100">
      {user && <Hdr />}
      <div className="flex-grow-1 d-flex align-items-center justify-content-center px-3">
        <Container className="text-center">
          <h1 className="display-1 fw-bold text-primary">404</h1>
          <p className="fs-3">
            <span className="text-primary">Oops!</span> Page not found.
          </p>
          <p className="lead">
            The page you’re looking for doesn’t exist or has been moved.
          </p>
          {user && <Button variant="primary" onClick={() => navigate('/')}>Return Home</Button>}
          {!user && <Button variant="primary" onClick={() => navigate('/login')}>Log In</Button>}
        </Container>
      </div>
      {user && <Footer />}
    </div>
  );
};

export default ErrorPage;
