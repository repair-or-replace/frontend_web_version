import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Properties from "./Components/Properties";

function App() {
  const user = useSelector( (state) => state.username)
  console.log("user: ", user);
  return (
    <>
      {user ? <NavigationBar /> : ""}
      <Routes>
        <Route path="/properties" element={<Properties />} />
      </Routes>
    </>
  )
}

export default App;
