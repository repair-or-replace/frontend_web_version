import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useSelector } from 'react-redux';

const EditRepair = () => {
  const { applianceId, repairId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.authToken);
  const [repair, setRepair] = useState({
    repair_date: '',
    repaired_by: '',
    repaired_description: '',
    cost: '',
  });

  useEffect(() => {
    const fetchRepair = async () => {
      try {
        const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/repairs/${repairId}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setRepair(response.data);
      } catch (error) {
        console.error("Error fetching repair:", error);
      }
    };

    fetchRepair();
  }, [repairId, token]);

  const handleChange = (e) => {
    setRepair({ ...repair, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://repair-or-replace-back-end.onrender.com/api/repairs/${repairId}/`, repair, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      });
      navigate(`/appliance/${applianceId}`);
    } catch (error) {
      console.error("Error updating repair:", error);
    }
  };

  return (
    <Container>
      <h2>Edit Repair</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Repair Date</Form.Label>
          <Form.Control
            type="date"
            name="repair_date"
            value={repair.repair_date}
            onChange={handleChange}
            required
          />
        </Form.Group>
        {/* Add similar Form.Group elements for other fields */}
        <Button type="submit">Update Repair</Button>
      </Form>
    </Container>
  );
};

export default EditRepair;