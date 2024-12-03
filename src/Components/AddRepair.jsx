import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Form, Button, Alert, Container, Modal } from "react-bootstrap";

const AddRepair = () => {
  const [repairDate, setRepairDate] = useState("");
  const [repairedBy, setRepairedBy] = useState("");
  const [repairedDescription, setRepairedDescription] = useState("");
  const [repairData, setRepairData] = useState("");
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

      const repairData = {
        repair_date: new Date(repairDate).toISOString().split("T")[0],
        repaired_by: repairedBy.trim(),
        repaired_description: repairedDescription.trim(),
        cost: parseFloat(cost),
        appliance: parseInt(appliance)
      };
      console.log("Repair Data: ", repairData)

      if (!token) {
        setError("No authentication token found");
        setIsLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.post(
          "https://repair-or-replace-back-end.onrender.com/api/repairs/",
          repairData,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        );
        setRepairData(response.data.repairs)
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
  console.log("Repair Data (inside useEffect): ", repairData);
}, [repairData])

  const validateForm = () => {
    const errors = {};
    if (!repairDate || isNaN(new Date(repairDate))) errors.repairDate = "Must enter repair date";
    if (!repairedBy) errors.repairedBy = "Must enter who the appliance was repaired by";
    if (!repairedDescription)
      errors.repairedDescription = "Must enter repair description";
    if (!cost || isNaN(parseFloat(cost)) || parseFloat(cost) <= 0) errors.cost = "Must enter cost";
    if (!appliance) errors.appliance = "Must enter appliance id";
    return errors;
  };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
  
//     if (name === "appliance") {
//       setAppliance(value);
//     }
//   };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {isLoading && <Alert variant="info">Submitting Repair Data...</Alert>}
      {error && (
        <Alert variant="danger">Error Submitting Repair: {error}</Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <h2 className="m-3">Enter New Repair Details</h2>

        <Form.Group controlId="formGroupRepairDate">
          <Form.Label>Date of Repair</Form.Label>
          <Form.Control
            type="date"
            name="repairDate"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
          />
          {errors.repairDate && (
            <div style={{ color: "red" }}>{errors.repairDate}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formGroupRepaireedBy">
          <Form.Label>Enter Company/Proprietor Who Repaired This Appliance</Form.Label>
          <Form.Control
            type="text"
            name="repairedBy"
            value={repairedBy}
            onChange={(e) => setRepairedBy(e.target.value)}
          />
          {errors.repairedBy && (
            <div style={{ color: "red" }}>{errors.repairedBy}</div>
          )}
        </Form.Group>

        <Form.Group controlId="formGroupRepairedDescription">
          <Form.Label>Please Give a Description of the Repair</Form.Label>
          <Form.Control
            type="text"
            name="repairDescription"
            value={repairedDescription}
            onChange={(e) => setRepairedDescription(e.target.value)}
          />
          {errors.repairedDescription && (
            <div style={{ color: "red" }}>{errors.repairedDescription}</div>
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
          <Modal.Title>Your Repair was Added Succesfully!</Modal.Title>
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

export default AddRepair;
