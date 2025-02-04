import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModuleProgress from './ModuleProgress';

const ProgressCenter = () => {
    return (
        <Container>
            <Row>
                <Col sm>Module Name</Col>
                <Col sm={5}>Progress</Col>
                <Col sm>Due</Col>
                <Col sm>Completed</Col>
            </Row>
            <ModuleProgress title="Module 1" progress={50} due="01/01/2022" completed="Yes" />
        </Container>
    );
}

export default ProgressCenter
