// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Accordion, Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
// import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const ViewAppliance = () => {
//   const token = useSelector((state) => state.user.authToken);
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [appliance, setAppliance] = useState(null);
//   const [repairs, setRepairs] = useState([]);
//   const [investments, setInvestments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showAddRepairModal, setShowAddRepairModal] = useState(false);
//   const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);
//   const [newRepair, setNewRepair] = useState({
//     repair_date: "",
//     repaired_description: "",
//     cost: "",
//     repaired_by: "",
//   });
//   const [newInvestment, setNewInvestment] = useState({
//     investment_date: "",
//     investment_description: "",
//     cost: "",
//     investment_type: "maintenance",
//   });

//   useEffect(() => {
//     const fetchApplianceDetails = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/appliances/${id}/`,
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setAppliance(response.data);

//         const repairsResponse = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/repairs/`,
//           {
//             params: { appliance: id },
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setRepairs(repairsResponse.data);

//         const investmentsResponse = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/investments/`,
//           {
//             params: { appliance: id },
//             headers: {
//               Authorization: `Token ${token}`,
//             },
//           }
//         );
//         setInvestments(investmentsResponse.data);
//       } catch (error) {
//         console.error("Error fetching appliance details:", error);
//         navigate("/"); // Redirect to home if there's an error
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (token) {
//       fetchApplianceDetails();
//     }
//   }, [id, token, navigate]);

//   const handleAddRepair = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/repairs/`,
//         {
//           ...newRepair,
//           appliance: id,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setRepairs((prev) => [...prev, response.data]);
//       setShowAddRepairModal(false);
//       setNewRepair({ repair_date: "", repaired_description: "", cost: "", repaired_by: "" });
//     } catch (error) {
//       console.error("Error adding repair:", error);
//     }
//   };

//   const handleAddInvestment = async () => {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/investments/`,
//         {
//           ...newInvestment,
//           appliance: id,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setInvestments((prev) => [...prev, response.data]);
//       setShowAddInvestmentModal(false);
//       setNewInvestment({
//         investment_date: "",
//         investment_description: "",
//         cost: "",
//         investment_type: "maintenance",
//       });
//     } catch (error) {
//       console.error("Error adding investment:", error);
//     }
//   };

//   const handleDeleteRepair = async (repairId) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/repairs/${repairId}/`, {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       });
//       setRepairs((prev) => prev.filter((repair) => repair.id !== repairId));
//     } catch (error) {
//       console.error("Error deleting repair:", error);
//     }
//   };

//   const handleDeleteInvestment = async (investmentId) => {
//     try {
//       await axios.delete(
//         `${import.meta.env.VITE_BACKEND_URL}/api/investments/${investmentId}/`,
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setInvestments((prev) => prev.filter((investment) => investment.id !== investmentId));
//     } catch (error) {
//       console.error("Error deleting investment:", error);
//     }
//   };

//   if (loading) {
//     return <div>Loading appliance data...</div>;
//   }

//   if (!appliance) {
//     return <div>No appliance data available.</div>;
//   }

//   return (
//     <Container>
//       {/* Appliance Details */}
//       <Row className="align-items-center mt-4">
//         <Col md={4}>
//           <Card.Img
//             variant="top"
//             src={appliance.product_image || "https://via.placeholder.com/400"}
//             alt="Appliance"
//             style={{ width: "100%", height: "auto", maxWidth: "400px" }}
//           />
//         </Col>
//         <Col md={8}>
//           <Card style={{ maxWidth: "600px", margin: "auto" }}>
//             <Card.Body>
//               <Card.Title>Appliance Details</Card.Title>
//               <p><strong>Name:</strong> {appliance.name || "N/A"}</p>
//               <p><strong>Appliance Type:</strong> {appliance.appliance_type || "N/A"}</p>
//               <p><strong>Brand:</strong> {appliance.brand || "N/A"}</p>
//               <p><strong>Model:</strong> {appliance.model || "N/A"}</p>
//               <p><strong>Purchase Date:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
//               <p><strong>Current Status:</strong> {appliance.current_status || "N/A"}</p>
//               <p><strong>Cost:</strong> ${appliance.cost || "0.00"}</p>
//               <p><strong>Expected End of Life:</strong> {appliance.exp_end_of_life || "N/A"}</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* Summary View */}
//       <Row className="mt-4">
//         <Col md={12}>
//           <Accordion defaultActiveKey="0">
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>Summary View</Accordion.Header>
//               <Accordion.Body>
//                 <p><strong>Total Investments:</strong> ${appliance.total_investment_cost || "0.00"}</p>
//                 <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost || "0.00"}</p>
//                 <p><strong>Have Repairs Exceeded Cost?:</strong> {appliance.repairs_exceed_cost ? "Yes" : "No"}</p>
//                 <p><strong>Typical Lifespan:</strong> {appliance.typical_lifespan_years || "N/A"} years</p>
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </Col>
//       </Row>

//       {/* Repairs and Investments */}
//       <Row className="mt-4">
//         <Col md={6}>
//           <Accordion defaultActiveKey="0">
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>Repairs</Accordion.Header>
//               <Accordion.Body>
//                 <Button
//                   variant="success"
//                   className="mb-3"
//                   onClick={() => setShowAddRepairModal(true)}
//                 >
//                   <FaPlus /> Add Repair
//                 </Button>
//                 {repairs.length > 0 ? (
//                   repairs.map((repair) => (
//                     <div key={repair.id} className="d-flex justify-content-between align-items-center mb-2">
//                       <div>
//                         <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
//                         <p><strong>Description:</strong> {repair.repaired_description}</p>
//                         <p><strong>Cost:</strong> ${repair.cost.toFixed(2)}</p>
//                       </div>
//                       <div>
//                         <Button variant="link" onClick={() => navigate(`/edit-repair/${repair.id}`)}>
//                           <FaPencilAlt />
//                         </Button>
//                         <Button variant="link" onClick={() => handleDeleteRepair(repair.id)}>
//                           <FaTrash style={{ color: "red" }} />
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No repairs recorded.</p>
//                 )}
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </Col>
//         <Col md={6}>
//           <Accordion defaultActiveKey="0">
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>Investments</Accordion.Header>
//               <Accordion.Body>
//                 <Button
//                   variant="success"
//                   className="mb-3"
//                   onClick={() => setShowAddInvestmentModal(true)}
//                 >
//                   <FaPlus /> Add Investment
//                 </Button>
//                 {investments.length > 0 ? (
//                   investments.map((investment) => (
//                     <div key={investment.id} className="d-flex justify-content-between align-items-center mb-2">
//                       <div>
//                         <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
//                         <p><strong>Description:</strong> {investment.investment_description}</p>
//                         <p><strong>Cost:</strong> ${investment.cost.toFixed(2)}</p>
//                       </div>
//                       <div>
//                         <Button variant="link" onClick={() => navigate(`/edit-investment/${investment.id}`)}>
//                           <FaPencilAlt />
//                         </Button>
//                         <Button variant="link" onClick={() => handleDeleteInvestment(investment.id)}>
//                           <FaTrash style={{ color: "red" }} />
//                         </Button>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No investments recorded.</p>
//                 )}
//               </Accordion.Body>
//             </Accordion.Item>
//           </Accordion>
//         </Col>
//       </Row>

//       {/* Add Repair Modal */}
//       <Modal show={showAddRepairModal} onHide={() => setShowAddRepairModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Repair</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Repair Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={newRepair.repair_date}
//                 onChange={(e) => setNewRepair({ ...newRepair, repair_date: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newRepair.repaired_description}
//                 onChange={(e) =>
//                   setNewRepair({ ...newRepair, repaired_description: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Cost</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newRepair.cost}
//                 onChange={(e) => setNewRepair({ ...newRepair, cost: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Repaired By</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newRepair.repaired_by}
//                 onChange={(e) => setNewRepair({ ...newRepair, repaired_by: e.target.value })}
//               />
//             </Form.Group>
//             <Button variant="success" onClick={handleAddRepair}>
//               Add Repair
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>

//       {/* Add Investment Modal */}
//       <Modal show={showAddInvestmentModal} onHide={() => setShowAddInvestmentModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Investment</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Investment Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={newInvestment.investment_date}
//                 onChange={(e) =>
//                   setNewInvestment({ ...newInvestment, investment_date: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Description</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={newInvestment.investment_description}
//                 onChange={(e) =>
//                   setNewInvestment({ ...newInvestment, investment_description: e.target.value })
//                 }
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Cost</Form.Label>
//               <Form.Control
//                 type="number"
//                 value={newInvestment.cost}
//                 onChange={(e) => setNewInvestment({ ...newInvestment, cost: e.target.value })}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3">
//               <Form.Label>Type</Form.Label>
//               <Form.Select
//                 value={newInvestment.investment_type}
//                 onChange={(e) =>
//                   setNewInvestment({ ...newInvestment, investment_type: e.target.value })
//                 }
//               >
//                 <option value="maintenance">Maintenance</option>
//                 <option value="enhancement">Enhancement</option>
//               </Form.Select>
//             </Form.Group>
//             <Button variant="success" onClick={handleAddInvestment}>
//               Add Investment
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </Container>
//   );
// };

// export default ViewAppliance;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Accordion, Card, Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { FaPencilAlt, FaTrash, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const ViewAppliance = () => {
  const token = useSelector((state) => state.user.authToken);
  const { id } = useParams();
  const navigate = useNavigate();

  const [appliance, setAppliance] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddRepairModal, setShowAddRepairModal] = useState(false);
  const [showAddInvestmentModal, setShowAddInvestmentModal] = useState(false);
  const [newRepair, setNewRepair] = useState({
    repair_date: "",
    repaired_description: "",
    cost: "",
    repaired_by: "",
  });
  const [newInvestment, setNewInvestment] = useState({
    investment_date: "",
    investment_description: "",
    cost: "",
    investment_type: "maintenance",
  });

  useEffect(() => {
    const fetchApplianceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appliances/${id}/`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setAppliance(response.data);

        const repairsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/repairs/`,
          {
            params: { appliance: id },
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setRepairs(repairsResponse.data);

        const investmentsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/investments/`,
          {
            params: { appliance: id },
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        setInvestments(investmentsResponse.data);

        const totalInvestment = investmentsResponse.data.reduce((total, investment) => {
          return total + Number(investment.cost || 0);
        }, 0);

        setAppliance((prev) => ({
          ...prev,
          total_investment_cost: totalInvestment,
        }));



      } catch (error) {
        console.error("Error fetching appliance details:", error);
        navigate("/"); // Redirect to home if there's an error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchApplianceDetails();
    }
  }, [id, token, navigate]);

  const handleAddRepair = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/repairs/`,
      {
        ...newRepair,
        appliance: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    const updatedRepairs = [...repairs, response.data];
    setRepairs(updatedRepairs);

    // recalculate
    const updatedTotalRepairCost = updatedRepairs.reduce(
      (total, repair) => total + Number(repair.cost || 0),
      0
    );
    setAppliance((prev) => ({
      ...prev,
      total_repair_cost: updatedTotalRepairCost,
    }));

    setShowAddRepairModal(false);
    setNewRepair({ repair_date: "", repaired_description: "", cost: "", repaired_by: "" });
  } catch (error) {
    console.error("Error adding repair:", error);
  }
};

  const handleAddInvestment = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/investments/`,
      {
        ...newInvestment,
        appliance: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );

    const updatedInvestments = [...investments, response.data];
    setInvestments(updatedInvestments);


    const updatedTotalInvestmentCost = updatedInvestments.reduce(
      (total, investment) => total + Number(investment.cost || 0),
      0
    );
    setAppliance((prev) => ({
      ...prev,
      total_investment_cost: updatedTotalInvestmentCost,
    }));

    setShowAddInvestmentModal(false);
    setNewInvestment({
      investment_date: "",
      investment_description: "",
      cost: "",
      investment_type: "maintenance",
    });
  } catch (error) {
    console.error("Error adding investment:", error);
  }
};

  const handleDeleteRepair = async (repairId) => {
  const confirmed = window.confirm("Are you sure you want to delete this repair?");
  if (!confirmed) return;

  try {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/repairs/${repairId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    // update list
    const updatedRepairs = repairs.filter((repair) => repair.id !== repairId);
    setRepairs(updatedRepairs);

    const updatedTotalRepairCost = updatedRepairs.reduce(
      (total, repair) => total + Number(repair.cost || 0),
      0
    );
    setAppliance((prev) => ({
      ...prev,
      total_repair_cost: updatedTotalRepairCost,
    }));
  } catch (error) {
    console.error("Error deleting repair:", error);
  }
};

  const handleDeleteInvestment = async (investmentId) => {
  const confirmed = window.confirm("Are you sure you want to delete this investment?");
  if (!confirmed) return;

  try {
    await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/investments/${investmentId}/`,
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );


    const updatedInvestments = investments.filter(
      (investment) => investment.id !== investmentId
    );
    setInvestments(updatedInvestments);


    const updatedTotalInvestmentCost = updatedInvestments.reduce(
      (total, investment) => total + Number(investment.cost || 0),
      0
    );
    setAppliance((prev) => ({
      ...prev,
      total_investment_cost: updatedTotalInvestmentCost,
    }));
  } catch (error) {
    console.error("Error deleting investment:", error);
  }
};

  if (loading) {
    return <div>Loading appliance data...</div>;
  }

  if (!appliance) {
    return <div>No appliance data available.</div>;
  }

  return (
    <Container>
      {/* Appliance Details */}
      <Row className="align-items-center mt-4">
        <Col md={4}>
          <Card.Img
            variant="top"
            src={appliance.product_image || "https://via.placeholder.com/400"}
            alt="Appliance"
            style={{ width: "100%", height: "auto", maxWidth: "400px" }}
          />
        </Col>
        <Col md={8}>
          <Card style={{ maxWidth: "600px", margin: "auto" }}>
            <Card.Body>
              <Card.Title>Appliance Details</Card.Title>
              <p><strong>Name:</strong> {appliance.name || "N/A"}</p>
              <p><strong>Appliance Type:</strong> {appliance.appliance_type || "N/A"}</p>
              <p><strong>Brand:</strong> {appliance.brand || "N/A"}</p>
              <p><strong>Model:</strong> {appliance.model || "N/A"}</p>
              <p><strong>Purchase Date:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
              <p><strong>Current Status:</strong> {appliance.current_status || "N/A"}</p>
              <p><strong>Cost:</strong> ${appliance.cost || "0.00"}</p>
              <p><strong>Expected End of Life:</strong> {appliance.exp_end_of_life || "N/A"}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Summary View */}
      {/*<Row className="mt-4">*/}
      {/*  <Col md={12}>*/}
      {/*    <Accordion defaultActiveKey="0">*/}
      {/*      <Accordion.Item eventKey="0">*/}
      {/*        <Accordion.Header>Summary View</Accordion.Header>*/}
      {/*        <Accordion.Body>*/}
      {/*          <p><strong>Total Investments:</strong> ${appliance.total_investment_cost || "0.00"}</p>*/}
      {/*          <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost || "0.00"}</p>*/}
      {/*          <p><strong>Have Repairs Exceeded Cost?:</strong> {appliance.repairs_exceed_cost ? "Yes" : "No"}</p>*/}
      {/*          <p><strong>Typical Lifespan:</strong> {appliance.typical_lifespan_years || "N/A"} years</p>*/}
      {/*        </Accordion.Body>*/}
      {/*      </Accordion.Item>*/}
      {/*    </Accordion>*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/* Summary View */}
      <Row className="mt-4">
        <Col md={12}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Summary View</Accordion.Header>
              <Accordion.Body>
                <p><strong>Total Investments:</strong> ${appliance.total_investment_cost || "0.00"}</p>
                <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost || "0.00"}</p>
                <p>
                  <strong>Have Repairs Exceeded Cost?:</strong>{" "}
                  {Number(appliance.total_repair_cost || 0) > Number(appliance.total_investment_cost || 0) ? "Yes" : "No"}
                </p>
                <p><strong>Typical Lifespan:</strong> {appliance.typical_lifespan_years || "N/A"} years</p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>


      {/* Repairs and Investments */}
      <Row className="mt-4">
        <Col md={6}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Repairs</Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="success"
                  className="mb-3"
                  onClick={() => setShowAddRepairModal(true)}
                >
                  <FaPlus /> Add Repair
                </Button>
                {repairs.length > 0 ? (
                  repairs.map((repair) => (
                    <div key={repair.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {repair.repaired_description}</p>
                        <p><strong>Cost:</strong> ${repair.cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <Button variant="link" onClick={() => navigate(`/edit-repair/${repair.id}`)}>
                          <FaPencilAlt />
                        </Button>
                        <Button variant="link" onClick={() => handleDeleteRepair(repair.id)}>
                          <FaTrash style={{ color: "red" }} />
                        </Button>
                      </div>
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
            <Accordion.Item eventKey="0">
              <Accordion.Header>Investments</Accordion.Header>
              <Accordion.Body>
                <Button
                  variant="success"
                  className="mb-3"
                  onClick={() => setShowAddInvestmentModal(true)}
                >
                  <FaPlus /> Add Investment
                </Button>
                {investments.length > 0 ? (
                  investments.map((investment) => (
                    <div key={investment.id} className="d-flex justify-content-between align-items-center mb-2">
                      <div>
                        <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
                        <p><strong>Description:</strong> {investment.investment_description}</p>
                        <p><strong>Cost:</strong> ${investment.cost.toFixed(2)}</p>
                      </div>
                      <div>
                        <Button variant="link" onClick={() => navigate(`/edit-investment/${investment.id}`)}>
                          <FaPencilAlt />
                        </Button>
                        <Button variant="link" onClick={() => handleDeleteInvestment(investment.id)}>
                          <FaTrash style={{ color: "red" }} />
                        </Button>
                      </div>
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

      {/* Add Repair Modal */}
      <Modal show={showAddRepairModal} onHide={() => setShowAddRepairModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Repair</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Repair Date</Form.Label>
              <Form.Control
                type="date"
                value={newRepair.repair_date}
                onChange={(e) => setNewRepair({ ...newRepair, repair_date: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newRepair.repaired_description}
                onChange={(e) =>
                  setNewRepair({ ...newRepair, repaired_description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={newRepair.cost}
                onChange={(e) => setNewRepair({ ...newRepair, cost: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Repaired By</Form.Label>
              <Form.Control
                type="text"
                value={newRepair.repaired_by}
                onChange={(e) => setNewRepair({ ...newRepair, repaired_by: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleAddRepair}>
              Add Repair
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add Investment Modal */}
      <Modal show={showAddInvestmentModal} onHide={() => setShowAddInvestmentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Investment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Investment Date</Form.Label>
              <Form.Control
                type="date"
                value={newInvestment.investment_date}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, investment_date: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={newInvestment.investment_description}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, investment_description: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type="number"
                value={newInvestment.cost}
                onChange={(e) => setNewInvestment({ ...newInvestment, cost: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={newInvestment.investment_type}
                onChange={(e) =>
                  setNewInvestment({ ...newInvestment, investment_type: e.target.value })
                }
              >
                <option value="maintenance">Maintenance</option>
                <option value="enhancement">Enhancement</option>
              </Form.Select>
            </Form.Group>
            <Button variant="success" onClick={handleAddInvestment}>
              Add Investment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ViewAppliance;
