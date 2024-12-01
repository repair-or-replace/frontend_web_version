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


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { logIn } from "../redux/userSlice";
import { ProgressBar } from "react-bootstrap";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const updateProgress = () => {
    setProgress((prevProgress) => {
      if (prevProgress < 100) {
        return prevProgress + 1;
      }
      clearInterval(intervalId);
      return prevProgress;
    });
  };

  let intervalId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    intervalId = setInterval(updateProgress, 1000); // Update the progress every second

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user_id, username } = response.data;

      dispatch(logIn({ username, token, user_id }));
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
      clearInterval(intervalId);
      setProgress(0);
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalId); // Cleanup interval on component unmount
    };
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-md-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="text-center mb-4" style={{ color: "#84b474" }}>Login</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            {loading && <ProgressBar now={progress} label={`${progress}%`} />}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-success w-100 mb-3"
                style={{ backgroundColor: "#84b474" }}
              >
                Login
              </button>
            </form>
            {!loading && (
              <div className="text-center">
                <p>Don’t have an account?</p>
                <button
                  type="button"
                  className="btn btn-outline-primary w-100"
                  onClick={handleSignUp}
                >
                  Sign Up
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
