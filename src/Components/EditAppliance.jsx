import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; 
import 'bootstrap/dist/css/bootstrap.min.css';

const EditAppliance = () => {
  const token = useSelector((state) => state.user.authToken);
  const { applianceId } = useParams(); //  applianceId from URL route
  const navigate = useNavigate();   //need for redirect back to appliance after update
  const [appliance, setAppliance] = useState(null);
  const [purchaseDate, setPurchaseDate] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/appliances/${applianceId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    })
      .then((response) => {
        setAppliance(response.data);
        setPurchaseDate(response.data.purchase_date);
        setStatus(response.data.current_status);
        setLoading(false);
      })
      .catch(() => {
        setError('Error fetching appliance data');
        setLoading(false);
      });
  }, [applianceId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      purchase_date: purchaseDate,
      current_status: status,
      property: appliance.property,
      user: appliance.user,
    };

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/appliances/${applianceId}/`, updatedData, {
        headers: {
          Authorization: `Token ${token}`, 
        },
      });
      alert('Appliance updated successfully!'); // success message
      navigate("/appliances", { state: { propertyId: appliance.property }}); // redirect to appliances and passing propertyId
    } catch {
      setError('Error updating appliance or redirect failed');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          <img
            src={appliance.product_image}
            alt={`${appliance.brand} ${appliance.model}`}
            className="img-fluid mb-2"
            style={{ maxWidth: "300px", objectFit: "contain" }}
          />
          <h5>{appliance.brand}</h5>
          <p>{appliance.model}</p>
        </div>

        {/* form to the right of img */}
        <div className="col-md-8">
          <form onSubmit={handleSubmit} className="needs-validation">
            <div className="mb-3">
              <label htmlFor="purchaseDate" className="form-label">Purchase Date</label>
              <input
                type="date"
                id="purchaseDate"
                className="form-control"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select
                id="status"
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="working">Working</option>
                <option value="needs repair">Needs Repair</option>
                <option value="broken">Broken</option>
                <option value="replaced">Replaced</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{color: "whitesmoke",backgroundColor: "#84b474", border: "none",}}>Update Appliance</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAppliance;
