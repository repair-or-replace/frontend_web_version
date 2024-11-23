import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ListGroup, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";


const Appliances = () => {
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user.username);
  const location = useLocation();
  const { propertyId } = location.state || {};
  const [userId, setUserId] = useState(null)
  const [applianceList, setApplianceList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
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

  return (
    <Container>
      {error && <Alert variant='danger'>{error}</Alert> }
      <h3 className="text-center">Your Appliances</h3>
      <ListGroup>
        {applianceList.map((appliance) => (
          <ListGroup.Item
            key={appliance.id}
            className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{appliance.name}</Card.Title>
                <Card.Text>{appliance.appliance_type}</Card.Text>
                <Card.Text>{appliance.brand}</Card.Text>
                <Card.Text>{appliance.model}</Card.Text>
                <Card.Text>{appliance.exp_end_of_life}</Card.Text>
                <Card.Text>{appliance.purchase_date}</Card.Text>
                <Card.Text>{appliance.current_status}</Card.Text>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        
        ))}
      </ListGroup>
    </Container>
  );
};

export default Appliances;