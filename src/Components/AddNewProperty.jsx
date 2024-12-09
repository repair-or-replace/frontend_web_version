import React, { useState } from "react";
import { Form, Button, Container, Alert, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const AddNewProperty = () => {
  const [formData, setFormData] = useState({
    address_line_1: "",
    address_line_2: "",
    city: "",
    state: "",
    zipcode: "",
    home_type: "single",
    year_built: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const token = useSelector((state) => state.user.authToken); // Get the user's auth token
  const userId = useSelector((state) => state.user.userId); // Get the user ID
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/properties/`,
        {
          ...formData,
          user: userId, // Ensure the property is associated with the correct user
        },
        {
          headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Property added:", response.data);
      setSuccess(true);
      setTimeout(() => navigate("/properties"), 1500); // Redirect to properties page after success
    } catch (err) {
      console.error("Error adding property:", err.response?.data || err.message);
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-left mb-4">Add New Property</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Property added successfully!</Alert>}
      <Row className="justify-content-align-left">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Street Address"
                name="address_line_1"
                value={formData.address_line_1}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Unit # (if applicable)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Unit #"
                name="address_line_2"
                value={formData.address_line_2}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Zip Code"
                name="zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                name="home_type"
                value={formData.home_type}
                onChange={handleChange}
              >
                <option value="single">Single Family</option>
                <option value="multi">Multi Family</option>
                <option value="condo">Condo</option>
                <option value="apartment">Apartment</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Year Built</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Year Built"
                name="year_built"
                value={formData.year_built}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button style={{ color: "whitesmoke", backgroundColor: "#84b474", border: "none"}} type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewProperty;
  
  
// import { Component } from 'react';
// import axios from 'axios';
// import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';


// class NewProperty extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             addressLine1: '',
//             addressLine2: '',
//             city: '',
//             state: '',
//             zipcode: '',
//             homeType: '',
//             yearBuilt: '',
//             errors: {},
//             isLoading: false,
//             error: null,
//             showSuccessModal: false
//         };
//     }

//     handleSubmit = (event) => {
//         event.preventDefault();
//         const errors = this.validateForm();
//         if (Object.keys(errors).length === 0) {

//             this.setState({ isLoading: true, error: null })


//             const applianceData = {
//                 address_line_1: this.state.addressLine1.trim(),
//                 address_line_2: this.state.addressLine2.trim(),
//                 city: this.state.city.trim(),
//                 state: this.state.state.trim(),
//                 zip: this.state.zipcode.trim(),
//                 home_type: this.state.homeType.trim(),
//                 year_built: this.state.yearBuilt.trim(),
//             };

//             axios.post('${import.meta.env.VITE_BACKEND_URL}/api/properties/', applianceData,
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                   Authorization: `Token ${token}`
//                 },
//               }
//             )
//                 .then(() => {
//                     this.setState({showSuccessModal: true,
//                     isLoading: false    
//                 })
                    

//                 })
//                 .catch(error => {
//                     console.error('Error submitting form:', error);
//                     this.setState({ error: error.toString(), isLoading: false });
//                 });
//         } else {
//             this.setState({ errors });
//         }
//     };

//     validateForm = () => {
//         const { addressLine1, addressLine2, city, state, zipcode, homeType, yearBuilt } = this.state;
//         const errors = {};
//         if (!addressLine1) errors.addressLine1 = 'Must enter a brand name';
//         if (!city) errors.city = 'Must enter city';
//         if (!state) errors.state = 'Must enter state';
//         if (!zipcode) errors.zipcode = 'Must enter zipcode';
//         if (!homeType) errors.homeType = 'Must enter home type';
//         if (!yearBuilt) errors.yearBuilt = 'Must enter year built';
//         return errors;
//     };

//     handleChange = (event) => {
//         const { name, value } = event.target;
//         this.setState({ [name]: value });
//     };

//     closeModal = () => {
//         this.setState({
//             showSuccessModal: false,
//             addressLine1: '',
//             addressLine2: '',
//             city: '',
//             state: '',
//             zipcode: '',
//             homeType: '',
//             yearBuilt: '',
//             errors: {},
//         });
//     };


//     render() {

//         const { addressLine1, addressLine2, city, state, zipcode, homeType, yearBuilt, isLoading, showSuccessModal, error, errors } = this.state;

//         return (
//             <Container>
//                 {isLoading && <Alert variant="info">Submitting Property Data...</Alert>}
//                 {error && <Alert variant="danger">Error Submitting Property: {error}</Alert>}

//                 <Form onSubmit={this.handleSubmit}>
//                     <h2 className="m-3">Add New Property</h2>
//                     <Form.Group controlId="formGroupStreetAddress">
//                         <Form.Label>
//                             Street Address
//                         </Form.Label>
//                         <Form.Control type="text" name="addressLine1" value={addressLine1} onChange={this.handleChange} />
//                         {errors.addressLine1 && <div style={{ color: 'red'}}>{errors.addressLine1}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupUnit">
//                         <Form.Label>
//                             Unit # (if applicable)
//                         </Form.Label>
//                         <Form.Control type="text" name="addressLine2" value={addressLine2} onChange={this.handleChange} />
//                         {errors.addressLine2 && <div style={{ color: 'red'}}>{errors.addressLine2}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupCity">
//                         <Form.Label>
//                             City
//                         </Form.Label>
//                         <Form.Control type="text" name="city" value={city} onChange={this.handleChange} />
//                         {errors.city && <div style={{ color: 'red'}}>{errors.city}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupState">
//                         <Form.Label>
//                             State
//                         </Form.Label>
//                         <Form.Control type="text" name="state" value={state} onChange={this.handleChange} />
//                         {errors.state && <div style={{ color: 'red'}}>{errors.state}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupZip">
//                         <Form.Label>
//                             Zip Code
//                         </Form.Label>
//                         <Form.Control type="text" name="zipcode" value={zipcode} onChange={this.handleChange} />
//                         {errors.zipcode && <div style={{ color: 'red'}}>{errors.zipcode}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupHomeType">
//                         <Form.Label>
//                             Property Type
//                         </Form.Label>
//                         <Form.Control type="text" name="homeType" value={homeType} onChange={this.handleChange} />
//                         {errors.homeType && <div style={{ color: 'red'}}>{errors.homeType}</div>}
//                     </Form.Group>

//                     <Form.Group controlId="formGroupYearBuilt">
//                         <Form.Label>
//                             Year Built
//                         </Form.Label>
//                         <Form.Control type="float" name="yearBuilt" value={yearBuilt} onChange={this.handleChange} />
//                         {errors.yearBuilt && <div style={{ color: 'red'}}>{errors.yearBuilt}</div>}
//                     </Form.Group>

//                     <Button className="mt-3" variant="primary" type="submit">Submit</Button>
//                 </Form>

//                 <Modal show={showSuccessModal} onHide={this.closeModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Your New Property was Added Succesfully!</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         Thank you!!
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={this.closeModal}>Close</Button>
//                     </Modal.Footer>
//                 </Modal>
                
//             </Container>
//         );
//     }
// };

// export default NewProperty;