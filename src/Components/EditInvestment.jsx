import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

const EditInvestment = () => {
  const { id } = useParams(); // Get the investment ID from the URL
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.authToken); // Get token from Redux store

  // State to store form data and loading/error states
  const [investment, setInvestment] = useState({
    investment_type: "",
    investment_date: "",
    investment_description: "",
    cost: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the existing investment details when the component mounts
  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redirect if no token is available
      return;
    }

    const fetchInvestment = async () => {
      try {
        const response = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/investments/${id}/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setInvestment(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch investment details.");
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [id, token, navigate]);

  // Handle form submission to update the investment
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `https://repair-or-replace-back-end.onrender.com/api/investments/${id}/`,
        investment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      navigate(`/investment/${id}`); // Redirect to the investment details page
    } catch (err) {
      setError("Failed to update investment.");
    }
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvestment({ ...investment, [name]: value });
  };

  // Display loading or error message
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto">
          <h2>Edit Investment</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="investment_type">
              <Form.Label>Investment Type</Form.Label>
              <Form.Control
                type="text"
                name="investment_type"
                value={investment.investment_type}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="investment_date">
              <Form.Label>Investment Date</Form.Label>
              <Form.Control
                type="date"
                name="investment_date"
                value={investment.investment_date}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="investment_description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="investment_description"
                value={investment.investment_description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="cost">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                name="cost"
                value={investment.cost}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Save Changes
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditInvestment;
