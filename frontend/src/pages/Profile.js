import React, { useState } from "react";
import Hdr from "../components/Hdr";
import Footer from "../components/Footer";
import { Container, Form, Button, InputGroup } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    password: "password123",
    squadron: "Squadron 1",
    flight: "Flight A",
    isManager: true,
  });

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    password: false,
    squadron: false,
    flight: false,
    isManager: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const squadronOptions = ["Squadron 1", "Squadron 2", "Squadron 3"];
  const flightOptions = ["Flight A", "Flight B", "Flight C"];

  const handleEdit = (field) => {
    setEditMode({ ...editMode, [field]: true });
  };

  const handleSave = (field) => {
    setEditMode({ ...editMode, [field]: false });
  };

  const handleChange = (e, field) => {
    setUser({ ...user, [field]: e.target.value });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <div className="my-5">
          <h2 className="text-primary text-decoration-underline">Profile Page</h2>
        </div>
        {/* First Name */}
        <div className="mb-3">
          <strong>First Name:</strong>{" "}
          {editMode.firstName ? (
            <InputGroup>
              <Form.Control
                type="text"
                value={user.firstName}
                onChange={(e) => handleChange(e, "firstName")}
              />
              <Button variant="success" onClick={() => handleSave("firstName")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {user.firstName}{" "}
              <Button variant="link" onClick={() => handleEdit("firstName")}>
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Last Name */}
        <div className="mb-3">
          <strong>Last Name:</strong>{" "}
          {editMode.lastName ? (
            <InputGroup>
              <Form.Control
                type="text"
                value={user.lastName}
                onChange={(e) => handleChange(e, "lastName")}
              />
              <Button variant="success" onClick={() => handleSave("lastName")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {user.lastName}{" "}
              <Button variant="link" onClick={() => handleEdit("lastName")}>
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <strong>Password:</strong>{" "}
          {editMode.password ? (
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => handleChange(e, "password")}
              />
              <Button
                variant="secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </Button>
              <Button variant="success" onClick={() => handleSave("password")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {"•".repeat(8)}{" "}
              <Button variant="link" onClick={() => handleEdit("password")}>
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Squadron */}
        <div className="mb-3">
          <strong>Squadron:</strong>{" "}
          {editMode.squadron ? (
            <InputGroup>
              <Form.Select
                value={user.squadron}
                onChange={(e) => handleChange(e, "squadron")}
              >
                {squadronOptions.map((sq) => (
                  <option key={sq} value={sq}>
                    {sq}
                  </option>
                ))}
              </Form.Select>
              <Button variant="success" onClick={() => handleSave("squadron")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {user.squadron}{" "}
              <Button variant="link" onClick={() => handleEdit("squadron")}>
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Flight */}
        <div className="mb-3">
          <strong>Flight:</strong>{" "}
          {editMode.flight ? (
            <InputGroup>
              <Form.Select
                value={user.flight}
                onChange={(e) => handleChange(e, "flight")}
              >
                {flightOptions.map((fl) => (
                  <option key={fl} value={fl}>
                    {fl}
                  </option>
                ))}
              </Form.Select>
              <Button variant="success" onClick={() => handleSave("flight")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {user.flight}{" "}
              <Button variant="link" onClick={() => handleEdit("flight")}>
                Edit
              </Button>
            </>
          )}
        </div>

        {/* Training Manager */}
        <div className="mb-3">
          <strong>Training Manager:</strong>{" "}
          {editMode.isManager ? (
            <InputGroup>
              <Form.Check
                type="checkbox"
                checked={user.isManager}
                onChange={(e) => setUser({ ...user, isManager: e.target.checked })}
                disabled={!user.isManager}
              />
              <Button variant="success" onClick={() => handleSave("isManager")}>
                Save
              </Button>
            </InputGroup>
          ) : (
            <>
              {user.isManager ? "Yes" : "No"}{" "}
              {user.isManager && (
                <Button variant="link" onClick={() => handleEdit("isManager")}>
                  Edit
                </Button>
              )}
            </>
          )}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Profile;
