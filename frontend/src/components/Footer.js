import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar className="border-top">
            <Container className="text-center">
                <p className="m-auto">{"\u00A9"}CopyRight 2025</p>
            </Container>
        </Navbar>
    );
}

export default Footer;