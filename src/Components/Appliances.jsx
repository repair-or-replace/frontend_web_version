// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useLocation, useNavigate } from "react-router-dom";
// import { Container, Card, ListGroup, Alert, Row, Col, Button, Modal} from "react-bootstrap";
// import axios from "axios";
// import { FaPencilAlt, FaTrash } from 'react-icons/fa';

// const Appliances = () => {
//   const location = useLocation();
//   const { propertyId } = location.state || {};
//   const navigate = useNavigate();
//   // const [propertyId, setPropertyId] = useState(null);
//   const token = useSelector((state) => state.user.authToken);
//   const username = useSelector((state) => state.user.username);
//   const [applianceList, setApplianceList] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   console.log("Property ID from state:", propertyId);
//   console.log(username)
//   // const location = useLocation();
//   // const navigate = useNavigate();
//   // const { propertyId } = location.state || {};
//   // const [userId, setUserId] = useState(null)
//   // const [applianceList, setApplianceList] = useState([]);
//   // const [error, setError] = useState("");
//   // const [loading, setLoading] = useState(true);
//   // const [showModal, setShowModal] = useState(false);
//   // const [selectedAppliance, setSelectedAppliance] = useState(null);
//   // console.log("properpty id", propertyId)

//   // const fetchPropertyID = async () => {
//   //   try {
//   //     const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}`, {
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Authorization: `Token ${token}`
//   //       },
//   //     }
//   //   )
//   //   const properties = response.data

//   //   const property = properties.find(user =>
//   //     user.property === username
//   //   );
//   //   if (property) {
//   //     console.log(`propertyID: ${property.id}`);
//   //     setPropertyId(property.id)
//   //   } else {
//   //     console.log("PropertyID not found")
//   //   }
//   //   console.log(response.data.username);

//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     setError(`Error fetching data:, ${error}`);

//   //   }
//   // };
//   // useEffect(() => {
//   //   fetchPropertyID();
//   // }, [token])

//   const fetchAppliances = async () => {
//     if (!propertyId) {
//       console.error("Property ID is missing");;
//       setError("Property ID is required to fetch appliances");
//       setLoading(false);
//       return;
//     }
//     try {
//       // const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/appliances/${propertyId}/`, {
//       const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`
//         },
//       }
//     )

//     console.log("API response: ", response.data);
//     if (response.data) {
//     setApplianceList([response.data]);
//     } else {
//       console.error("Unexpected response format or no appliances found: ", error);
//       setError("No appliances found for this property");
//     }

//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setError(`Error fetching data:, ${error.message}`);

//     } finally {
//       setLoading(false)
//     };
//   };
//   console.log("appliance list", applianceList)

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchUserID();
//     };
//     fetchData();
//   }, [token, username]);

//   useEffect(() => {
//     if (propertyId) {
//       fetchAppliances();
//     }
//   }, [propertyId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }
// //apliance id passed as a parameter to edit appliance
//   const handleEdit = (applianceId) => {
//     navigate(`/edit-appliance/${applianceId}`);
//   };

//   const handleViewAppliance = (applianceId) => {
//     navigate(`/view-appliance/${applianceId}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/appliances/${selectedAppliance.id}/`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`
//         },
//       });
//       console.log("Appliance deleted", selectedAppliance.id);
//       setApplianceList(applianceList.filter(appliance => appliance.id !== selectedAppliance.id));
//       setShowModal(false);
//     } catch (error) {
//       setError(`Error deleting appliance: ${error}`);
//     }
//   };

//   return (
//     <Container>
//       {error && <Alert variant='danger'>{error}</Alert> }
//       <h3 className="text-center">Your Appliances</h3>
//       {applianceList.length === 0 ? (
//         <Alert variant="danger" className="text-center">No Appliances Found for this Property</Alert>
//       ) : (
//       <h3 className="text-center" style={{ fontWeight: 'bold', fontSize: '2rem', marginTop: '20px' }}>
//         Manage Your Appliances
//       </h3>
//       <ListGroup>
//         <Row>
//         {applianceList.map((appliance) => (
//           <ListGroup.Item
//             key={appliance.id}
//             className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
//           >
//             <Card style={{ width: "18rem" }}>
//               <Card.Body>
//                 <Card.Title>{appliance.name}</Card.Title>
//                 <Card.Text>ID: {appliance.id}</Card.Text>
//                 <Card.Text>Type: {appliance.appliance_type}</Card.Text>
//                 <Card.Text>Brand: {appliance.brand}</Card.Text>
//                 <Card.Text>Model #: {appliance.model}</Card.Text>
//                 <Card.Text>Expected End of life: {appliance.exp_end_of_life}</Card.Text>
//                 <Card.Text>Purchase Date: {appliance.purchase_date}</Card.Text>
//                 <Card.Text>Status: {appliance.current_status}</Card.Text>
//               </Card.Body>
//             </Card>
//           </ListGroup.Item>
//         <Col
//           key={appliance.id}
//           className="mb-4">
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Row className="d-flex align-items-center">
//                   <Col xs={9}>
//                     <Card.Img
//                       variant="top"
//                       src={appliance.product_image}
//                       alt={appliance.name}
//                       onClick={() => handleViewAppliance(appliance.id)}
//                     />
//                   </Col>

//                   <Col xs={12}>
//                     <Card.Title>{appliance.name}</Card.Title>
//                     <Card.Text><strong>Model:</strong> {appliance.model}</Card.Text>
//                     <Card.Text><strong>Purchase Date:</strong> {appliance.purchase_date}</Card.Text>
//                     <Card.Text><strong>Status:</strong> {appliance.current_status}</Card.Text>

//                     {/* icons */}
//                     <div className="d-flex justify-content-between">
//                       <Button
//                         variant="link"
//                         onClick={() => handleEdit(appliance.id)} >
//                         <FaPencilAlt />
//                       </Button>
//                       <Button
//                         variant="link"
//                         onClick={() => {
//                           setSelectedAppliance(appliance);
//                           setShowModal(true);
//                         }} >
//                         <FaTrash  style={{ color: 'red' }}/>
//                       </Button>
//                     </div>
//                   </Col>
//               </Row>
//             </Card.Body>
//           </Card>
//         </Col>
//         ))}
//       </Row>
//       </ListGroup>
//       )}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           Are you sure you want to delete this appliance?
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={handleDelete}>
//             Confirm Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Appliances;

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
  const { propertyId } = location.state || {};
  const token = useSelector((state) => state.user.authToken);
  const [applianceList, setApplianceList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  console.log("Appliance list (outside function)", applianceList);

  const fetchAppliances = async () => {
    setLoading(true);
    if (!propertyId) {
      setError("Property ID is required to fetch appliances");
      setLoading(false);
      return;
    }
    try {
      const response = await axios.get(
        `https://repair-or-replace-back-end.onrender.com/api/appliances/${1}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API response: ", response);
      setApplianceList(response.data);
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
        {" "}
        {Object.keys(applianceList).map((key) => (
          <Col key={key} md={4}>
            {" "}
            <Card>
              {" "}
              {/* Use applianceList[key] to access the object, then access properties */}{" "}
              <Card.Img variant="top" src={applianceList[key].product_image} />{" "}
              <Card.Body>
                {" "}
                <Card.Title>{applianceList[key].name}</Card.Title>{" "}
                <Card.Text>Model: {applianceList[key].model}</Card.Text>{" "}
                <Card.Text>
                  Status: {applianceList[key].current_status}
                </Card.Text>{" "}
                <Button
                  variant="link"
                  onClick={() =>
                    navigate(`/edit-appliance/${applianceList[key].id}`)
                  }
                >
                  {" "}
                  <FaPencilAlt />{" "}
                </Button>{" "}
                <Button
                  variant="link"
                  onClick={() => {
                    setSelectedAppliance(applianceList[key].id);
                    setShowModal(true);
                  }}
                >
                  {" "}
                  <FaTrash style={{ color: "red" }} />{" "}
                </Button>{" "}
              </Card.Body>{" "}
            </Card>{" "}
          </Col>
        ))}{" "}
      </Row>

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
