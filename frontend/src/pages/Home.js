import React from 'react'
import { Container } from 'react-bootstrap';
import Hdr from '../components/Hdr'
import ProgressCenter from '../components/ProgressCenter';
import ModuleCard from '../components/ModuleCard';
import Footer from '../components/Footer';

const Home = () => {

    const modules = [
        { title: "Module 1", desc: "", due: "01/01/2022" },
        { title: "Module 2", desc: "This is some added text to see some variation in heights.", due: "01/01/2022" },
        { title: "Module 3", desc: "", due: "01/01/2022" },
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
                        <div class="d-flex justify-content-between align-self-stretch flex-wrap">
                            {modules.map((module, index) => (
                                <ModuleCard key={index} title={module.title} desc={module.desc} due={module.due} />
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
