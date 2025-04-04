import React, { useState, useEffect } from "react";
import axios from "axios";
import Hdr from "../components/Hdr";
import Footer from "../components/Footer";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    squadron: "",
    flight: "",
    training_manager: false, // Changed from isManager to training_manager
    password: "",
  });

  const [editMode, setEditMode] = useState({
    password: false, // Edit mode for password
  });

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/user", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle changes in form fields
  const handleChange = (e, field) => {
    console.log(`Changed ${field}:`, e.target.value); // Log the change
    setUser({
      ...user,
      [field]: e.target.value,
    });
  };

  // Toggle edit mode
  const handleEdit = (field) => {
    console.log(`Editing ${field}...`);
    setEditMode({
      ...editMode,
      [field]: true,
    });
  };

  // Cancel edit
  const handleCancel = (field) => {
    console.log(`Cancelled editing ${field}`);
    setEditMode({
      ...editMode,
      [field]: false,
    });
  };

  // Save the changes
  const handleSave = (field) => {
    console.log(`Saving ${field}:`, user[field]); // Log the value to be saved
    // Implement save logic here (e.g., make API call to save changes)
    setEditMode({
      ...editMode,
      [field]: false,
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <h2 className="text-primary text-decoration-underline my-5">My Profile</h2>

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

        {/* PASSWORD */}
        <Form.Group as={Row} className="mb-3 align-items-center">
          <Form.Label column sm="2">Password</Form.Label>
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

      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
