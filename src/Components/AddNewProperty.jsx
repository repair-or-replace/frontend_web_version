import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';


class NewProperty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            homeType: '',
            yearBuilt: '',
            errors: {},
            isLoading: false,
            error: null,
            showSuccessModal: false
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {

            this.setState({ isLoading: true, error: null })


            const applianceData = {
                address_line_1: this.state.addressLine1.trim(),
                address_line_2: this.state.addressLine2.trim(),
                city: this.state.city.trim(),
                state: this.state.state.trim(),
                zip: this.state.zipcode.trim(),
                home_type: this.state.homeType.trim(),
                year_built: this.state.yearBuilt.trim(),
            };

            axios.post('https://repair-or-replace-back-end.onrender.com/api/properties/', applianceData,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Token ${token}`
                },
              }
            )
                .then(() => {
                    this.setState({showSuccessModal: true,
                    isLoading: false    
                })
                    

                })
                .catch(error => {
                    console.error('Error submitting form:', error);
                    this.setState({ error: error.toString(), isLoading: false });
                });
        } else {
            this.setState({ errors });
        }
    };

    validateForm = () => {
        const { addressLine1, addressLine2, city, state, zipcode, homeType, yearBuilt } = this.state;
        const errors = {};
        if (!addressLine1) errors.addressLine1 = 'Must enter a brand name';
        if (!city) errors.city = 'Must enter city';
        if (!state) errors.state = 'Must enter state';
        if (!zipcode) errors.zipcode = 'Must enter zipcode';
        if (!homeType) errors.homeType = 'Must enter home type';
        if (!yearBuilt) errors.yearBuilt = 'Must enter year built';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            zipcode: '',
            homeType: '',
            yearBuilt: '',
            errors: {},
        });
    };


    render() {

        const { addressLine1, addressLine2, city, state, zipcode, homeType, yearBuilt, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Property Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Property: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <h2 className="m-3">Add New Property</h2>
                    <Form.Group controlId="formGroupStreetAddress">
                        <Form.Label>
                            Street Address
                        </Form.Label>
                        <Form.Control type="text" name="addressLine1" value={addressLine1} onChange={this.handleChange} />
                        {errors.addressLine1 && <div style={{ color: 'red'}}>{errors.addressLine1}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupUnit">
                        <Form.Label>
                            Unit # (if applicable)
                        </Form.Label>
                        <Form.Control type="text" name="addressLine2" value={addressLine2} onChange={this.handleChange} />
                        {errors.addressLine2 && <div style={{ color: 'red'}}>{errors.addressLine2}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupCity">
                        <Form.Label>
                            City
                        </Form.Label>
                        <Form.Control type="text" name="city" value={city} onChange={this.handleChange} />
                        {errors.city && <div style={{ color: 'red'}}>{errors.city}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupState">
                        <Form.Label>
                            State
                        </Form.Label>
                        <Form.Control type="text" name="state" value={state} onChange={this.handleChange} />
                        {errors.state && <div style={{ color: 'red'}}>{errors.state}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupZip">
                        <Form.Label>
                            Zip Code
                        </Form.Label>
                        <Form.Control type="text" name="zipcode" value={zipcode} onChange={this.handleChange} />
                        {errors.zipcode && <div style={{ color: 'red'}}>{errors.zipcode}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupHomeType">
                        <Form.Label>
                            Property Type
                        </Form.Label>
                        <Form.Control type="text" name="homeType" value={homeType} onChange={this.handleChange} />
                        {errors.homeType && <div style={{ color: 'red'}}>{errors.homeType}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupYearBuilt">
                        <Form.Label>
                            Year Built
                        </Form.Label>
                        <Form.Control type="float" name="yearBuilt" value={yearBuilt} onChange={this.handleChange} />
                        {errors.yearBuilt && <div style={{ color: 'red'}}>{errors.yearBuilt}</div>}
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your New Property was Added Succesfully!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Thank you!!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
                
            </Container>
        );
    }
};

export default NewProperty;