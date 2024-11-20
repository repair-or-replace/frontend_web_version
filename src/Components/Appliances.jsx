import { Component, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ListGroup, Button, Container, Alert, Card } from "react-bootstrap";
import axios from "axios";

const Appliances = () => {
  const [appliancesList, setAppliancesList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [applianceDetails, setApplianceDetails] = useState(-1);

  const fetchAppliances = () => {
    axios
      .get("https://repair-or-replace-back-end.onrender.com/api/appliances/")
      .then((response) => {
        console.log(response.data);
        setAppliancesList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(`Error fetching data:, ${error}`);
      });
  };

  const deleteAppliance = (applianceId) => {
    if (window.confirm("Delete Appliance?")) {
      axios
        .delete(
          `https://repair-or-replace-back-end.onrender.com/api/appliances/${applianceId}/`
        )
        .then(() => {
          fetchAppliances();
          console.log("Appliance Deleted");
        })
        .catch((error) => {
          console.error("Error deleting Appliance:", error);
          setError(`Error deleting Appliance:, ${error}`);
        });
    }
  };

  useEffect(() => {
    fetchAppliances();
  }, []);

  console.log(appliancesList);
  return (
    <Container>
      <h1 className="text-center">Your Appliances</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <ListGroup>
        {appliancesList.map((appliance) => (
          <ListGroup.Item
            key={appliance.id}
            className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="./../assets/default_home_pic.jpeg" />
              <Card.Body>
                <Card.Title>{appliance.name}</Card.Title>
                <Card.Text>{appliance.appliance_type}</Card.Text>
                <Card.Text>{appliance.brand}</Card.Text>
                <Card.Text>{appliance.model}</Card.Text>
                <Card.Text>{appliance.purchase_date}</Card.Text>
                <Button
                  variant="danger"
                  onClick={deleteAppliance(appliance.id)}
                >
                  Delete this Appliance
                </Button>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Appliances;
