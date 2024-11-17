import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Properties from "./Components/Properties";
import Login from "./Components/Login"; 


function App() {
  const user = useSelector((state) => state.username); // Assuming username is stored in Redux state
  const token = localStorage.getItem("authToken"); // Check if a token exists in localStorage

  return (
    <>
      {token ? <NavigationBar /> : ""} {/* Show NavigationBar if logged in */}
      <Routes>
        {!token ? (
          <Route path="/" element={<Login />} /> // Redirect to Login if no token
        ) : (
          <>
            <Route path="/properties" element={<Properties />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
