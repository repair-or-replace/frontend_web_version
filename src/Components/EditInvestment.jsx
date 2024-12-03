import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const EditInvestment = () => {
  const { investmentId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.authToken);

  const [investmentDetails, setInvestmentDetails] = useState({
    id: investmentId,
    investment_type: "",
    investment_date: "",
    investment_description: "",
    cost: "",
    appliance: "",
  });
  const [error, setError] = useState("");

  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    const fetchInvestmentDetails = async () => {
      try {
        if (!storedToken) {
          console.error("No token found! Redirecting to login...");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/investments/${investmentId}/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        setInvestmentDetails(response.data);
      } catch (error) {
        console.error(
          "Error fetching investment details:",
          error.response || error.message
        );
        setError("Failed to load investment details. Please try again.");
      }
    };

    fetchInvestmentDetails();
  }, [investmentId, storedToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInvestmentDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!storedToken) {
        console.error("No token found! Redirecting to login...");
        navigate("/login");
        return;
      }

      const payload = {
        id: investmentDetails.id,
        investment_type: investmentDetails.investment_type,
        investment_date: investmentDetails.investment_date,
        investment_description: investmentDetails.investment_description,
        cost: parseFloat(investmentDetails.cost), 
        appliance: parseInt(investmentDetails.appliance, 10), 
      };

      const response = await axios.put(
        `https://repair-or-replace-back-end.onrender.com/api/investments/${investmentId}/`,
        payload,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      console.log("Investment updated successfully:", response.data);
      navigate(`/view-appliance/${investmentDetails.appliance}`);
    } catch (error) {
      console.error(
        "Error updating investment details:",
        error.response || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to update investment. Please check your input."
      );
    }
  };

  if (!investmentDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h3 className="text-center header-banner">Edit Investment</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="investment_type" className="mb-3">
          <Form.Label>Investment Type</Form.Label>
          <Form.Control
            type="text"
            name="investment_type"
            value={investmentDetails.investment_type}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="investment_date" className="mb-3">
          <Form.Label>Investment Date</Form.Label>
          <Form.Control
            type="date"
            name="investment_date"
            value={investmentDetails.investment_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="investment_description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="investment_description"
            value={investmentDetails.investment_description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group controlId="cost" className="mb-3">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="cost"
            value={investmentDetails.cost}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="appliance" className="mb-3">
          <Form.Label>Appliance ID</Form.Label>
          <Form.Control
            type="number"
            name="appliance"
            value={investmentDetails.appliance}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button style={{ color: "whitesmoke",
        backgroundColor: "#84b474",
        border: "none",}} type="submit">
          Update Investment
        </Button>
        <Button
       style={{ color: "whitesmoke",
        backgroundColor: "#84b474",
        border: "none",}}
          className="ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditInvestment;
