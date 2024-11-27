import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";

const Appliances = () => {
  const location = useLocation();
  const { propertyId } = location.state || {};
  // const [propertyId, setPropertyId] = useState(null);
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user.username);
  const [applianceList, setApplianceList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("Property ID from state:", propertyId);
  console.log(username)
  
  // const fetchPropertyID = async () => { 
  //   try {
  //     const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`
  //       },
  //     }
  //   )
  //   const properties = response.data

  //   const property = properties.find(user => 
  //     user.property === username
  //   );
  //   if (property) {
  //     console.log(`propertyID: ${property.id}`);
  //     setPropertyId(property.id)
  //   } else {
  //     console.log("PropertyID not found")
  //   }
  //   console.log(response.data.username);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(`Error fetching data:, ${error}`);

  //   } 
  // };
  // useEffect(() => {
  //   fetchPropertyID();
  // }, [token])

  const fetchAppliances = async () => { 
    if (!propertyId) {
      console.error("Property ID is missing");;
      setError("Property ID is required to fetch appliances");
      setLoading(false);
      return; 
    }
    try {
      const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/appliances/${propertyId}/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`
        },
      }
    )
    console.log("API response: ", response.data);
    if (response.data) {
    setApplianceList([response.data]);
    } else {
      console.error("Unexpected response format or no appliances found: ", error);
      setError("No appliances found for this property");
    }

    } catch (error) {
      console.error("Error fetching data:", error);
      setError(`Error fetching data:, ${error.message}`);

    } finally {
      setLoading(false)
    };
  };
  console.log(applianceList)

  useEffect(() => {
    if (propertyId) {
      fetchAppliances();
    }
  }, [propertyId]);

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      {error && <Alert variant='danger'>{error}</Alert> }
      <h3 className="text-center">Your Appliances</h3>
      {applianceList.length === 0 ? (
        <Alert variant="danger" className="text-center">No Appliances Found for this Property</Alert>
      ) : (
      <ListGroup>
        {applianceList.map((appliance) => (
          <ListGroup.Item
            key={appliance.id}
            className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{appliance.name}</Card.Title>
                <Card.Text>ID: {appliance.id}</Card.Text>
                <Card.Text>Type: {appliance.appliance_type}</Card.Text>
                <Card.Text>Brand: {appliance.brand}</Card.Text>
                <Card.Text>Model #: {appliance.model}</Card.Text>
                <Card.Text>Expected End of life: {appliance.exp_end_of_life}</Card.Text>
                <Card.Text>Purchase Date: {appliance.purchase_date}</Card.Text>
                <Card.Text>Status: {appliance.current_status}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))}
      </ListGroup>
      )}
    </Container>
  );
};

export default Appliances;