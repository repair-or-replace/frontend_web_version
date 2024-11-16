import React, { useEffect, useState } from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const Properties = () => {
  const [propertyList, setPropertyList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "https://repair-or-replace-back-end.onrender.com/api/properties/"
      );
      const propertyData = await response.json();
      setPropertyList(propertyData);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  console.log(propertyList);

  return (
    <Container>
      <ListGroup>
        {propertyList.map((property) => (
          <ListGroup.Item key={property.id} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
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
