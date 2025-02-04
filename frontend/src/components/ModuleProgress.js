import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProgressBar from './Progress'

const ModuleProgress = ({ title, progress, due, completed }) => {
    return (
        <Row>
            <Col sm>{title}</Col>
            <Col sm={5}>
                <ProgressBar progress={progress} />
            </Col>
            <Col sm>{due}</Col>
            <Col sm>{completed}</Col>
        </Row>
    )
}

export default ModuleProgress
