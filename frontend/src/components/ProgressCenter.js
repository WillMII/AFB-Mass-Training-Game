import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleProgress from './ModuleProgress';

const ProgressCenter = () => {

    const modules = [
        { title: "Module 1", progress: 100, due: "01/01/2022", completed: "01/01/2022" },
        { title: "Module 2", progress: 50, due: "01/01/2022", completed: "" },
        { title: "Module 3", progress: 0, due: "01/01/2022", completed: "" },
    ];

    return (
        <div>
            <Row>
                <Col sm>Module Name</Col>
                <Col sm={5}>Progress</Col>
                <Col sm>Due</Col>
                <Col sm>Completed</Col>
            </Row>
            <hr className='m-0 mb-2' />
            {modules.map((module, index) => (
                <ModuleProgress
                    key={index}
                    title={module.title}
                    progress={module.progress}
                    due={module.due}
                    completed={module.completed}
                />
            ))}
        </div>
    );
}

export default ProgressCenter
