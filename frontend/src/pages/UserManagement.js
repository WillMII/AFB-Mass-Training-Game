import React from 'react'
import { useState } from 'react';
import Hdr from '../components/Hdr'
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
import UserTable from '../components/UserTable'

const UserManagement = () => {
  const [filters, setFilters] = useState({});
  
  return (
    <div className="d-flex flex-column min-vh-100">
      <Hdr />
      <Container className="flex-grow-1">
        <div className='my-5'>
          <h2 className='text-primary text-decoration-underline'>User Management</h2>
          <AdminNav setFilters={setFilters}/>
          <UserTable/>
        </div>
      </Container>

      <Footer />
    </div>
  )
}

export default UserManagement
