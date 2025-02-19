import React from "react";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container 
      className="d-flex flex-column justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}
    >
      <h2>Invalid Link</h2>
      <h3>Please double-check your spelling or link</h3>
    </Container>
  );
}

export default ErrorPage;
