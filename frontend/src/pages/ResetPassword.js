import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert, InputGroup } from "react-bootstrap";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    e.preventDefault();
    setError("");
    setSuccessMsg("");

    try {
      const res = await axios.post(
        `http://localhost:8000/api/reset-password/${token}`,
        { password },
        { withCredentials: true }
      );
      setSuccessMsg(res.data.message);
      setTimeout(() => navigate("/login"), 2000); // wait 2 sec then redirect
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "4rem" }}>
      <h2 className="mb-4">Reset Your Password</h2>

      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary rounded-end-pill"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Confirm Password</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Button
                          variant="outline-secondary rounded-end-pill"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                      </InputGroup>
                    </Form.Group>

        <Button variant="primary" type="submit">
          Reset Password
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {successMsg && <Alert variant="success" className="mt-3">{successMsg}</Alert>}
    </Container>
  );
};

export default ResetPasswordPage;
