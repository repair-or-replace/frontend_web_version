import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProperties = () => {
    axios
      .get("https://repair-or-replace-back-end.onrender.com/api/user-properties/")
      .then((response) => {
        console.log(response.data);
        setPropertyList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(`Error fetching data:, ${error}`);
      });
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  console.log(propertyList);

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
              <Card.Img variant="top" src="./../assets/default_home_pic.jpeg" />
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
