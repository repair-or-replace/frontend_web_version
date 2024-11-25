import axios from "axios";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch } from "react-redux"; 
import { logIn } from "../redux/userSlice"; 
import { useNavigate, useLocation } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  const location = useLocation();

  // 获取用户尝试访问的路径（默认为 "/"）
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/login/`, {
        username,
        password,
      });

      const { token, user_id } = response.data;
      console.log("Login successful. Data received:", response.data);

      // 更新 Redux 状态
      dispatch(logIn({ username, token, user_id }));

      // 清除错误信息
      setError("");

      // 跳转到用户之前尝试访问的页面
      navigate(from, { replace: true });
    } catch (error) {
      // 显示错误信息
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      console.error("Error during login:", errorMessage);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="col-md-4">
        <div className="card shadow-lg" style={{ backgroundColor: "#ffffff" }}>
          <div className="card-body">
            <h3 className="text-center mb-4" style={{ color: "#84b474" }}>Login</h3>
            {error && <div className="alert alert-danger">{error}</div>} {/* 显示错误信息 */}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"} // Toggle between password and text
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)} // Toggle the password visibility
                    style={{ backgroundColor: "#84b474", borderColor: "#84b474" }}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-success w-100" style={{ backgroundColor: "#84b474", borderColor: "#84b474" }}>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
