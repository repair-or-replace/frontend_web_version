// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { Container, Alert, Card, Button, Modal, Form } from "react-bootstrap";

// const Profile = () => {
//   const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
//   const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");
//   const navigate = useNavigate();

//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [editMode, setEditMode] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [formData, setFormData] = useState({});

//   const fetchUserProfile = async () => {
//     if (!authToken || !userId) {
//       setError("Auth token or user ID is missing.");
//       return;
//     }

//     try {
//       const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`, {
//         headers: { Authorization: `Token ${authToken}` },
//       });
//       setProfile(response.data);
//       setFormData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.detail || "Failed to fetch user data.");
//     }
//   };

//   const handleEditToggle = () => {
//     setError(""); // Clear error when toggling edit
//     setEditMode((prev) => !prev);
//     if (!editMode) setFormData(profile); // Reset form data when exiting edit mode
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = async () => {
//     setError(""); // Clear error when saving
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
//         formData,
//         { headers: { Authorization: `Token ${authToken}` } }
//       );
//       setProfile(response.data);
//       setEditMode(false);
//     } catch (err) {
//       setError("Failed to save changes.");
//     }
//   };

//   // const handleDeleteAccount = async () => {
//   //   setError(""); // Clear error when deleting account
//   //   try {
//   //     const propertiesResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/properties/`, {
//   //       headers: { Authorization: `Token ${authToken}` },
//   //     });

//   //     if (propertiesResponse.data.length > 0) {
//   //       setError("You have properties in your account. Delete the properties first...");
//   //       return;
//   //     }

//   //     await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`, {
//   //       headers: { Authorization: `Token ${authToken}` },
//   //     });

//   //     localStorage.clear();
//   //     navigate("/register");
//   //   } catch (err) {
//   //     setError("Failed to delete account.");
//   //   }
//   // };
//   const handleDeleteAccount = async () => {
//     if (!authToken || !userId) {
//       setError("Missing authentication credentials. Please log in again.");
//       return;
//     }

//     try {
//       const propertiesResponse = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/user-properties/${userId}/`,
//         { headers: { Authorization: `Token ${authToken}` } }
//       );

//       if (propertiesResponse.data.length > 0) {
//         setError("You have properties in your account. Please delete them first.");
//         return;
//       }

//       setShowDeleteModal(true);
//     } catch (err) {
//       console.error("Error checking user properties:", err.response || err);
//       setError("An error occurred while checking your properties.");
//     }
//   };
  
  




//   const confirmDelete = () => {
//     setShowDeleteModal(false);
//     handleDeleteAccount();
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, [authToken, userId]);

//   // Add a global click listener to clear the error when clicking elsewhere
//   useEffect(() => {
//     const handleClickOutside = () => {
//       setError(""); // Clear the error when clicking elsewhere
//     };

//     window.addEventListener("click", handleClickOutside);
//     return () => {
//       window.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   return (
//     <Container className="mt-5">
//       {error && <Alert variant="danger">{error}</Alert>}
//       <Card>
//         <Card.Header>User Profile</Card.Header>
//         <Card.Body>
//           {editMode ? (
//             <>
//               <Form>
//                 <Form.Group>
//                   <Form.Label>First Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     value={formData.first_name || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Last Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     value={formData.last_name || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//                 <Form.Group>
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email || ""}
//                     onChange={handleInputChange}
//                   />
//                 </Form.Group>
//               </Form>
//               <Button variant="success" onClick={handleSave} className="mt-3">
//                 Save
//               </Button>
//               <Button variant="secondary" onClick={handleEditToggle} className="mt-3 ms-2">
//                 Cancel
//               </Button>
//             </>
//           ) : (
//             <>
//               <p>
//                 <strong>Username:</strong> {profile?.username}
//               </p>
//               <p>
//                 <strong>Email:</strong> {profile?.email}
//               </p>
//               <p>
//                 <strong>First Name:</strong> {profile?.first_name || "N/A"}
//               </p>
//               <p>
//                 <strong>Last Name:</strong> {profile?.last_name || "N/A"}
//               </p>
//               <p>
//                 <strong>Date Joined:</strong> {new Date(profile?.date_joined).toLocaleDateString()}
//               </p>
//               <Button variant="primary" onClick={handleEditToggle} className="me-2">
//                 EDIT Profile
//               </Button>
//               <Button
//                 variant="danger"
//                 onClick={() => setShowDeleteModal(true)}
//               >
//                 DELETE Account
//               </Button>
//             </>
//           )}
//         </Card.Body>
//       </Card>

//       <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Confirm Account Deletion</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="danger" onClick={confirmDelete}>
//             Confirm
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Card, Button, Modal } from "react-bootstrap";

const Profile = () => {
  const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
  const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchUserProfile = async () => {
    if (!authToken || !userId) {
      setError("Missing authentication credentials. Please log in again.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setProfile(response.data);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.response?.data?.detail || "Failed to fetch user data.");
    }
  };

  const handleDeleteAccount = async () => {
    if (!authToken || !userId) {
      setError("Missing authentication credentials. Please log in again.");
      return;
    }

    try {
      const propertiesResponse = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user-properties/${userId}/`,
        { headers: { Authorization: `Token ${authToken}` } }
      );

      // if (propertiesResponse.data.length > 0) {
      //   setError("You have properties in your account. Please delete them first.");
      //   return;
      // }

      setShowDeleteModal(true);
    } catch (err) {
      console.error("Error checking user properties:", err.response || err);
      setError("An error occurred while checking your properties.");
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        { headers: { Authorization: `Token ${authToken}` } }
      );

      localStorage.clear();
      setShowDeleteModal(false);
      alert("Your account has been deleted.");
      navigate("/");
    } catch (err) {
      console.error("Error during account deletion:", err.response || err);
      setError("An error occurred while deleting your account.");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [authToken, userId]);

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          {profile ? (
            <>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>First Name:</strong> {profile.first_name || "N/A"}</p>
              <p><strong>Last Name:</strong> {profile.last_name || "N/A"}</p>
              <p><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
              <Button variant="danger" onClick={handleDeleteAccount}>
                DELETE Account
              </Button>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </Card.Body>
      </Card>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Account Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;
