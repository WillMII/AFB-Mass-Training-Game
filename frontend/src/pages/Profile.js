import React, { useState, useEffect } from "react";
import axios from "axios";
import Hdr from "../components/Hdr";
import Footer from "../components/Footer";
import { Container, Form, Row, Col, Button, Modal, InputGroup } from "react-bootstrap";

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

  const squadronOptions = ["577th Squadron", "578th Squadron", "579th Squadron", "580th Squadron", "581th Squadron", "Directorate", "N/A"];
  const flightOptions = ["A", "B", "C", "N/A"];

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await axios.get(`${apiUrl}/api/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }; // fetchUserData

    fetchUserData();
  }, []);

  const handlePasswordChange = async () => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      await axios.put(
        `${apiUrl}api/user/password`,
        { password: newPassword },
        { withCredentials: true }
      );
      alert("Password updated successfully!");
      setShowModal(false);
      setNewPassword("");
      setConfirmPassword("");
      setShowPassword(false);
    } catch (error) {
      console.error("Error updating password:", error);
      alert("Failed to update password.");
    }
  };

  const handleDeleteAccount = async () => {
    try {
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

  const handleSaveChanges = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

      await axios.put(
        `${apiUrl}/api/users/update`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          squadron: user.squadron,
          flight: user.flight,
        },
        { withCredentials: true }
      );
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Something went wrong updating your profile.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);

    // Refetch user data to reset fields
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const response = await axios.get(`${apiUrl}/api/user`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <div className='my-5'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="text-primary text-decoration-underline mb-0">My Profile</h2>

            {!isEditing ? (
              <Button variant="outline-primary" className="" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            ) : (
              <div className="d-flex justify-content-end">
                <Button variant="link" className="text-decoration-none text-secondary" onClick={handleCancelEdit}>
                  Cancel
                </Button>
                <Button variant="outline-primary" className="me-2" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </div>
            )}
          </div>

          {/* FIRST NAME */}
          <Form.Group as={Row} className="mb-3 align-items-center">
            <Form.Label column sm="2">First Name</Form.Label>
            <Col sm="">
            <Form.Control
              type="text"
              disabled={!isEditing}
              value={user.firstName}
              onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            />
          </Col>
        </Form.Group>

        {/* LAST NAME */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Last Name</Form.Label>
          <Col sm="">
            <Form.Control
              type="text"
              disabled={!isEditing}
              value={user.lastName}
              onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            />
          </Col>
        </Form.Group>

        {/* SQUADRON */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Squadron</Form.Label>
          <Col sm="">
            <Form.Select
              disabled={!isEditing}
              value={user.squadron}
              className="profile-select"
              onChange={(e) => setUser({ ...user, squadron: e.target.value })}
            >
              <option value="" disabled hidden>
              </option>
              {squadronOptions.map((squadron) => (
                <option key={squadron} value={squadron}>{squadron}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* FLIGHT */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Flight</Form.Label>
          <Col sm="">
            <Form.Select
              disabled={!isEditing}
              value={user.flight}
              className="profile-select"
              onChange={(e) => setUser({ ...user, flight: e.target.value })}
            >
              <option value="" disabled hidden>
              </option>
              {flightOptions.map((flight) => (
                <option key={flight} value={flight}>{flight}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>

        {/* EMAIL */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Email</Form.Label>
          <Col sm="">
            <Form.Control
              type="text"
              disabled={!isEditing}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </Col>
        </Form.Group>

        {/* PASSWORD (trigger Popup) */}
        <Button variant="secondary" onClick={() => setShowModal(true)}>
              Change Password
            </Button>
        <hr />

        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Account</Button>
        </div>
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
        
        {/* MODAL FOOTER */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePasswordChange}>
            Save Password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE ACCOUNT MODAL */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your account? This action is permanent and cannot be undone.
        </Modal.Body>
        
        {/* MODAL FOOTER */}
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
