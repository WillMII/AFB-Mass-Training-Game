import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import temp from '../imgs/temp_img.png';

const ModuleCard = ({ title, desc }) => {
    return (
        <Card className="d-flex flex-column" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={temp} />
            <Card.Body className="d-flex flex-column">
                <Card.Title> {title} </Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content. {desc}
                </Card.Text>
                <div className="mt-auto d-flex justify-content-center">
                    <Button variant="primary">Open Training</Button>
                </div>
            </Card.Body>
        </Card>
    );
}

export default ModuleCard
