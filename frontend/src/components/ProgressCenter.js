import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleProgress from './ModuleProgress';

const ProgressCenter = () => {

    const user_progress = [
        { title: "STINFO", progress: 100, due: "01/01/2022", completed: "01/01/2022", certificate: "View Certificate" },
        { title: "Records Management", progress: 50, due: "01/01/2022", completed: "", certificate: "" },
        { title: "No FEAR Act", progress: 0, due: "01/01/2022", completed: "", certificate: "" },
    ];

    return (
        <div>
            <Row>
                <Col sm={2}>Module Name</Col>
                <Col sm={3}>Progress</Col>
                <Col sm>Due</Col>
                <Col sm>Status</Col>
                <Col sm>Date Completed</Col>
                <Col sm>Certificate</Col>
            </Row>
            <hr className='m-0 mb-2' />
            {user_progress.map((module, index) => (
                <ModuleProgress
                    key={index}
                    title={module.title}
                    progress={module.progress}
                    due={module.due}
                    completed={module.completed}
                    certificate={module.certificate}
                />
            ))}
        </div>
    );
}

export default ProgressCenter
