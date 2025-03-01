import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { Container, Button, InputGroup, Row, Col, Modal } from "react-bootstrap";

const UserTable = () => {

    const users = [
        { id: 1, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0, manager: true },
        { id: 2, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25, manager: true },
        { id: 3, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100, manager: true },
        { id: 4, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100, manager: false },
        { id: 5, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0, manager: false },
        { id: 6, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25, manager: true },
        { id: 7, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100, manager: true },
        { id: 8, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100, manager: false },
        { id: 9, firstName: 'John', lastName: 'Doe', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 50, module3: 0, manager: false },
        { id: 10, firstName: 'Jane', lastName: 'Smith', squadron: 'N/A', flight: 'N/A', module1: 75, module2: 100, module3: 25, manager: false },
        { id: 11, firstName: 'Alice', lastName: 'Johnson', squadron: 'N/A', flight: 'N/A', module1: 50, module2: 50, module3: 100, manager: false },
        { id: 12, firstName: 'Bob', lastName: 'Brown', squadron: 'N/A', flight: 'N/A', module1: 100, module2: 100, module3: 100, manager: false },
    ];

    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [tempUser, setTempUser] = useState(null);

    const handleToggleManager = (user) => {
        setTempUser(user); // Set the selected user to be toggled
        setShowConfirmModal(true); // Show the confirmation modal
    };

    const confirmToggleManager = () => {
        // Toggle the manager status for the selected user
        setTempUser((prevUser) => ({
            ...prevUser,
            manager: !prevUser.manager,
        }));
        setShowConfirmModal(false); // Close the modal
    };

    return (
        <div className='my-4'>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Squadron</th>
                        <th>Flight</th>
                        <th>Manager Status</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.squadron}</td>
                            <td>{user.flight}</td>
                            <td>
                                <Form.Check
                                    type="switch"
                                    id={`isManager-${user.id}`}
                                    label={user.manager ? "Enabled" : "Disabled"}
                                    checked={user.manager}
                                    onChange={() => handleToggleManager(user)} // Trigger the confirmation modal
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* CONFIRMATION MODAL */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Change</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to change Training Manager privileges for {tempUser?.firstName} {tempUser?.lastName}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmToggleManager}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default UserTable;
