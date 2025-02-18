import React from 'react'
import { useState } from 'react';
import Hdr from '../components/Hdr'
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import ReportTable from '../components/ReportTable';

const Admin = () => {

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Hdr />
        <Container className="flex-grow-1">
          <div className='my-5'>
            <h2 className='text-primary text-decoration-underline'>Training Manager Page</h2>
            <AdminNav />
            <ReportTable/>
          </div>
        </Container>

        <Footer />
      </div>

    </>
  )
}

export default Admin
