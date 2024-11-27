import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from "./Components/Navbar";
import Properties from "./Components/Properties";
import ViewAppliance from './Components/ViewAppliance';
import Homepage from './Components/Homepage';
import EditRepair from './Components/EditRepair';
import EditInvestment from './Components/EditInvestment';
import Appliances from "./Components/Appliances";
import EditAppliance from "./Components/EditAppliance";
import NewAppliance from "./Components/AddNewAppliance";
<<<<<<< HEAD
import NewProperty from "./Components/AddNewProperty";
import AddInvestment from "./Components/AddInvestment";
=======
import EditProperty from "./Components/EditProperty";
import AddNewProperty from "./Components/AddNewProperty"; // Import AddNewProperty
import Profile from "./Components/Profile";
import Register from "./Components/Register";
import LoginForm from "./Components/Login";
>>>>>>> 96a0b97f97ddc77bdcc9fc807d4147874f933114

function App() {
  const authToken = useSelector((state) => state.user.authToken); // Use Redux state
  const token = localStorage.getItem("authToken"); 

  return (
    <>
      <NavigationBar />

      <Routes>
        {/* Public routes */}
        {!authToken && <Route path="/" element={<Homepage />} />}
        {!authToken && <Route path="/login" element={<LoginForm />} />}
        {!authToken && <Route path="/signup" element={<Register />} />} {/* Add this */}

        {/* Private routes */}
        {authToken && (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="appliances" element={<Appliances />}/>
            <Route path="/add-new-property" element={<AddNewProperty />} />
            <Route path="/view-appliance/:id" element={<ViewAppliance />} />
            <Route path="/edit-appliance/:applianceId" element={<EditAppliance />} />
            <Route path="/newappliance" element={<NewAppliance />} />
<<<<<<< HEAD
            <Route path="/newproperty" element={<NewProperty />} />
            <Route path="/addinvestment" element={<AddInvestment />} />
=======
            <Route path="/edit-property/:propertyId" element={<EditProperty />} />
>>>>>>> 96a0b97f97ddc77bdcc9fc807d4147874f933114
            <Route path="/edit-repair/:repairId" element={<EditRepair />} />
            <Route path="/edit-investment/:investmentId" element={<EditInvestment />} />
            <Route path="/add-new-property" element={<AddNewProperty />} /> {/* New route */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Register />} />


          </>
        )}

        {/* Catch-all route */}
        <Route path="*" element={authToken ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
