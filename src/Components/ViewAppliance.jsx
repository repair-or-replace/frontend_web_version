import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Accordion, Card, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewAppliance = () => {
  const token = useSelector((state) => state.user.authToken); // Access token from Redux
  const [appliance, setAppliance] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [investments, setInvestments] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (!token) return;

    const fetchApplianceDetails = async () => {
      try {
        const response = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/appliances/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log("Appliance data:", response.data);
        setAppliance(response.data);
        setRepairs(response.data.repairs); // Assuming `repairs` is part of the response
        setInvestments(response.data.investments); // Assuming `investments` is part of the response
      } catch (error) {
        console.error("Error fetching appliance data", error);
      }
    };

    fetchApplianceDetails(); // Invoke the function
  }, [id, token]);

  if (!appliance) return <div>Loading appliance data...</div>;

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Appliance Details</Accordion.Header>
              <Accordion.Body>
                <p>
                  <strong>Brand:</strong> {appliance.brand || "N/A"}
                </p>
                <p>
                  <strong>Model:</strong> {appliance.model || "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {appliance.appliance_type}
                </p>
                <p>
                  <strong>Status:</strong> {appliance.current_status}
                </p>
                <p>
                  <strong>Purchase Date:</strong>{" "}
                  {new Date(appliance.purchase_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Expected End of Life:</strong>{" "}
                  {appliance.exp_end_of_life
                    ? new Date(appliance.exp_end_of_life).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <strong>Cost:</strong> ${appliance.cost || "N/A"}
                </p>
                <p>
                  <strong>Typical Lifespan:</strong>{" "}
                  {appliance.typical_lifespan_years} years
                </p>
                <Card.Img variant="top" src={appliance.product_image} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>Repairs</Accordion.Header>
              <Accordion.Body>
                {repairs.length > 0 ? (
                  repairs.map((repair) => (
                    <div key={repair.id}>
                      <p>
                        <strong>Repair Date:</strong>{" "}
                        {new Date(repair.repair_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Repaired By:</strong> {repair.repaired_by}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {repair.repaired_description}
                      </p>
                      <p>
                        <strong>Cost:</strong> ${repair.cost}
                      </p>
                      <hr />
                    </div>
                  ))
                ) : (
                  <p>No repairs recorded.</p>
                )}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Investments</Accordion.Header>
              <Accordion.Body>
                {investments.length > 0 ? (
                  investments.map((investment) => (
                    <div key={investment.id}>
                      <p>
                        <strong>Investment Type:</strong>{" "}
                        {investment.investment_type}
                      </p>
                      <p>
                        <strong>Investment Date:</strong>{" "}
                        {new Date(investment.investment_date).toLocaleDateString()}
                      </p>
                      <p>
                        <strong>Description:</strong>{" "}
                        {investment.investment_description}
                      </p>
                      <p>
                        <strong>Cost:</strong> ${investment.cost}
                      </p>
                      <hr />
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
      <Button variant="primary" onClick={() => window.history.back()}>
        Back
      </Button>
    </Container>
  );
};

export default ViewAppliance;
