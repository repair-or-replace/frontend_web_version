import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import defaultHome from "../assets/default_home_pic.jpeg"

const Properties = () => {
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user.username);
  const [userId, setUserId] = useState(null)
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  console.log(username)
  
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

  const fetchProperties = async () => { 
    if (!userId) return; 
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/user-properties/${userId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      }
    )
    console.log(response.data);
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
    if (userId) {
      fetchProperties();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>
  }

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
              <Card.Img variant="top" src={defaultHome} style={{ cursor: "pointer" }} onClick={() => navigate("/appliances", {state:{propertyId: property.id}})}/>
              <Card.Body>
                <Card.Title>{property.address_line_1}</Card.Title>
                <Card.Text>{property.city}</Card.Text>
                <Card.Text>{property.state}</Card.Text>
                <Card.Text>{property.zipcode}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        
        ))}
      </ListGroup>
    </Container>
  );
};

export default Properties;
