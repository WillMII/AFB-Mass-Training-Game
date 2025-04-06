import React from 'react'
import { useState } from 'react';
import Hdr from '../components/Hdr'
import Footer from '../components/Footer';
import { Container } from 'react-bootstrap';
import AdminNav from '../components/AdminNav';
import ReportTable from '../components/ReportTable';

const Admin = () => {
  const [filters, setFilters] = useState({});

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Hdr />
        <Container className="flex-grow-1">
          <div className='my-5'>
            <h2 className='text-primary text-decoration-underline'>User Progress Reports</h2>
            <AdminNav report={"true"} setFilters={setFilters} filter_mods={true}/>
            <ReportTable filters={filters}/>
          </div>
        </Container>

        <Footer />
      </div>

    </>
  )
}

export default Admin
