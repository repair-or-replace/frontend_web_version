import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { Container, Alert, Card, Button, Modal, Form } from "react-bootstrap";
import { logOut } from '../redux/userSlice'; 


const Profile = () => {
  const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
  const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchUserProfile = async () => {
    if (!authToken || !userId) {
      setError("Auth token or user ID is missing.");
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`, {
        headers: { Authorization: `Token ${authToken}` },
      });
      setProfile(response.data);
      setFormData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch user data.");
    }
  };

  const handleEditToggle = () => {
    setError(""); 
    setEditMode((prev) => !prev);
    if (!editMode) setFormData(profile); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    setError(""); 
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        formData,
        { headers: { Authorization: `Token ${authToken}` } }
      );
      setProfile(response.data);
      setEditMode(false);
    } catch (err) {
      setError("Failed to save changes.");
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
  
      // Account deletion was successful, now perform logout
      localStorage.removeItem("authToken");  // Clear local storage
      dispatch(logOut());  // Use Redux action to update state
      navigate("/");  // Navigate to the homepage or login page after logout
      alert("Your account has been deleted.");
  
      setShowDeleteModal(false);  // Close the modal
    } catch (err) {
      console.error("Error during account deletion:", err.response || err);
      setError("An error occurred while deleting your account.");
    }
  };
  

  useEffect(() => {
    fetchUserProfile();
  }, [authToken, userId]);

  useEffect(() => {
    const handleClickOutside = () => {
      setError(""); 
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      <Card>
        <Card.Header>User Profile</Card.Header>
        <Card.Body>
          {editMode ? (
            <>
              <Form>
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={formData.first_name || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={formData.last_name || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
              <Button style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}} onClick={handleSave} className="mt-3">
                Save
              </Button>
              <Button style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}} onClick={handleEditToggle} className="mt-3 ms-2">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <p>
                <strong>Username:</strong> {profile?.username}
              </p>
              <p>
                <strong>Email:</strong> {profile?.email}
              </p>
              <p>
                <strong>First Name:</strong> {profile?.first_name || "N/A"}
              </p>
              <p>
                <strong>Last Name:</strong> {profile?.last_name || "N/A"}
              </p>
              <p>
                <strong>Date Joined:</strong> {new Date(profile?.date_joined).toLocaleDateString()}
              </p>
              <Button
                onClick={handleEditToggle}
                className="me-3"
                style={{
                  color: "whitesmoke",
                  backgroundColor: "#84b474",
                  border: "none",
                  padding: "10px",
                }}
              >
                Edit Profile
              </Button>
              <Button
              style={{
                color: "whitesmoke",
                backgroundColor: "#84b474",
                border: "none",
                padding: "10px",
              }}                
              onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </Button>
            </>
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
