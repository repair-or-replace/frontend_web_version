// import React, { useState } from "react";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { logIn } from "../redux/userSlice";

// const LoginForm = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
//         formData,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       const { token, user_id, username } = response.data;

//       // Dispatch login action to Redux
//       dispatch(logIn({ username, token, user_id }));

//       // Redirect to homepage or previously accessed page
//       navigate("/");
//     } catch (error) {
//       console.error("Error during login:", error.response?.data || error.message);
//       setError("Invalid username or password. Please try again.");
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/signup"); // Navigate to the registration page
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <div className="col-md-4">
//         <div className="card shadow-lg">
//           <div className="card-body">
//             <h3 className="text-center mb-4" style={{ color: "#84b474" }}>
//               Login
//             </h3>
//             {error && <div className="alert alert-danger">{error}</div>}
//             <form onSubmit={handleSubmit}>
//               <div className="mb-3">
//                 <label htmlFor="username" className="form-label">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   className="form-control"
//                   value={formData.username}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="mb-3">
//                 <label htmlFor="password" className="form-label">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="form-control"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <button
//                 type="submit"
//                 className="btn btn-success w-100 mb-3"
//                 style={{ backgroundColor: "#84b474" }}
//               >
//                 Login
//               </button>
//             </form>
//             <div className="text-center">
//               <p>Don’t have an account?</p>
//               <button
//                 type="button"
//                 className="btn btn-outline-primary w-100"
//                 onClick={handleSignUp}
//               >
//                 Sign Up
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


import React, { useState, useEffect } from 'react';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (loading) {
      // Start a timer to update progress
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 1;  // Increase by 5% each time
          if (newProgress === 100) {
            clearInterval(interval);  // Stop the timer when reaching 100%
            setTimeout(() => {
              setLoading(false);  // Stop loading after a brief moment
              console.log('Loading completed!'); // Log completion
            }, 1500); // Delay before stopping the load
          }
          return newProgress;  // Update progress value
        });
      }, 1000); // Slower update rate, every second

      return () => {
        clearInterval(interval);  // Cleanup the timer
      };
    }
  }, [loading]);

  // Assume this is triggered by a login attempt
  const handleLogin = () => {
    setLoading(true);
    setProgress(0); // Reset progress on new login
  };

  return (
    <div>
      <button onClick={handleLogin}>Start Login</button>
      {loading && (
        <div>
          <div>Loading... {progress}%</div>
          <progress value={progress} max="100"></progress>
        </div>
      )}
    </div>
  );
};

export default LoginForm;

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="
