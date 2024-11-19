import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate} from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Properties from "./Components/Properties";
import Login from "./Components/Login";
import ViewAppliance from './Components/ViewAppliance';
import Homepage from './Components/Homepage';
import EditRepair from './Components/EditRepair';
import EditInvestment from './Components/EditInvestment';


function App() {
  const user = useSelector((state) => state.username); 
  const token = localStorage.getItem("authToken"); 

  return (
    <>
      {token ? <NavigationBar /> : null} {/* Show NavigationBar if logged in */}
      
      <Routes>
        {!token && <Route path="/login" element={<Login />} />}

        {token && (
          <>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/view-appliance/:id" element={<ViewAppliance />} />
            <Route path="/edit-repair/:repairId" element={<EditRepair />} />
            <Route path="/edit-investment/:investmentId" element={<EditInvestment />} />
            <Route path="/login" element={<Login />} />

          </>
        )}
      </Routes>
    </>
  );
}

export default App;


