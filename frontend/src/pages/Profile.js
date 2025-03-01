import React, { useState } from "react";
import Hdr from "../components/Hdr";
import Footer from "../components/Footer";
import { Container, Form, Button, InputGroup, Row, Col, Modal } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@email.com",
    password: "password123",
    squadron: "577th Squadron",
    flight: "Flight A",
    isManager: true,
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    squadron: false,
    flight: false,
    isManager: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const squadronOptions = ["577th Squadron", "578th Squadron", "579th Squadron", "580th Squadron", "581th Squadron", "Directorate", "N/A"];
  const flightOptions = ["A", "B", "C", "N/A"];
  const [tempUser, setTempUser] = useState({ ...user });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [tempIsManager, setTempIsManager] = useState(user.isManager);

  const handleEdit = (field) => {
    setTempUser({ ...user }); // Save the current state before editing
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const handleChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const handleCancel = (field) => {
    setUser({ ...tempUser }); // Restore previous state
    setEditMode({ ...editMode, [field]: false });
  };

  const handleToggleManager = () => {
    setTempIsManager(!user.isManager);
    setShowConfirmModal(true);
  };

  const confirmToggleManager = () => {
    setUser({ ...user, isManager: tempIsManager });
    setShowConfirmModal(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <div className="my-5">
          <h2 className="text-primary text-decoration-underline">My Profile</h2>
        </div>

        {/* FIRST NAME */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">
            First Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              disabled={!editMode.firstName}
              value={user.firstName}
              onChange={(e) => handleChange(e, "firstName")}
            />
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.firstName ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("firstName")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("firstName")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("firstName")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        {/* LAST NAME */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">
            Last Name
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              disabled={!editMode.lastName}
              value={user.lastName}
              onChange={(e) => handleChange(e, "lastName")}
            />
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.lastName ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("lastName")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("lastName")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("lastName")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        {/* SQUADRON */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Squadron</Form.Label>
          <Col sm="8">
            <Form.Select disabled={!editMode.squadron} value={user.squadron} onChange={(e) => handleChange(e, "squadron")}>
              {squadronOptions.map((squadron) => (
                <option key={squadron} value={squadron}>{squadron}</option>
              ))}
            </Form.Select>
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.squadron ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("squadron")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("squadron")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("squadron")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        {/* FLIGHT */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Flight</Form.Label>
          <Col sm="8">
            <Form.Select disabled={!editMode.flight} value={user.flight} onChange={(e) => handleChange(e, "flight")}>
              {flightOptions.map((flight) => (
                <option key={flight} value={flight}>{flight}</option>
              ))}
            </Form.Select>
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.flight ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("flight")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("flight")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("flight")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        {/* EMAIL */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="text"
              disabled={!editMode.email}
              value={user.email}
              onChange={(e) => handleChange(e, "email")}
            />
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.email ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("email")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("email")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("email")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="8">
            <Form.Control
              type="password"
              disabled={!editMode.password}
              value={user.password}
              onChange={(e) => handleChange(e, "password")}
            />
          </Col>
          <Col sm="2" className="d-flex justify-content-between">
            {editMode.password ? (
              <>
                <Button
                  variant="link"
                  className="nav-link text-primary"
                  onClick={() => handleSave("password")}
                >
                  Save
                </Button>
                <Button
                  variant="link"
                  className="nav-link"
                  onClick={() => handleCancel("password")}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                variant="link"
                className="nav-link text-primary"
                onClick={() => handleEdit("password")}
              >
                Edit
              </Button>
            )}
          </Col>
        </Form.Group>

        <hr />
        {/* TRAINING MANAGER TOGGLE */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Training Manager</Form.Label>
          <Col sm="8">
            <Form.Check 
              type="switch"
              id="isManager"
              label={user.isManager ? "Enabled" : "Disabled"}
              checked={user.isManager}
              disabled={!user.isManager}
              onChange={handleToggleManager}
            />
          </Col>
        </Form.Group>

        {/* CONFIRMATION MODAL */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Confirm Change</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to change Training Manager privileges?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={confirmToggleManager}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>

      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
