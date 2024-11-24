import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import defaultHome from "../assets/default_home_pic.jpeg"
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";



const Properties = () => {
  const token = useSelector((state) => state.user.authToken);
  const userId = useSelector((state) => state.user.userId);
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  console.log(token)
  console.log(userId)

  const navigate = useNavigate();
  

  const fetchProperties = async () => { 
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/user-properties/${userId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      }
    )
    console.log(response.data.properties);
    setPropertyList(response.data.properties);

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error fetching data:, ${error}`);

    } finally {
      setLoading(false)
    };
  };
  console.log(propertyList)

  useEffect(() => {
    fetchProperties();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>
  }

  const deleteProperty = async () => {
    try {
      await axios.delete(`https://repair-or-replace-back-end.onrender.com/api/properties/${propertyToDelete}/`, {
        headers: {
        "Content-Type": "application/json",
          Authorization: `Token ${token}`
    },
  }
);
setPropertyList((prev) => prev.filter((property) => property.id !== propertyToDelete));
setShowModal(false);
  } catch (error) {
    setError(`Error deleting property: ${error}`);
  }
};

  return (
    <Container>
      {error && <Alert variant='danger'>{error}</Alert> }
      <h3 className="text-center">Your Properties</h3>
      <ListGroup>
        {propertyList.map((property) => (
          <ListGroup.Item
            key={property.id}
            className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img
                  variant="top"
                  src={defaultHome}
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/appliances`, { state: { propertyId: property.id } })}
                />              
                <Card.Body>
                  <Card.Title>{property.address_line_1}</Card.Title>
                  <Card.Text>{property.city}</Card.Text>
                  <Card.Text>{property.state}</Card.Text>
                  <Card.Text>{property.zipcode}</Card.Text>
                  <div className="d-flex justify-content-between mt-3">
                    <FaPencilAlt style={{ color:"blue"}} 
                    onClick={() => navigate (`/edit-property/${property.id}`)}/>
                    <FaTrash style={{ cursor: "pointer", color:"red"}}
                    onClick={() => {setPropertyToDelete(property.id); setShowModal(true);}}/>
                  </div>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        
        ))}
      </ListGroup>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this property?</p>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProperty}>
            Delete
          </Button>
          </Modal.Footer>
      </Modal>    
    </Container>
  );
};

export default Properties;
