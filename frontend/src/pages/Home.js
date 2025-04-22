// Home.js
import React from 'react';
import { Container } from 'react-bootstrap';
import Hdr from '../components/Hdr';
import ProgressCenter from '../components/ProgressCenter';
import ModuleCard from '../components/ModuleCard';
import Footer from '../components/Footer';
import module1Image from '../imgs/Module1.png';
import module2Image from '../imgs/Module2.png';
import module3Image from '../imgs/Module3.png';

const Home = () => {
  // Provide the training build URL for STINFO and (optionally) others if available.
  const modules = [
    { 
      title: "STINFO", 
      desc: "STINFO stands for Scientific and Technical INFOrmation. STINFO is information related to experimental, developmental, or engineering works", 
      due: "05/01/2025",
      trainingBuildUrl: "http://localhost:8000/module1Build/index.html",
      img: module1Image,
    },
    { 
      title: "Records Management", 
      desc: "Enables complete, accurate and objective accounting of the Air Force's activities to the general public.", 
      due: "05/01/2025",
      trainingBuildUrl: "http://localhost:8000/module2Build/index.html",
      img: module2Image,
    },
    { 
      title: "No FEAR Act", 
      desc: "The No FEAR Act prohibits discrimination and retaliation in the workplace", 
      due: "05/01/2025",
      trainingBuildUrl: "http://localhost:8000/module3Build/index.html",
      img: module3Image,
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
                  img={module.img}
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
