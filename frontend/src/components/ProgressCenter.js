import React, { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'; // Make sure to install axios
import ModuleProgress from './ModuleProgress';

const ProgressCenter = () => {
    const [userProgress, setUserProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch user progress when component mounts
        const fetchUserProgress = async () => {
            try {
                // Get user progress from the new API route
                const response = await axios.get('http://localhost:8000/api/progress-center', { withCredentials: true });
                
                if (response.data && response.data.length) {
                    setUserProgress(response.data);
                }
            } catch (err) {
                setError('Failed to load progress data');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProgress();
    }, []);

    if (loading) {
        return <p>Loading progress...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <Row>
                <Col sm={2}>Module Name</Col>
                <Col sm={3}>Progress</Col>
                <Col sm>Status</Col>
                <Col sm>Date Completed</Col>
                <Col sm>Certificate</Col>
            </Row>
            <hr className='m-0 mb-2' />
            {userProgress.map((module, index) => (
                <ModuleProgress
                    key={index}
                    title={module.module_name}
                    progress={module.progress}
                    completed={module.progress === 100}
                    certificate={module.certificate}
                />
            ))}
        </div>
    );
};

export default ProgressCenter;
