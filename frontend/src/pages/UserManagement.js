import React from 'react'
import { useState } from 'react';
import Hdr from '../components/Hdr'
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';

const UserManagement = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <div className='my-5'>
          <h2 className='text-primary text-decoration-underline'>User Management</h2>
          
        </div>
      </Container>

      <Footer />
    </div>
  )
}

export default UserManagement
