import React, { useState, useEffect } from "react";
import axios from "axios";
import Hdr from "../components/Hdr";
import Footer from "../components/Footer";
import {
  Container,
  Form,
  Row,
  Col,
  Button,
  Modal,
  InputGroup
} from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    squadron: "",
    flight: "",
    training_manager: false,
    password: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLength, setPasswordLength] = useState(0); // Track password length for asterisks
  const [showDeleteModal, setShowDeleteModal] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await axios.get(`${apiUrl}/api/user`, {
          withCredentials: true,
        });
        setUser(response.data);

        // Set initial password length to match the password field length
        setPasswordLength(response.data.password ? response.data.password.length : 0);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Replace with your backend endpoint
      await axios.put(
        "http://localhost:8000/api/user/password",
        { password: newPassword },
        { withCredentials: true }
      );
      alert("Password updated successfully!");
      setShowModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      // Update password length after successful change
      setPasswordLength(newPassword.length);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      console.log("Deleting account...");
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
      await axios.delete(`${apiUrl}/api/user/delete`, { withCredentials: true });
      alert("Account deleted successfully.");
      localStorage.removeItem("token");
      setShowDeleteModal(false);
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account.");
    }
  };
  

  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <h2 className="text-primary text-decoration-underline my-5">
          My Profile
        </h2>

        {/* FIRST NAME */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">First Name</Form.Label>
          <Col sm="8">
            <Form.Control type="text" disabled value={user.firstName} />
          </Col>
        </Form.Group>

        {/* LAST NAME */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Last Name</Form.Label>
          <Col sm="8">
            <Form.Control type="text" disabled value={user.lastName} />
          </Col>
        </Form.Group>

        {/* SQUADRON */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Squadron</Form.Label>
          <Col sm="8">
            <Form.Control type="text" disabled value={user.squadron} />
          </Col>
        </Form.Group>

        {/* FLIGHT */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Flight</Form.Label>
          <Col sm="8">
            <Form.Control type="text" disabled value={user.flight} />
          </Col>
        </Form.Group>

        {/* EMAIL */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Email</Form.Label>
          <Col sm="8">
            <Form.Control type="email" disabled value={user.email} />
          </Col>
        </Form.Group>

        {/* PASSWORD (Popup trigger) */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Password</Form.Label>
          <Col sm="8">
            {/* Display asterisks based on password length */}
            <Form.Control type="password" disabled value={"*".repeat(passwordLength)} />
          </Col>
          <Col sm="2">
            <Button variant="link" onClick={() => setShowModal(true)}>
              Change Password
            </Button>
          </Col>
        </Form.Group>
        <hr />


        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
      </Container>
      <Footer />

      {/* PASSWORD MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* New Password */}
            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <Button
                  variant="outline-secondary rounded-end-pill"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputGroup>
            </Form.Group>

            {/* Confirm Password */}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Password
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action is permanent and cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteAccount}>
            Delete My Account
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Profile;
