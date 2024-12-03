import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Alert, Container, Modal } from "react-bootstrap";

const AddInvestment = () => {
  const [investmentType, setInvestmentType] = useState("");
  const [investmentDate, setInvestmentDate] = useState("");
  const [investmentDescription, setInvestmentDescription] = useState("");
  const [investmentData, setInvestmentData] = useState("");
  const [cost, setCost] = useState("");
  const [appliance, setAppliance] = useState("");
  const [user, setUser] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const username = useSelector((state) => state.user.username);
  // const [userId, setUserId] = useState(null)
  const token = useSelector((state) => state.user.authToken);
  const storedToken = token || localStorage.getItem("token");
  const navigate = useNavigate();
  console.log(token);

  // const fetchUserID = async () => {
  //   try {
  //     const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/users/`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`
  //       },
  //     }
  //   )
  //   const users = response.data

  //   const user = users.find(user =>
  //     user.username === username
  //   );
  //   if (user) {
  //     console.log(`userID: ${user.id}`);
  //     setUserId(user.id)
  //   } else {
  //     console.log("UserID not found")
  //   }
  //   console.log(response.data.username);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(`Error fetching data:, ${error}`);

  //   }
  // };
  // useEffect(() => {
  //   fetchUserID();
  // }, [token])

  const applianceId = 1;
  const userId = 1;

  // const fetchInvestments = async () => {
  //   if (!userId) return;
  //   try {
  //     const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/investments/${userId}/`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Token ${token}`
  //       },
  //     }
  //   )
  //   console.log(response.data);
  //   setInvestmentData(response.data.investments);

  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setError(`Error fetching data:, ${error}`);

  //   } finally {
  //     setIsLoading(false)
  //   };
  // };
  // useEffect(() => {
  //   if (userId) {
  //     fetchInvestments()
  //   }
  // }, [userId])

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      setError(null);

      const investmentData = {
        investment_type: investmentType.trim(),
        investment_date: new Date(investmentDate).toISOString().split("T")[0],
        investment_description: investmentDescription.trim(),
        cost: parseFloat(cost),
        appliance: parseInt(appliance)
      };
      console.log("Investment Data: ", investmentData)

      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "https://repair-or-replace-back-end.onrender.com/api/investments/",
          investmentData,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setInvestmentData(response.data.investments)
        setShowSuccessModal(true);
        
      } catch (error) {
          console.error("Error submitting form:", error);
          setError(error.toString());
      } finally {
          setIsLoading(false);
      };
    }
  };

  useEffect(() => {
  console.log("Investment Data: ", investmentData);
}, [investmentData])

  const validateForm = () => {
    const errors = {};
    if (!investmentType) errors.investmentType = "Must enter investment type";
    if (!investmentDate) errors.investmentDate = "Must enter date";
    if (!investmentDescription)
      errors.investmentDescription = "Must enter description";
    if (!cost) errors.cost = "Must enter cost";
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === "investment_type") {
      setInvestmentType(value);
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {isLoading && <Alert variant="info">Submitting Investment Data...</Alert>}
      {error && (
        <Alert variant="danger">Error Submitting Investment: {error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <h2 className="m-3">Enter New Investment Details</h2>
        <Form.Group className="mb-3">
          <Form.Label>Investment Type</Form.Label>
          <Form.Select
            name="investment_type"
            value={investmentType}
            onChange={handleChange}
          >
            <option value="" disabled>Select Investment Type</option>
            <option value="maintenance">Maintenance</option>
            <option value="enhancement">Enhancement</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formGroupInvestmentDate">
          <Form.Label>Date of Investment</Form.Label>
          <Form.Control
            type="date"
            name="investmentDate"
            value={investmentDate}
            onChange={(e) => setInvestmentDate(e.target.value)}
          />
          {errors.investmentDate && (
            <div style={{ color: "red" }}>{errors.investmentDate}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formGroupInvestmentDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="investmentDescription"
            value={investmentDescription}
            onChange={(e) => setInvestmentDescription(e.target.value)}
          />
          {errors.investmentDescription && (
            <div style={{ color: "red" }}>{errors.investmentDescription}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formGroupCost">
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type="float"
            name="cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          {errors.cost && <div style={{ color: "red" }}>{errors.cost}</div>}
        </Form.Group>

        <Form.Group controlId="formGroupAppliance">
          <Form.Label>Enter Appliance ID</Form.Label>
          <Form.Control
            type="integer"
            name="appliance"
            value={appliance}
            onChange={(e) => setAppliance(e.target.value)}
          />
          {errors.appliance && (
            <div style={{ color: "red" }}>{errors.appliance}</div>
          )}
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={showSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your New Investment was Added Succesfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you!!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
            setShowSuccessModal(false);
            navigate("/properties")
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AddInvestment;
