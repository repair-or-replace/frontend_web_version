import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { logIn } from "../redux/userSlice";
import { ProgressBar, Alert } from "react-bootstrap";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    let intervalId;
    if (loading) {
      intervalId = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress < 100) {
            return prevProgress + 1; // Increase progress by 1% every second
          }
          clearInterval(intervalId);
          return prevProgress;
        });
      }, 1000); // Update every 1000 milliseconds (1 second)
    }
    return () => clearInterval(intervalId);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setProgress(0); // Reset progress when starting the login process

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login/`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user_id, username } = response.data;

      dispatch(logIn({ username, token, user_id }));
      setShowSuccessAlert(true);
      setTimeout(() => {
        setShowSuccessAlert(false);
        navigate("/"); // Redirect after showing success message
      }, 2000);
    } catch (error) {
      console.error("Error during login:", error.response?.data || error.message);
      setError("Invalid username or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-md-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="text-center mb-4" style={{ color: "#84b474" }}>Login</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            {showSuccessAlert && <Alert variant="success">Login successful!</Alert>}
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button type="button" className="btn btn-link" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <button
                type="submit"
                className="btn w-100 mb-3"
                style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}}
              >
                Login
              </button>
            </form>

            {!loading && (
              <div className="text-center">
                <p>Don’t have an account?</p>
                <button
                  type="button"
                  className="btn btn-outline-custom w-100"
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
