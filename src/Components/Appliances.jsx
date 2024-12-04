import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  ListGroup,
  Alert,
  Row,
  Col,
  Button,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const Appliances = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const propertyId = useSelector((state) => state.property.propertyId);
  const token = useSelector((state) => state.user.authToken);
  const [applianceList, setApplianceList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  console.log("Appliance list (outside function)", applianceList);
  console.log("Property ID:", propertyId);

  const handleViewAppliance = (applianceId) => {
    console.log("Image clicked");
    navigate(`/view-appliance/${applianceId}`);
  };

  const fetchAppliances = async () => {
    setLoading(true);
    if (!propertyId) {
      setError("Property ID is required to fetch appliances");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API response: ", response.data.appliances);
      setApplianceList(response.data.appliances);
    } catch (error) {
      console.error("Error fetching appliances: ", error);
      setError(`Error fetching appliances: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!propertyId) {
      setError("No property selected. Redirecting...");
      setTimeout(() => navigate("/properties"), 3000); // Redirect after 3 seconds
    } else {
      fetchAppliances();
    }
  }, [propertyId]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `https://repair-or-replace-back-end.onrender.com/api/appliances/${selectedAppliance.id}/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setApplianceList(
        applianceList.filter(
          (appliance) => appliance.id !== selectedAppliance.id
        )
      );
      setShowModal(false);
    } catch (error) {
      setError(`Error deleting appliance: ${error.message}`);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        <h3 className="text-center">Your Appliances</h3>
        {applianceList.length === 0 ? (
          <Col>
            <Alert variant="info" className="text-center">No appliances found for this property. Click "Add New Appliance" to get started.</Alert>
          </Col>
        ) : (
        applianceList.map((appliance) => (
        <Col key={appliance.id} md={4}>
          <Card>
            <Card.Img variant="top" src={appliance.product_image} onClick={() => {handleViewAppliance(appliance.id)}}/>
            <Card.Body>
              <Card.Title>{appliance.name}</Card.Title>
              <Card.Text>Appliance ID: {appliance.id}</Card.Text>
              <Card.Text>Model: {appliance.model}</Card.Text>
              <Card.Text>Status: {appliance.current_status}</Card.Text>
              <Button
                variant="link"
                onClick={() => navigate(`/edit-appliance/${appliance.id}`)}
              >
                <FaPencilAlt />
              </Button>
              <Button
                variant="link"
                onClick={() => {
                  setSelectedAppliance(appliance);
                  setShowModal(true);
                }}
              >
                <FaTrash style={{ color: "red" }} />
              </Button>
            </Card.Body>
          </Card>
        </Col>
        ))
        )};
      </Row>

      <div className="text-center mt-4">
      <Button className="m-3" variant="primary" onClick={() => navigate("/newappliance")}>
          Add New Appliance
        </Button>
        <Button className="m-3" variant="success" onClick={() => navigate("/addinvestment")}>
          Add Investment
        </Button>
        <Button className="m-3" variant="warning" onClick={() => navigate("/addrepair")}>
          Add Repair
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this appliance?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
  );
};

export default Appliances;