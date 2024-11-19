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
  const [showRepairDeleteModal, setShowRepairDeleteModal] = useState(false);
  const [showInvestmentDeleteModal, setShowInvestmentDeleteModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  // Open delete modal for repair
  const openRepairDeleteModal = (repair) => {
    setSelectedRepair(repair);
    setShowRepairDeleteModal(true);
  };

  // Open delete modal for investment
  const openInvestmentDeleteModal = (investment) => {
    setSelectedInvestment(investment);
    setShowInvestmentDeleteModal(true);
  };

  // Handle deletion of repair
  const handleRepairDelete = async () => {
    if (selectedRepair) {
      try {
        await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/repairs/${selectedRepair.id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setRepairs(repairs.filter((repair) => repair.id !== selectedRepair.id));
        setShowRepairDeleteModal(false);
      } catch (error) {
        console.error("Error deleting repair:", error);
      }
    }
  };

  // Handle deletion of investment
  const handleInvestmentDelete = async () => {
    if (selectedInvestment) {
      try {
        await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/investments/${selectedInvestment.id}/`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });
        setInvestments(investments.filter((investment) => investment.id !== selectedInvestment.id));
        setShowInvestmentDeleteModal(false);
      } catch (error) {
        console.error("Error deleting investment:", error);
      }
    }
  };

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
        console.log("investments", applianceResponse.data.investments);

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
              <p><strong>Description:</strong> {applianceDetails.description}</p>
              <p><strong>Brand:</strong> {applianceDetails.brand}</p>
              <p><strong>Model:</strong> {applianceDetails.model}</p>
              <p><strong>Color:</strong> {applianceDetails.color}</p>
              <p><strong>MSRP:</strong> ${applianceDetails.msrp}</p>
              <p><strong>Lowest Listed Price:</strong> ${applianceDetails.lowest_listed_price}</p>
              <p><strong>Home Depot Price:</strong> ${applianceDetails.home_depot_price}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Summary View</Accordion.Header>
              <Accordion.Body>
                <p><strong>Purchase Date:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
                <p><strong>Total Investments:</strong> ${appliance.total_investment_cost}</p>
                <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost}</p>
                <p><strong>Have Repairs Exceeded Cost?:</strong> {appliance.repairs_exceed_cost ? 'Yes' : 'No'}</p>
                <p><strong>Typical Lifespan:</strong> {appliance.typical_lifespan_years}</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Repairs</Accordion.Header>
              <Accordion.Body>
                {repairs.length > 0 ? (
                  repairs.map((repair) => (
                    <div key={repair.id}>
                      <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
                      <p><strong>Repaired By:</strong> {repair.repaired_by}</p>
                      <p><strong>Description:</strong> {repair.repaired_description}</p>
                      <p><strong>Cost:</strong> ${repair.cost}</p>
                      <Button variant="link" onClick={() => handleEdit(repair.id)}>
                        <FaPencilAlt />
                      </Button>
                      <Button variant="link" onClick={() => openRepairDeleteModal(repair)}>
                        <FaTrash />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No repairs recorded.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Investments</Accordion.Header>
              <Accordion.Body>
                {investments.length > 0 ? (
                  investments.map((investment) => (
                    <div key={investment.id}>
                      <p><strong>Investment Type:</strong> {investment.investment_type}</p>
                      <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
                      <p><strong>Description:</strong> {investment.investment_description}</p>
                      <p><strong>Cost:</strong> ${investment.cost}</p>
                      <Button variant="link" onClick={() => handleEdit(investment.id)}>
                        <FaPencilAlt />
                      </Button>
                      <Button variant="link" onClick={() => openInvestmentDeleteModal(investment)}>
                        <FaTrash />
                      </Button>
                    </div>
                  ))
                ) : (
                  <p>No investments recorded.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
      {/* Repair Delete Confirmation Modal */}
      <Modal show={showRepairDeleteModal} onHide={() => setShowRepairDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedRepair && <p>Are you sure you want to delete this repair?</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRepairDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleRepairDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Investment Delete Confirmation Modal */}
      <Modal show={showInvestmentDeleteModal} onHide={() => setShowInvestmentDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvestment && <p>Are you sure you want to delete this investment?</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowInvestmentDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleInvestmentDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  ); 
};
export default ViewAppliance;