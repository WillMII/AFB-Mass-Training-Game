import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBar now={progress} label={`${progress}%`} />
  )
}

export default ProgressBar
