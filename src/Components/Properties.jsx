import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import defaultHome from "../assets/default_home_pic.jpeg"

const Properties = () => {
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user);
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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
    const usernameDefined = username

    const user = users.find(user => 
      username === usernameDefined
    );
    if (user) {
      console.log(`userID: ${user}`);
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
  }, [])

  const fetchProperties = async () => { 
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/user-properties/${id}/`, {
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
              <Card.Img variant="top" src={defaultHome} />
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
