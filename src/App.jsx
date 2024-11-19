import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Properties from "./Components/Properties";
import Homepage from "./Components/Homepage";
import Appliances from "./Components/Appliances";

function App() {
  const user = useSelector( (state) => state.user.authToken)
  console.log("user: ", user);
  return (
    <>
      {user ? <NavigationBar /> : ""}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="appliances" element={<Appliances />}/>
      </Routes>
    </>
  )
}

export default App;
