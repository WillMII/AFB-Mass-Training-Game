import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ModuleProgress = ({ title, progress, due, completed, certificate }) => {
    
    const getStatus = (progress) => {
        if (progress === 100) return { icon: "bi bi-check-circle text-success", label: "Complete" };
        if (progress === 0) return { icon: "bi bi-x-circle text-danger", label: "Not Started" };
        return { icon: "bi bi-clock text-warning", label: "In Progress" };
    };

    const { icon, label } = getStatus(progress);
    
    return (
        <Row>
            <Col sm={2}>{title}</Col>
            <Col sm={3}>
                <ProgressBar now={progress} label={`${progress}%`} />
            </Col>
            <Col sm>{due}</Col>
            <Col sm>
                <i className={icon}></i> {label}
            </Col>
            <Col sm>{completed || <i class="bi bi-dash"></i>}</Col>
            <Col sm>{certificate ? <a href="/">View Certificate</a> : <i class="bi bi-dash"></i>}</Col>         
        </Row>
    )
}

export default ModuleProgress;
