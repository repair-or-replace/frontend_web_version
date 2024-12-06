// // import React, { useState, useEffect } from "react";
// // import { useParams, useNavigate } from "react-router-dom";
// // import { Accordion, Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
// // import axios from "axios";
// // import { useSelector } from "react-redux";
// // import { FaPencilAlt, FaTrash } from 'react-icons/fa';

// // const ViewAppliance = () => {
// //   const token = useSelector((state) => state.user.authToken);
// //   const userId = useSelector((state) => state.user.userId);
// //   const [appliance, setAppliance] = useState(null);
// //   const [applianceDetails, setApplianceDetails] = useState(null);
// //   const [repairs, setRepairs] = useState([]);
// //   const [investments, setInvestments] = useState([]);
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [showRepairDeleteModal, setShowRepairDeleteModal] = useState(false);
// //   const [showInvestmentDeleteModal, setShowInvestmentDeleteModal] = useState(false);
// //   const [selectedRepair, setSelectedRepair] = useState(null);
// //   const [selectedInvestment, setSelectedInvestment] = useState(null);
// //   console.log("Appliance ID:", id);

// //   const fetchApplianceDetailsFromModel = async (model) => {
// //     try {
// //       const response = await axios.get(
// //         `${import.meta.env.VITE_BACKEND_URL}/api/appliance-details-from-api/`,
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Token ${token}`,
// //           },
// //         }
// //       );

// //       const matchingAppliance = response.data.find((item) => item.model === model);
// //       console.log("Matching appliance:", matchingAppliance);

// //       if (matchingAppliance) {
// //         const detailedResponse = await axios.get(
// //           `${import.meta.env.VITE_BACKEND_URL}/api/appliance-details-from-api/${matchingAppliance.id}/`,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Token ${token}`,
// //             },
// //           }
// //         );
// //         setApplianceDetails(detailedResponse.data);
// //       } else {
// //         console.error("No matching appliance found for model:", model);
// //       }
// //     } catch (error) {
// //       console.error("Error fetching appliance details:", error);
// //     }
// //   };

// //   //delete repair modal
// //   const handleRepairDelete = async () => {
// //     if (selectedRepair) {
// //       try {
// //         await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/repairs/${selectedRepair.id}/`, {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Token ${token}`,
// //           },
// //         });
// //         setRepairs(repairs.filter((repair) => repair.id !== selectedRepair.id));
// //         setShowRepairDeleteModal(false);
// //       } catch (error) {
// //         console.error("Error deleting repair:", error);
// //       }
// //     }
// //   };

// //   const openRepairDeleteModal = (repair) => {
// //     setSelectedRepair(repair);
// //     setShowRepairDeleteModal(true);
// //   };
  
// //   const openInvestmentDeleteModal = (investment) => {
// //     setSelectedInvestment(investment);
// //     setShowInvestmentDeleteModal(true);
// //   };
// //     //  delete  investment
// //     const handleInvestmentDelete = async () => {
// //       if (selectedInvestment) {
// //         try {
// //           await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/investments/${selectedInvestment.id}/`, {
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Token ${token}`,
// //             },
// //           });
// //           setInvestments(investments.filter((investment) => investment.id !== selectedInvestment.id));
// //           setShowInvestmentDeleteModal(false);
// //         } catch (error) {
// //           console.error("Error deleting investment:", error);
// //         }
// //       }
// //     };

// //   useEffect(() => {
// //     if (token === null) {
// //       return;
// //     }

// //     const fetchAppliance = async () => {
// //       try {
// //         const applianceResponse = await axios.get(
// //           `${import.meta.env.VITE_BACKEND_URL}/api/appliances/${id}/`,
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //               Authorization: `Token ${token}`,
// //             },
// //           }
// //         );
// //         const applianceData = applianceResponse.data;

// //         setAppliance(applianceData);
// //         setRepairs(applianceData.repairs || []);
// //         setInvestments(applianceData.investments || []);

// //         if (applianceData.model) {
// //           await fetchApplianceDetailsFromModel(applianceData.model);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching appliance data:", error);
// //         navigate("/"); 
// //       }
// //     };

// //     fetchAppliance();
// //   }, [id, token, navigate]);

// //   const handleEditRepair = (repairId) => {
// //     navigate(`/edit-repair/${repairId}`);
// //   };

// //   const handleEditInvestment = (investmentId) => {
// //     navigate(`/edit-investment/${investmentId}`);
// //   };


// //   if (!appliance || !applianceDetails) return <div>Loading appliance data...</div>;

// //   return (
// //     <Container>
// //       <Row className="align-items-center mt-4">
// //         <Col md={4}>
// //           <Card.Img
// //             variant="top"
// //             src={applianceDetails.product_image}
// //             alt="Product Image"
// //             style={{ width: "100%", height: "auto", maxWidth: "400px" }}
// //           />
// //         </Col>
// //         <Col md={8}>
// //           <Card style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
// //             <Card.Body>
// //               <Card.Title>Appliance Details</Card.Title>
// //               <p><strong>Description:</strong> {applianceDetails.description}</p>
// //               <p><strong>Brand:</strong> {applianceDetails.brand}</p>
// //               <p><strong>Model:</strong> {applianceDetails.model}</p>
// //               <p><strong>Color:</strong> {applianceDetails.color}</p>
// //               <p><strong>MSRP:</strong> ${applianceDetails.msrp}</p>
// //               <p><strong>Lowest Listed Price:</strong> ${applianceDetails.lowest_listed_price}</p>
// //               <p><strong>Home Depot Price:</strong> ${applianceDetails.home_depot_price}</p>
// //             </Card.Body>
// //           </Card>
// //         </Col>
// //       </Row>
// //       <Row className="mt-4">
// //         <Col md={12}>
// //           <Accordion defaultActiveKey="0">
// //             <Accordion.Item eventKey="0">
// //               <Accordion.Header>Summary View</Accordion.Header>
// //               <Accordion.Body>
// //                 <p><strong>Purchase Date:</strong> {new Date(appliance.purchase_date).toLocaleDateString()}</p>
// //                 <p><strong>Total Investments:</strong> ${appliance.total_investment_cost}</p>
// //                 <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost}</p>
// //                 <p><strong>Have Repairs Exceeded Cost?:</strong> {appliance.repairs_exceed_cost ? 'Yes' : 'No'}</p>
// //                 <p><strong>Typical Lifespan:</strong> {appliance.typical_lifespan_years}</p>
// //               </Accordion.Body>
// //             </Accordion.Item>
// //           </Accordion>
// //         </Col>
// //       </Row>
// //       <Row className="mt-4">
// //         <Col md={6}>
// //           <Accordion defaultActiveKey="0">
// //             <Accordion.Item eventKey="0">
// //               <Accordion.Header>Repairs</Accordion.Header>
// //               <Accordion.Body>
// //                 {repairs.length > 0 ? (
// //                   repairs.map((repair) => (
// //                     <div key={repair.id}>
// //                       <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
// //                       <p><strong>Repaired By:</strong> {repair.repaired_by}</p>
// //                       <p><strong>Description:</strong> {repair.repaired_description}</p>
// //                       <p><strong>Cost:</strong> ${repair.cost}</p>
// //                       <Button variant="link" onClick={() => handleEditRepair(repair.id)}>
// //                         <FaPencilAlt />
// //                       </Button>
// //                       <Button variant="link" onClick={() => openRepairDeleteModal(repair)}>
// //                         <FaTrash />
// //                       </Button>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p>No repairs recorded.</p>
// //                 )}
// //               </Accordion.Body>
// //             </Accordion.Item>
// //           </Accordion>
// //         </Col>
// //         <Col md={6}>
// //           <Accordion defaultActiveKey="0">
// //             <Accordion.Item eventKey="0">
// //               <Accordion.Header>Investments</Accordion.Header>
// //               <Accordion.Body>
// //                 {investments.length > 0 ? (
// //                   investments.map((investment) => (
// //                     <div key={investment.id}>
// //                       <p><strong>Investment Type:</strong> {investment.investment_type}</p>
// //                       <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
// //                       <p><strong>Description:</strong> {investment.investment_description}</p>
// //                       <p><strong>Cost:</strong> ${investment.cost}</p>
// //                       <Button variant="link" onClick={() => handleEditInvestment(investment.id)}>
// //                         <FaPencilAlt />
// //                       </Button>
// //                       <Button variant="link" onClick={() => openInvestmentDeleteModal(investment)}>
// //                         <FaTrash style={{ color: 'red' }}/>
// //                       </Button>
// //                     </div>
// //                   ))
// //                 ) : (
// //                   <p>No investments recorded.</p>
// //                 )}
// //               </Accordion.Body>
// //             </Accordion.Item>
// //           </Accordion>
// //         </Col>
// //       </Row>
// //       {/* Repair Delete Confirmation Modal */}
// //       <Modal show={showRepairDeleteModal} onHide={() => setShowRepairDeleteModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Confirm Delete</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {selectedRepair && <p>Are you sure you want to delete this repair?</p>}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}} onClick={() => setShowRepairDeleteModal(false)}>
// //             Cancel
// //           </Button>
// //           <Button style={{color: "whitesmoke", backgroundColor: "#84b474",border: "none",}} onClick={handleRepairDelete}>
// //             Delete
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //       {/* Investment Delete Confirmation Modal */}
// //       <Modal show={showInvestmentDeleteModal} onHide={() => setShowInvestmentDeleteModal(false)}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Confirm Delete</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {selectedInvestment && <p>Are you sure you want to delete this investment?</p>}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}} onClick={() => setShowInvestmentDeleteModal(false)}>
// //             Cancel
// //           </Button>
// //           <Button style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}} onClick={handleInvestmentDelete}>
// //             Delete
// //           </Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </Container>
// //   ); 
// // };
// // export default ViewAppliance;



// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Accordion, Card, Container, Row, Col, Button } from "react-bootstrap";
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
//         setRepairs(response.data.repairs || []);
//         setInvestments(response.data.investments || []);
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

//   if (loading) {
//     return <div>Loading appliance data...</div>;
//   }

//   if (!appliance) {
//     return <div>No appliance data available.</div>;
//   }

//   return (
//     <Container>
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
//           <Card style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
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
//       <Row className="mt-4">
//         <Col md={6}>
//           <Accordion defaultActiveKey="0">
//             <Accordion.Item eventKey="0">
//               <Accordion.Header>Repairs</Accordion.Header>
//               <Accordion.Body>
//                 {repairs.length > 0 ? (
//                   repairs.map((repair) => (
//                     <div key={repair.id}>
//                       <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
//                       <p><strong>Description:</strong> {repair.repaired_description}</p>
//                       <p><strong>Cost:</strong> ${repair.cost.toFixed(2)}</p>
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
//                 {investments.length > 0 ? (
//                   investments.map((investment) => (
//                     <div key={investment.id}>
//                       <p><strong>Investment Date:</strong> {new Date(investment.investment_date).toLocaleDateString()}</p>
//                       <p><strong>Description:</strong> {investment.investment_description}</p>
//                       <p><strong>Cost:</strong> ${investment.cost.toFixed(2)}</p>
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
        setRepairs(response.data.repairs || []);
        setInvestments(response.data.investments || []);
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
          appliance: id, // Link to the current appliance
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setRepairs((prevRepairs) => [...prevRepairs, response.data]);
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
          appliance: id, // Link to the current appliance
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setInvestments((prevInvestments) => [...prevInvestments, response.data]);
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
          <Card style={{ maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
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
      <Row className="mt-4">
        <Col md={12}>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Summary View</Accordion.Header>
              <Accordion.Body>
                <p><strong>Total Investments:</strong> ${appliance.total_investment_cost || "0.00"}</p>
                <p><strong>Total Repair Costs:</strong> ${appliance.total_repair_cost || "0.00"}</p>
                <p><strong>Have Repairs Exceeded Cost?:</strong> {appliance.repairs_exceed_cost ? "Yes" : "No"}</p>
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
      <div
        key={repair.id}
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
      >
        <div>
          <p><strong>Repair Date:</strong> {new Date(repair.repair_date).toLocaleDateString()}</p>
          <p><strong>Description:</strong> {repair.repaired_description}</p>
          <p><strong>Cost:</strong> ${repair.cost.toFixed(2)}</p>
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => navigate(`/edit-repair/${repair.id}`)}
          >
            <FaPencilAlt />
          </Button>
          <Button
            variant="link"
            onClick={() => handleDeleteRepair(repair.id)}
          >
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
      <div
        key={investment.id}
        className="d-flex justify-content-between align-items-center mb-2"
        style={{ borderBottom: "1px solid #ccc", paddingBottom: "8px" }}
      >
        <div>
          <p>
            <strong>Investment Date:</strong>{" "}
            {new Date(investment.investment_date).toLocaleDateString()}
          </p>
          <p>
            <strong>Description:</strong> {investment.investment_description}
          </p>
          <p>
            <strong>Cost:</strong> ${investment.cost.toFixed(2)}
          </p>
        </div>
        <div>
          <Button
            variant="link"
            onClick={() => navigate(`/edit-investment/${investment.id}`)}
          >
            <FaPencilAlt />
          </Button>
          <Button
            variant="link"
            onClick={() => console.log("Delete investment")}
          >
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
