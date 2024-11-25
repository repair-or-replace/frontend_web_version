import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://repair-or-replace-back-end.onrender.com/api/users/', inputs);
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={inputs.username}
            onChange={handleChange}
            required
            placeholder="Enter your username"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </Form.Group>
        <Form.Group controlId="formPasswordConfirm">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password_confirm"
            value={inputs.password_confirm}
            onChange={handleChange}
            required
            placeholder="Confirm your password"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Register
        </Button>
      </Form>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Container>
  );
};

export default Register;
