// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Alert, Container, Card } from "react-bootstrap";

// const Profile = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState("");
//   const token = useSelector((state) => state.user.authToken); // 从 Redux 获取 token
//   const userId = useSelector((state) => state.user.userId); // 从 Redux 获取 user_id

//   useEffect(() => {
//     if (!token || !userId) {
//       setError("Missing authentication credentials.");
//       return;
//     }

//     const fetchUserProfile = async () => {
//       try {
//         const response = await axios.get(
//           `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
//           {
//             headers: {
//               Authorization: `Token ${token}`, // 确保使用正确的头部格式
//             },
//           }
//         );
//         setUserData(response.data);
//       } catch (err) {
//         console.error("Failed to fetch user data:", err.response || err);
//         setError("Failed to fetch user data.");
//       }
//     };

//     fetchUserProfile();
//   }, [token, userId]);

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   if (!userData) {
//     return (
//       <Container className="mt-5">
//         <p>Loading user data...</p>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Card>
//         <Card.Header>User Profile</Card.Header>
//         <Card.Body>
//           <p>
//             <strong>Username:</strong> {userData.username}
//           </p>
//           <p>
//             <strong>Email:</strong> {userData.email}
//           </p>
//           <p>
//             <strong>First Name:</strong> {userData.first_name || "N/A"}
//           </p>
//           <p>
//             <strong>Last Name:</strong> {userData.last_name || "N/A"}
//           </p>
//           <p>
//             <strong>Date Joined:</strong>{" "}
//             {new Date(userData.date_joined).toLocaleDateString()}
//           </p>
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Card } from "react-bootstrap";

const Profile = () => {
  // Retrieve token and user ID from Redux or localStorage
  const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
  const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  const fetchUserProfile = async () => {
    if (!authToken || !userId) {
      setError("Auth token or user ID is missing.");
      console.error("Missing authToken or userId.");
      return;
    }

    console.log("Fetching profile with token:", authToken); // Debugging

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
        {
          headers: {
            Authorization: `Token ${authToken}`, // Ensure header format
          },
        }
      );
      console.log("Profile data fetched:", response.data); // Debugging
      setProfile(response.data);
      setError(""); // Clear any errors
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(
        err.response?.data?.detail || "Failed to fetch user data."
      );
    }
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
    <Container className="mt-5">
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
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
