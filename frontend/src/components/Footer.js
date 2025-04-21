import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="border-top mt-4 py-3 bg-light">
            <Container className="text-center small text-muted d-flex flex-column">
                <div>&copy; 2025 University of Georgia Capstone Project</div>
                <div>Developed by Christian Jensen, William Mayo, Armaity Katki, and Emily Sperring</div>
                <div>In collaboration with USAF Software Engineering Group (SWEG)</div>
            </Container>
        </Navbar>
    );
}

export default Footer;