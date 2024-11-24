import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup, Alert, Row, Col, Button, Modal} from "react-bootstrap";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { FaPencilAlt, FaTrash } from 'react-icons/fa';




const Appliances = () => {
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user.username);
  const location = useLocation();
  const navigate = useNavigate();
  const { propertyId } = location.state || {};
  const [userId, setUserId] = useState(null)
  const [applianceList, setApplianceList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppliance, setSelectedAppliance] = useState(null);
  console.log("properpty id", propertyId)
  
  const fetchUserID = async () => { 
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/users/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      }
    )
    const users = response.data

    const user = users.find(user => 
      user.username === username
    );
    if (user) {
      console.log(`userID: ${user.id}`);
      setUserId(user.id)
    } else {
      console.log("UserID not found")
    }
    console.log(response.data.username);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error fetching data:, ${error}`);

    } 
  };
  useEffect(() => {
    fetchUserID();
  }, [token])


  const fetchAppliances = async () => { 
    if (!userId) return; 
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      }
    )
    console.log(response.data);
    setApplianceList(response.data.appliances);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error fetching data:, ${error}`);

    } finally {
      setLoading(false)
    };
  };
  console.log("appliance list", applianceList)

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserID(); 
    };
    fetchData();
  }, [token, username]);

  useEffect(() => {
    if (userId) {
      fetchAppliances(); 
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }
//apliance id passed as a parameter to edit appliance 
  const handleEdit = (applianceId) => {
    navigate(`/edit-appliance/${applianceId}`);
  };

  const handleViewAppliance = (applianceId) => {
    navigate(`/view-appliance/${applianceId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/appliances/${selectedAppliance.id}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      });
      console.log("Appliance deleted", selectedAppliance.id);
      setApplianceList(applianceList.filter(appliance => appliance.id !== selectedAppliance.id));
      setShowModal(false);
    } catch (error) {
      setError(`Error deleting appliance: ${error}`);
    }
  };

  return (
    <Container>
      {error && <Alert variant='danger'>{error}</Alert> }
      <h3 className="text-center">Your Appliances</h3>
      <ListGroup>
        <Row>
        {applianceList.map((appliance) => (
        <Col
          key={appliance.id}
          className="mb-4">
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="d-flex align-items-center">
                  <Col xs={9}>
                    <Card.Img 
                      variant="top" 
                      src={appliance.product_image} 
                      alt={appliance.name} 
                      onClick={() => handleViewAppliance(appliance.id)}
                    />
                  </Col>

                  <Col xs={12}>
                    <Card.Title>{appliance.name}</Card.Title>
                    <Card.Text><strong>Model:</strong> {appliance.model}</Card.Text>
                    <Card.Text><strong>Purchase Date:</strong> {appliance.purchase_date}</Card.Text>
                    <Card.Text><strong>Status:</strong> {appliance.current_status}</Card.Text>

                    {/* icons */}
                    <div className="d-flex justify-content-between">
                      <Button 
                        variant="link" 
                        onClick={() => handleEdit(appliance.id)} >
                        <FaPencilAlt />  
                      </Button>
                      <Button 
                        variant="link" 
                        onClick={() => {
                          setSelectedAppliance(appliance);
                          setShowModal(true);
                        }} >
                        <FaTrash  style={{ color: 'red' }}/> 
                      </Button>
                    </div>
                  </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        ))}
      </Row>
      </ListGroup>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this appliance?
        </Modal.Body>
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