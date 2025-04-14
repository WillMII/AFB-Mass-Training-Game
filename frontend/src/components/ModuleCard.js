// ModuleCard.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import temp from '../imgs/Module1.png';
import './Component.css';

const ModuleCard = ({ title, desc, due, trainingBuildUrl }) => {
  // Button click handler: open the training build if provided.
  const handleOpenTraining = () => {
    if (trainingBuildUrl) {
      // open in a new window/tab
      window.open(trainingBuildUrl, '_blank');
      // ...or redirect the current window [TBD WE SHOULD DECIDE!!!]
      // window.location.href = trainingBuildUrl;
    } else {
      alert("Training is not available for this module.");
    }
  };

  return (
    <Card className="card d-flex flex-column mb-3" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={temp} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          Due: {due}
        </Card.Text>
        <Card.Text>
          {desc}
        </Card.Text>
        <div className="mt-auto d-flex justify-content-center">
          <Button variant="primary" onClick={handleOpenTraining}>
            Open Training
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModuleCard;
