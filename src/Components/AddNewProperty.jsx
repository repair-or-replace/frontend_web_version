import React from 'react'
import { Container, Form } from 'react-bootstrap'

const AddNewProperty = () => {
  return (
    <div>
        <Form.Label>Enter Street Address</Form.Label>
        <Form.Label>Enter Unit # (if applicable)</Form.Label>
        <Form.Label>Enter City</Form.Label>
        <Form.Label>Enter State</Form.Label>
        <Form.Label>Enter Zip Code</Form.Label>
        <Form.Label>Enter Property Type</Form.Label>
    </div>
  )
}

export default AddNewProperty