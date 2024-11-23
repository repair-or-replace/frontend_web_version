import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal } from 'react-bootstrap';

class NewAppliance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            applianceBrand: '',
            yearPurchased: '',
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
                appliance_brand: this.state.applianceBrand.trim(),
                year_purchased: this.state.yearPurchased.trim(),
            };

            axios.post('https://repair-or-replace-back-end.onrender.com/api/appliances/', applianceData)
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
        const { applianceBrand, yearPurchased } = this.state;
        const errors = {};
        if (!applianceBrand) errors.applianceBrand = 'Must enter a brand name';
        if (!yearPurchased) errors.yearPurchased = 'Must enter year purchsed';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            applianceBrand: '',
            yearPurchased: '',
            errors: {},
        });
    };


    render() {

        const { applianceBrand, yearPurchased, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Product Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Product: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <h2 className="m-3">Enter New Product Details</h2>
                    <Form.Group controlId="formGroupBrandName">
                        <Form.Label>
                            Appliance Brand Name
                        </Form.Label>
                        <Form.Control type="text" name="applianceBrand" value={applianceBrand} onChange={this.handleChange} />
                        {errors.applianceBrand && <div style={{ color: 'red'}}>{errors.applianceBrand}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupYearPurchased">
                        <Form.Label>
                            Year of Purchase
                        </Form.Label>
                        <Form.Control type="float" name="yearPurchased" value={yearPurchased} onChange={this.handleChange} />
                        {errors.yearPurchased && <div style={{ color: 'red'}}>{errors.yearPurchased}</div>}
                    </Form.Group>

                    <Button className="mt-3" variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Your New Appliance was Added Successfully!</Modal.Title>
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

export default NewAppliance;
