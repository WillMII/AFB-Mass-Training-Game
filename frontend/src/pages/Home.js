import React from 'react'
import { Container } from 'react-bootstrap';
import Hdr from '../components/Hdr'
import ProgressCenter from '../components/ProgressCenter';
import ModuleCard from '../components/ModuleCard';
import Footer from '../components/Footer';

const Home = () => {

    const modules = [
        { title: "Module 1", desc: "" },
        { title: "Module 2", desc: "This is some added text to see some variation in heights." },
        { title: "Module 3", desc: "" },
    ];

    return (
        <>
            <div className="d-flex flex-column min-vh-100">
                <Hdr />
                <Container className="flex-grow-1">
                    <div className='my-5'>
                        <h1 className='text-primary text-decoration-underline'>Progress Center</h1>
                        <ProgressCenter />
                    </div>
                    <div>
                        <h1 className='text-primary text-decoration-underline'>Training Modules</h1>
                        <div class="d-flex justify-content-between align-self-stretch wrap">
                            {modules.map((module, index) => (
                                <ModuleCard key={index} title={module.title} desc={module.desc} />
                            ))}
                        </div>
                    </div>
                </Container>
                <Footer />
            </div>
        </>
    )
}

export default Home
