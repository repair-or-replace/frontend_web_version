// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";
// import { Container, Alert, Card, Button, Form } from "react-bootstrap";

// const Profile = () => {
//   const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
//   const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");

//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState("");
//   const [isEditing, setIsEditing] = useState(false); // 是否处于编辑模式
//   const [editData, setEditData] = useState({}); // 临时存储编辑数据

//   const fetchUserProfile = async () => {
//     if (!authToken || !userId) {
//       setError("Auth token or user ID is missing.");
//       return;
//     }

//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
//         {
//           headers: {
//             Authorization: `Token ${authToken}`,
//           },
//         }
//       );
//       setProfile(response.data);
//       setEditData(response.data); // 初始化编辑数据
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.detail || "Failed to fetch user data.");
//     }
//   };

//   const handleEditClick = () => {
//     setIsEditing(true); // 进入编辑模式
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false); // 退出编辑模式
//     setEditData(profile); // 恢复原始数据
//   };

//   const handleSaveClick = async () => {
//     try {
//       const response = await axios.put(
//         `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`,
//         editData,
//         {
//           headers: {
//             Authorization: `Token ${authToken}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       setProfile(response.data); // 更新本地数据
//       setIsEditing(false); // 退出编辑模式
//     } catch (err) {
//       setError(err.response?.data?.detail || "Failed to update profile.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditData({ ...editData, [name]: value });
//   };

//   useEffect(() => {
//     fetchUserProfile();
//   }, [authToken, userId]);

//   if (error) {
//     return (
//       <Container className="mt-5">
//         <Alert variant="danger">{error}</Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container className="mt-5">
//       <Card>
//         <Card.Header>User Profile</Card.Header>
//         <Card.Body>
//           {profile ? (
//             isEditing ? (
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Username</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={editData.username || ""}
//                     onChange={handleChange}
//                     disabled // Username通常不允许修改
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={editData.email || ""}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>First Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="first_name"
//                     value={editData.first_name || ""}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Last Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="last_name"
//                     value={editData.last_name || ""}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//                 <Button variant="success" onClick={handleSaveClick}>
//                   Save
//                 </Button>{" "}
//                 <Button variant="secondary" onClick={handleCancelClick}>
//                   Cancel
//                 </Button>
//               </Form>
//             ) : (
//               <>
//                 <p><strong>Username:</strong> {profile.username}</p>
//                 <p><strong>Email:</strong> {profile.email}</p>
//                 <p><strong>First Name:</strong> {profile.first_name || "N/A"}</p>
//                 <p><strong>Last Name:</strong> {profile.last_name || "N/A"}</p>
//                 <p><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
//                 <Button variant="primary" onClick={handleEditClick}>
//                   Edit Profile
//                 </Button>
//               </>
//             )
//           ) : (
//             <p>Loading profile...</p>
//           )}
//         </Card.Body>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Container, Alert, Card, Button, Form } from "react-bootstrap";
import { logOut } from "../redux/userSlice"; // Redux action for logout
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const authToken = useSelector((state) => state.user.authToken) || localStorage.getItem("authToken");
  const userId = useSelector((state) => state.user.user_id) || localStorage.getItem("userId");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEditClick = () => setIsEditing(true);
  const handleCancelClick = () => {
    setIsEditing(false);
    setEditData(profile);
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
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to update profile.");
    }
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm("你真的要删除账户吗?");
    if (!confirmDelete) return;

    try {
      // Check if user has properties
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/properties/`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );

      if (response.data.length > 0) {
        alert("您有未处理的财产，请先处理财产问题再删除账户。");
        return;
      }

      // No properties, proceed to delete account
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      });

      alert("账户已成功删除。");
      dispatch(logOut());
      localStorage.clear();
      navigate("/login");
    } catch (err) {
      console.error("Failed to delete account:", err);
      setError(err.response?.data?.detail || "Failed to delete account.");
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
                <Button variant="success" onClick={handleSaveClick}>
                  Save
                </Button>{" "}
                <Button variant="secondary" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <>
                <p><strong>Username:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>First Name:</strong> {profile.first_name || "N/A"}</p>
                <p><strong>Last Name:</strong> {profile.last_name || "N/A"}</p>
                <p><strong>Date Joined:</strong> {new Date(profile.date_joined).toLocaleDateString()}</p>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" onClick={handleEditClick}>
                    Edit Profile
                  </Button>
                  <Button variant="danger" onClick={handleDeleteClick}>
                    DELETE Account
                  </Button>
                </div>
              </>
            )
          ) : (
            <p>Loading profile...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
