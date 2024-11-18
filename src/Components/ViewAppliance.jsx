import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const ViewAppliance = () => {
  const token = useSelector((state) => state.user.authToken);
  const [appliance, setAppliance] = useState(null);
  const [applianceDetails, setApplianceDetails] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [investments, setInvestments] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // New state for delete modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [repairToDelete, setRepairToDelete] = useState(null);

  useEffect(() => {
    if (token === null) {
      return;
    }

    const fetchApplianceDetails = async () => {
      try {
        const applianceDetailsResponse = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/appliance-details-from-api/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setApplianceDetails(applianceDetailsResponse.data);

        const applianceResponse = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/appliances/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setAppliance(applianceResponse.data);
        setRepairs(applianceResponse.data.repairs || []);
        setInvestments(applianceResponse.data.investments || []);
      } catch (error) {
        console.error("Error fetching appliance data:", error);
        navigate("/"); // Redirect on error
      }
    };

    fetchApplianceDetails();
  }, [id, token, navigate]);

  // Function to handle edit
  const handleEdit = (repairId) => {
    navigate(`/edit-repair/${id}/${repairId}`);
  };

  // Function to open delete modal
  const openDeleteModal = (repair) => {
    setRepairToDelete(repair);
    setShowDeleteModal(true);
  };

  // Function to handle delete
  const handleDelete = async () => {
    if (repairToDelete) {
      try {
        await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/repairs/${repairToDelete.id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        // Remove the deleted repair from the state
        setRepairs(repairs.filter(repair => repair.id !== repairToDelete.id));
        setShowDeleteModal(false);
      } catch (error) {
        console.error("Error deleting repair:", error);
      }
    }
  };

  if (!appliance || !applianceDetails) return <div>Loading appliance data...</div>;

  return (
    <Container>
      <Row className="align-items-center mt-4">
        <Col md={4}>
          <Card.Img
            variant="top"
            src={applianceDetails.product_image}
            alt="Product Image"
            style={{ width: "100%", height: "auto", maxWidth: "400px" }}
          />
        </Col>
        <Col md={8}>
          <Card style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
            <Card.Body>
              <Card.Title>Appliance Details</Card.Title>
              <p><strong>Brand:</strong> {applianceDetails.brand}</p>
              <p><strong>Model:</strong> {applianceDetails.model}</p>
              <p><strong>Description:</strong> {applianceDetails.description}</p>
              <p><strong>Detail Category:</strong> {applianceDetails.detail_category_name}</p>
              <p><strong>Color:</strong> {applianceDetails.color}</p>
              <p><strong>Purchase Date:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
              <p><strong>Lowest Listed Price:</strong> ${applianceDetails.lowest_listed_price}</p>
              <p><strong>Home Depot Price:</strong> ${applianceDetails.home_depot_price}</p>
              <p><strong>MSRP:</strong> ${applianceDetails.msrp}</p>
              <p><strong>Product Documentation 1:</strong> <a href={applianceDetails.product_doc_1} target="_blank" rel="noopener noreferrer">View Doc</a></p>
              <p><strong>Product Documentation 2:</strong> <a href={applianceDetails.product_doc_2} target="_blank" rel="noopener noreferrer">View Doc</a></p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Repairs</Accordion.Header>
              <Accordion.Body>
                {repairs.length > 0 ? repairs.map((repair) => (
                  <div key={repair.id} className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
                      <p><strong>Repaired By:</strong> {repair.repaired_by}</p>
                      <p><strong>Description:</strong> {repair.repaired_description}</p>
                      <p><strong>Cost:</strong> ${repair.cost}</p>
                    </div>
                    <div>
                      <Button variant="link" onClick={() => handleEdit(repair.id)}>
                        <FaPencilAlt />
                      </Button>
                      <Button variant="link" onClick={() => openDeleteModal(repair)}>
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                )) : <p>No repairs recorded.</p>}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Investments</Accordion.Header>
              <Accordion.Body>
                {investments.length > 0 ? investments.map((investment) => (
                  <div key={investment.id}>
                    <p><strong>Investment Type:</strong> {investment.investment_type}</p>
                    <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
                    <p><strong>Description:</strong> {investment.investment_description}</p>
                    <p><strong>Cost:</strong> ${investment.cost}</p>
                    <hr />
                  </div>
                )) : <p>No investments recorded.</p>}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>


      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this repair?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ViewAppliance;
