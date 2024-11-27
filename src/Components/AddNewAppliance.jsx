import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Alert, Container, Modal } from "react-bootstrap";

const NewAppliance = () => {
  const [modelNumber, setModelNumber] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [applianceData, setApplianceData] = useState("");
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

  // const applianceId = 1;
  // const userId = 1;

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

      const applianceData = {
        model: modelNumber.trim(),
        purchase_date: new Date(purchaseDate).toISOString().split("T")[0]
      };
      console.log("Appliance Data: ", applianceData)

      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "https://repair-or-replace-back-end.onrender.com/api/appliances/",
          applianceData,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setApplianceData(response.data.appliances)
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
  console.log("Appliance Data: ", applianceData);
}, [applianceData])

  const validateForm = () => {
    const errors = {};
    if (!modelNumber) errors.modelNumber = "Must enter model number";
    if (!purchaseDate) errors.purchaseDate = "Must enter date of purchase";
    return errors;
  };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
  
//     if (name === "model") {
//       setModelNumber(value);
//     }
//   };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {isLoading && <Alert variant="info">Submitting Appliance Data...</Alert>}
      {error && (
        <Alert variant="danger">Error Submitting Appliance: {error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <h2 className="m-3">Enter New Appliance Details</h2>
        <Form.Group controlId="formGroupModelNumber">
          <Form.Label>Enter Model Number: </Form.Label>
          <Form.Control
            type="text"
            name="modelNumber"
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
          />
          {errors.modelNumber && (
            <div style={{ color: "red" }}>{errors.modelNumber}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formGroupPurchaseDate">
          <Form.Label>Date of Purchase</Form.Label>
          <Form.Control
            type="date"
            name="purchaseDate"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
          {errors.purchaseDate && (
            <div style={{ color: "red" }}>{errors.purchaseDate}</div>
          )}
        </Form.Group>

        <Button className="mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      <Modal show={showSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Your New Appliance was Added Succesfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Thank you!!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default NewAppliance;
