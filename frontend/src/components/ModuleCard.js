import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import temp from '../imgs/Module1.png';

const ModuleCard = ({ title, desc, due }) => {
    return (
        <Card className="d-flex flex-column mb-3" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={temp} />
            <Card.Body className="d-flex flex-column">
                <Card.Title> {title} </Card.Title>
                <Card.Text>
                    Due: {due}
                </Card.Text>
                <Card.Text>
                    {desc}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-center">
                    <Button variant="primary">Open Training</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ModuleCard
