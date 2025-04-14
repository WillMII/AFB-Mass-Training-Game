// Home.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Hdr from '../components/Hdr';
import ProgressCenter from '../components/ProgressCenter';
import ModuleCard from '../components/ModuleCard';
import Footer from '../components/Footer';

const Home = () => {
  // Provide the training build URL for STINFO and (optionally) others if available.
  const modules = [
    { 
      title: "STINFO", 
      desc: "STINFO stands for Scientific and Technical INFOrmation. STINFO is information related to experimental, developmental, or engineering works", 
      due: "05/01/2025",
      trainingBuildUrl: "http://localhost:8000/module1Build/index.html" 
    },
    { 
      title: "Records Management", 
      desc: "Enables complete, accurate and objective accounting of the Air Force's activities to the general public.", 
      due: "05/01/2025",
      trainingBuildUrl: null // update build URL
    },
    { 
      title: "No FEAR Act", 
      desc: "The No FEAR Act prohibits discrimination and retaliation in the workplace", 
      due: "05/01/2025",
      trainingBuildUrl: null // update build URL
    },
  ];

  return (
    <>
      <div className="d-flex flex-column min-vh-100">
        <Hdr />
        <Container className="flex-grow-1">
          <div className='my-5'>
            <h2 className='text-primary text-decoration-underline'>Progress Center</h2>
            <ProgressCenter />
          </div>
          <div>
            <h2 className='text-primary text-decoration-underline'>Training Modules</h2>
            <div className="d-flex justify-content-between align-self-stretch flex-wrap">
              {modules.map((module, index) => (
                <ModuleCard 
                  key={index} 
                  title={module.title} 
                  desc={module.desc} 
                  due={module.due}
                  trainingBuildUrl={module.trainingBuildUrl}
                />
              ))}
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  );
};

export default Home;
