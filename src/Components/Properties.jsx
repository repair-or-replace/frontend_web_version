// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Container, Card, ListGroup, Alert, Modal, Button } from "react-bootstrap";
// import axios from "axios";
// import defaultHome from "../assets/default_home_pic.jpeg";
// import { FaEdit, FaTrash } from "react-icons/fa";

// const Properties = () => {
//   const token = useSelector((state) => state.user.authToken);
//   const username = useSelector((state) => state.user.username);
//   const userID = useSelector((state) => state.user.userId); // Use useSelector for userID
//   const [propertyList, setPropertyList] = useState([]);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [propertyToDelete, setPropertyToDelete] = useState(null);
//   const navigate = useNavigate();
//   console.log("userId", userID);
//   console.log("userId", userId);

//   // Fetch user ID from API
//   const fetchUserID = async () => {
//     try {
//       const response = await axios.get(`https://repair-or-replace-back-end.onrender.com/api/users/`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${token}`,
//         },
//       });
//       const users = response.data;
//       const user = users.find(user => user.username === username);
      
//       if (user) {
//         setUserId(user.id); // Update userId state here
//       } else {
//         setError("User ID not found");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//       setError(`Error fetching user data: ${error.message}`);
//     }
//   };

//   // Fetch properties from API
//   const fetchProperties = async () => {
//     if (!userID) return; // Ensure userId is set
//     try {
//       const response = await axios.get(
//         `https://repair-or-replace-back-end.onrender.com/api/user-properties/${userID}/`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setPropertyList(response.data.properties);
//     } catch (error) {
//       console.error("Error fetching properties:", error);
//       setError(`Error fetching properties: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch user ID and properties once when token or username changes
//   useEffect(() => {
//     if (token && username) {
//       fetchUserID();
//     }
//   }, [token, username]);

//   useEffect(() => {
//     if (userID) {
//       fetchProperties();
//     }
//   }, [userID, token]);

//   const deleteProperty = async () => {
//     try {
//       await axios.delete(
//         `https://repair-or-replace-back-end.onrender.com/api/properties/${propertyToDelete}/`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${token}`,
//           },
//         }
//       );
//       setPropertyList((prev) =>
//         prev.filter((property) => property.id !== propertyToDelete)
//       );
//       setShowModal(false);
//     } catch (error) {
//       setError(`Error deleting property: ${error.message}`);
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Container>
//       {error && <Alert variant="danger">{error}</Alert>}
//       <h3 className="text-center" style={{ fontWeight: 'bold', fontSize: '2rem', marginTop: '20px' }}>
//         Properties
//       </h3>
//       <div className="row">
//         {propertyList.map((property) => (
//           <ListGroup.Item
//             key={property.id}
//             className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded"
//           ></ListGroup.Item>>
//             <Card style={{ width: "18rem" }}>
//               <Card.Img variant="top" src={defaultHome} style={{ cursor: "pointer" }} onClick={() => navigate("/appliances", {state:{propertyId: property.id}})}/>
//           <div className="col-md-4 mb-4" key={property.id}>
//             <Card className="shadow-sm">
//               <Card.Img
//                 variant="top"
//                 src={defaultHome}
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   navigate(`/appliances`, { state: { propertyId: property.id } })
//                 }
//               />
//               <Card.Body>
//                 <Card.Title>{property.address_line_1}</Card.Title>
//                 <Card.Text>{property.city}</Card.Text>
//                 <Card.Text>{property.state}</Card.Text>
//                 <Card.Text>{property.zipcode}</Card.Text>
//                 <div className="d-flex justify-content-between mt-3">
//                   <FaEdit
//                     style={{ cursor: "pointer", color: "blue" }}
//                     onClick={() => navigate(`/edit-property/${property.id}`)}
//                   />
//                   <FaTrash
//                     style={{ cursor: "pointer", color: "red" }}
//                     onClick={() => {
//                       setPropertyToDelete(property.id);
//                       setShowModal(true);
//                     }}
//                   />
//                 </div>
//               </Card.Body>
//             </Card>
//           </div>
//         ))}
//       </div>

//       {/* Add New Property Button */}
//       <div className="text-center mt-4">
//         <Button variant="success" onClick={() => navigate("/add-new-property")}>
//           Add New Property
//         </Button>
//       </div>

//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Delete</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>Are you sure you want to delete this property?</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={deleteProperty}>
//             Delete
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Properties;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Card, Alert, Modal, Button } from "react-bootstrap";
import axios from "axios";
import defaultHome from "../assets/default_home_pic.jpeg";
import { FaEdit, FaTrash } from "react-icons/fa";

const Properties = () => {
  const token = useSelector((state) => state.user.authToken);
  const username = useSelector((state) => state.user.username);
  const userID = useSelector((state) => state.user.userId); // Use userID from Redux
  const [propertyList, setPropertyList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const navigate = useNavigate();

  console.log(userID);
  console.log(username);
  console.log(token);

  // Fetch properties from API
  const fetchProperties = async () => {
    setLoading(true);
    try {
      console.log("Starting API call for UserID:", userID);
      const response = await axios.get(
        `https://repair-or-replace-back-end.onrender.com/api/user-properties/${userID}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("API response: ", response.data);
      setPropertyList(response.data.properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
      setError(`Error fetching properties: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch properties when userID or token changes
  useEffect(() => {
    if (userID) {
      fetchProperties();
    }
  }, [userID, token]);

  const deleteProperty = async () => {
    try {
      await axios.delete(
        `https://repair-or-replace-back-end.onrender.com/api/properties/${propertyToDelete}/`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );
      setPropertyList((prev) =>
        prev.filter((property) => property.id !== propertyToDelete)
      );
      setShowModal(false);
    } catch (error) {
      setError(`Error deleting property: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      {error && <Alert variant="danger">{error}</Alert>}
      <h3 className="text-center">Properties</h3>
      <div className="row">
        {propertyList.map((property) => (
          <div className="col-md-4 mb-4" key={property.id}>
            <Card className="shadow-sm">
              <Card.Img
                variant="top"
                src={defaultHome}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/appliances`, { state: { propertyId: property.id } })}
              />
              <Card.Body>
                <Card.Title>{property.address_line_1}</Card.Title>
                <Card.Text>{property.city}</Card.Text>
                <Card.Text>{property.state}</Card.Text>
                <Card.Text>{property.zipcode}</Card.Text>
                <div className="d-flex justify-content-between mt-3">
                  <FaEdit
                    style={{ cursor: "pointer", color: "blue" }}
                    onClick={() => navigate(`/edit-property/${property.id}`)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => {
                      setPropertyToDelete(property.id);
                      setShowModal(true);
                    }}
                  />
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Add New Property Button */}
      <div className="text-center mt-4">
        <Button variant="success" onClick={() => navigate("/add-new-property")}>
          Add New Property
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this property?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteProperty}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Properties;
