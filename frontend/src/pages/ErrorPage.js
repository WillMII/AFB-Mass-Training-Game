import React from "react";
import { Container } from "react-bootstrap";

const ErrorPage = () => {
  return (
    <Container 
      className="d-flex flex-column justify-content-center align-items-center" 
      style={{ minHeight: '100vh' }}
    >
      <h1>Invalid Link</h1>
      <h2>Please double-check your spelling or link</h2>
    </Container>
  );
}

export default ErrorPage;
