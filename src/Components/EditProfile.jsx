import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Alert, Card, Button, Form } from "react-bootstrap";

const EditProfile = () => {
  const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
  const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(true); // Directly start in editing mode
  const [editData, setEditData] = useState({});

  const fetchUserProfile = async () => {
    if (!authToken || !userId) {
      setError("Auth token or user ID is missing.");
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      setProfile(response.data);
      setEditData(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to fetch user data.");
    }
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        editData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProfile(response.data);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update profile.");
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(profile);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [authToken, userId]);

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5 col-4">
      <Card>
        <Card.Header>Edit Profile</Card.Header>
        <Card.Body>
          {profile ? (
            isEditing ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={editData.username || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, username: e.target.value })
                    }
                    disabled
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={editData.email || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="first_name"
                    value={editData.first_name || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, first_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="last_name"
                    value={editData.last_name || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, last_name: e.target.value })
                    }
                  />
                </Form.Group>
                <Button style={{color: "whitesmoke", backgroundColor: "#84b474", border: "none"}} onClick={handleSaveClick}>
                  Save
                </Button>{" "}
                <Button  style={{color: "whitesmoke", backgroundColor: "#84b474", border: "none"}} onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <p>Profile saved successfully.</p>
            )
          ) : (
            <p>Loading profile...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default EditProfile;