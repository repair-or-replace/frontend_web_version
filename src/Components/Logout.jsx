import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { logOut } from "../redux/userSlice"; // Import the logOut action
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the auth token from localStorage
    localStorage.removeItem("authToken");

    // Dispatch the logOut action to clear user info from Redux
    dispatch(logOut());

    navigate("/login");
  }, [dispatch, navigate]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h3>Logging you out...</h3>
      </div>
    </div>
  );
};

export default Logout;
