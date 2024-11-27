import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";

const EditProperty = () => {
  const { propertyId } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.authToken);
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);


  const [propertyDetails, setPropertyDetails] = useState({
    id: propertyId,
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zipcode: "",
    home_type: "",
    year_built: "",
    user_uploaded_image: "",
    default_image: "",
    user_id: "",
  });
  const [error, setError] = useState("");

  const storedToken = token || localStorage.getItem("token");

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        if (!storedToken) {
          console.error("No token found! Redirecting to login...");
          navigate("/login");
          return;
        }

        const response = await axios.get(
          `https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}/`,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Token ${storedToken}`,
            },
          }
        );

        setPropertyDetails(response.data);
      } catch (error) {
        console.error(
          "Error fetching property details:",
          error.response || error.message
        );
        setError("Failed to load property details. Please try again.");
      }
    };

    fetchPropertyDetails();
  }, [propertyId, storedToken, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPropertyDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!storedToken) {
        console.error("No token found! Redirecting to login...");
        navigate("/login");
        return;
      }

      const formData = new FormData();
        formData.append("address_line_1", propertyDetails.address_line_1);
        formData.append("address_line_2", propertyDetails.address_line_2);
        formData.append("city", propertyDetails.city);
        formData.append("state", propertyDetails.state);
        formData.append("zipcode", propertyDetails.zipcode.toString());
        formData.append("home_type",propertyDetails.home_type);
        formData.append("year_built", parseInt(propertyDetails.year_built, 10));
        formData.append("user", userId);  


        const defaultImage = "/frontend_web_version/src/assets/default_home_pic.jpeg"; 
        formData.append("default_image", defaultImage);

  if (propertyDetails.user_uploaded_image) {
        formData.append("user_uploaded_image", propertyDetails.user_uploaded_image);
      }
      const response = await axios.put(
        `https://repair-or-replace-back-end.onrender.com/api/properties/${propertyId}/`,
        formData,
        {
          headers: {
            Authorization: `Token ${storedToken}`,
          },
        }
      );

      console.log("property updated successfully:", response.data);
      navigate(`/properties`);
    } catch (error) {
      console.error(
        "Error updating property details:",
        error.response || error.message
      );
      setError(
        error.response?.data?.message ||
          "Failed to update property."
      );
    }
  };

  if (!propertyDetails) {
    return <p>Loading...</p>;
  }

  const homeType = [
    {value:'single', label:'Single Family'},
    {value:'multi', label:'Multi Family'},
    {value:'condo', label:'Condo'},
    {value: 'apartment', label: 'Apartment'},
    {value: 'other', label: 'Other'}
  ]

  return (
    <Container>
      <h2>Edit Property</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="address_line_1" className="mb-3">
          <Form.Label>Address Line 1</Form.Label>
          <Form.Control
            type="text"
            name="address_line_1"
            value={propertyDetails.address_line_1}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address_line_2" className="mb-3">
          <Form.Label>Address Line 2</Form.Label>
          <Form.Control
            type="text"
            name="address_line_2"
            value={propertyDetails.address_line_2}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={propertyDetails.city}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="state" className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={propertyDetails.state}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="zipcode" className="mb-3">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            name="zipcode"
            value={propertyDetails.zipcode} 
            onChange={handleChange}
            required
          />
        </Form.Group>

    

        <Form.Group controlId="home_type" className="mb-3">
          <Form.Label>Home Type</Form.Label>
          <Form.Control
            as="select"
            name="home_type"
            value={propertyDetails.home_type} 
            onChange={handleChange}
            required
          >
            {homeType.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
            ))}
          </Form.Control>

      </Form.Group>

        <Form.Group controlId="year_built" className="mb-3">
          <Form.Label>Year Built</Form.Label>
          <Form.Control
            type="number"
            name="year_built"
            value={propertyDetails.year_built} 
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              name="user_uploaded_image"
              onChange={(event) => {
                const file = event.target.files[0]; 
                setPropertyDetails((prevState) => ({
                  ...prevState,
                  user_uploaded_image: file, 
                }));
              }}
            />
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Property
        </Button>
        <Button
          variant="secondary"
          className="ms-2"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditProperty;
