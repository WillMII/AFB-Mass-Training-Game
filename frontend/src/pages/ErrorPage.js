import React from "react";
import { Container } from "react-bootstrap";
import Hdr from "../components/Hdr";

const ErrorPage = () => {
  return (
    <>
      <Hdr />
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h2>Invalid Link</h2>
        <h3>Please double-check your spelling or link</h3>
      </Container>
    </>
  );
}

export default ErrorPage;
