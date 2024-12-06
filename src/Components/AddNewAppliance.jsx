import { Component } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Container, Modal, Row, Col } from 'react-bootstrap';

class NewAppliance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modelNumber: '',
            purchaseDate: '',
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
                model: this.state.modelNumber.trim(),
                purchase_date: this.state.purchaseDate.trim(),
            };

            axios.post('${import.meta.env.VITE_BACKEND_URL}/api/appliances/', applianceData)
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
        const { modelNumber, purchaseDate } = this.state;
        const errors = {};
        if (!modelNumber) errors.modelNumber = 'Must enter model number';
        if (!purchaseDate) errors.purchaseDate = 'Must enter date of purchase';
        return errors;
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    closeModal = () => {
        this.setState({
            showSuccessModal: false,
            modelNumber: '',
            purchaseDate: '',
            errors: {},
        });
    };


    render() {

        const { modelNumber, purchaseDate, isLoading, showSuccessModal, error, errors } = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting Product Data...</Alert>}
                {error && <Alert variant="danger">Error Submitting Product: {error}</Alert>}
                <Row className="justify-content-align-left">
                    <Col md={6}>
                    <Form onSubmit={this.handleSubmit}>
                        <h2 className="m-3">Enter New Product Details</h2>
                        <Form.Group controlId="formGroupModelNumber">
                            <Form.Label>
                                Appliance Model Number
                            </Form.Label>
                            <Form.Control type="text" name="modelNumber" value={modelNumber} onChange={this.handleChange} />
                            {errors.modelNumber && <div style={{ color: 'red'}}>{errors.modelNumber}</div>}
                        </Form.Group>

                        <Form.Group controlId="formGroupPurchaseDate">
                            <Form.Label>
                                Date of Purchase
                            </Form.Label>
                            <Form.Control type="float" name="purchaseDate" value={purchaseDate} onChange={this.handleChange} />
                            {errors.purchaseDate && <div style={{ color: 'red'}}>{errors.purchaseDate}</div>}
                        </Form.Group>

                        <Button className="mt-3" style={{ color: "whitesmoke", backgroundColor: "#84b474", border: "none"}} type="submit">Submit</Button>
                    </Form>

                    <Modal show={showSuccessModal} onHide={this.closeModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Your New Appliance was Added Successfully!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Thank you!!
                        </Modal.Body>
                        <Modal.Footer>
                            <Button style={{ color: "whitesmoke", backgroundColor: "#84b474", border: "none"}} onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default NewAppliance;