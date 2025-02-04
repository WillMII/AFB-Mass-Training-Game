import React from 'react'
import { Container } from 'react-bootstrap';
import Hdr from '../components/Hdr'
import ProgressCenter from '../components/ProgressCenter';
import ModuleCard from '../components/ModuleCard';

const Home = () => {
  return (
    <>
        <Hdr />
        <Container >
            <h1>Progress Center</h1>
            <ProgressCenter />
            <h1>Training Modules</h1>
            <ModuleCard />
        </Container>
    </>
  )
}

export default Home
