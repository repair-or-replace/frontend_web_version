import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";

const EditRepair = () => {
  const { repairId } = useParams(); 
  const [repairDetails, setRepairDetails] = useState(null);
  const [formData, setFormData] = useState({
    repair_date: "",
    repaired_by: "",
    repaired_description: "",
    cost: "",
  });
  const [error, setError] = useState("");
  const token = useSelector((state) => state.user.authToken);
  const storedToken = token || localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepairDetails = async () => {
      if (!storedToken) {
        console.error("No token found! Redirecting to login...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/repairs/${repairId}/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        setRepairDetails(response.data);
        setFormData({
          repair_date: response.data.repair_date,
          repaired_by: response.data.repaired_by,
          repaired_description: response.data.repaired_description,
          cost: response.data.cost.toString(), //  string needed for input
        });
      } catch (error) {
        console.error("Error fetching repair details:", error.response?.data || error.message);
        setError("Failed to fetch repair details.");
      }
    };

    fetchRepairDetails();
  }, [repairId, storedToken, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!storedToken) {
      console.error("No token found! Redirecting to login...");
      navigate("/login");
      return;
    }

    try {
      const payload = {
        id: repairId,
        repair_date: formData.repair_date,
        repaired_by: formData.repaired_by.trim(),
        repaired_description: formData.repaired_description.trim(),
        cost: parseFloat(formData.cost),
        appliance: repairDetails.appliance, // appliance ID from fetched details
      };

      const response = await axios.put(
        `https://repair-or-replace-back-end.onrender.com/api/repairs/${repairId}/`,
        payload,
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      console.log("Repair updated successfully:", response.data);
      alert("Repair updated successfully!");
      navigate(`/view-appliance/${repairDetails.appliance}`);
    } catch (error) {
      console.error("Error updating repair details:", error.response?.data || error.message);
      setError(error.response?.data?.detail || "Failed to update repair details.");
    }
  };

  if (!repairDetails) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <h2>Edit Repair</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="repair_date" className="mb-3">
          <Form.Label>Repair Date</Form.Label>
          <Form.Control
            type="date"
            name="repair_date"
            value={formData.repair_date}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="repaired_by" className="mb-3">
          <Form.Label>Repaired By</Form.Label>
          <Form.Control
            type="text"
            name="repaired_by"
            value={formData.repaired_by}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="repaired_description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="repaired_description"
            value={formData.repaired_description}
            onChange={handleChange}
            rows={3}
            required
          />
        </Form.Group>

        <Form.Group controlId="cost" className="mb-3">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Repair
        </Button>
        <Button variant="secondary" className="ms-2" onClick={() => navigate(-1)}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditRepair;



