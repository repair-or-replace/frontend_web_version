import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddNewProperty = () => {
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zipcode: "",
    home_type: "single",
    year_built: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.user.authToken); // Get the user's auth token
  const userId = useSelector((state) => state.user.userId); // Get the user ID
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "https://repair-or-replace-back-end.onrender.com/api/properties/",
        {
          ...formData,
          user: userId, // Ensure the property is associated with the correct user
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Property added:", response.data);
      setSuccess(true);
      setTimeout(() => navigate("/properties"), 1500); // Redirect to properties page after success
    } catch (err) {
      console.error("Error adding property:", err.response?.data || err.message);
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Add New Property</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Property added successfully!</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Street Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Street Address"
            name="address_line_1"
            value={formData.address_line_1}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Unit # (if applicable)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Unit #"
            name="address_line_2"
            value={formData.address_line_2}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Zip Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Zip Code"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Property Type</Form.Label>
          <Form.Select
            name="home_type"
            value={formData.home_type}
            onChange={handleChange}
          >
            <option value="single">Single Family</option>
            <option value="multi">Multi Family</option>
            <option value="condo">Condo</option>
            <option value="apartment">Apartment</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year Built</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Year Built"
            name="year_built"
            value={formData.year_built}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddNewProperty;