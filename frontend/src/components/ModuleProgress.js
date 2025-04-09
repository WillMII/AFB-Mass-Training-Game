import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ModuleProgress = ({ title, progress, due, completed, certificate }) => {
    
    const downloadCertificate = async () => {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
        const params = new URLSearchParams({
            name: "Trainee Name",
            moduleName: "STINFO",
            dateCompleted: "01/01/22",
        });
    
        const fullUrl = `${apiUrl}/api/download-certificate?${params.toString()}`;
        window.open(fullUrl, "_blank");
    };    

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
            
            <Col sm>
                <i className={icon}></i> {label}
            </Col>
            <Col sm>{completed || <i class="bi bi-dash"></i>}</Col>
            <Col sm>
                {certificate ? 
                    <button className="btn btn-link p-0" onClick={downloadCertificate}>View Certificate</button> 
                    : <i className="bi bi-dash"></i>
                }
            </Col>          
        </Row>
    )
}

export default ModuleProgress;
