import React, { Component } from 'react'
import { Card, Button, Form, Col, Raw, Image } from 'react-bootstrap';
import axios from 'axios';


const initialState = {
    email: '',
    name: '',
    subject: '',
    message: ''
}

export class ContactUs extends Component {

    constructor(props) {
        super(props);
        this.state = initialState;
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    // This method is to add a new message
    onSubmit(event) {
        event.preventDefault();
        let contactInfo = {
            email: this.state.email,
            name: this.state.name,
            subject: this.state.subject,
            message: this.state.message
        }
        axios.post('http://localhost:3000/contact', contactInfo)
            .then((result) => {
                console.log(result);
                alert("You have successfully place a message");
                window.location.reload();
            }).catch((err) => {
                alert(err)
            });
    }

    render() {
        return (
            <div className="container" >
                <div style={{ marginTop: '5%' }}>
                    <h1 style={{ textAlign: 'center' }}>Contact Us</h1>
                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="card bg-light">

                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">book</i>
                                        <h6></h6>
                                    </div>
                                </div>

                                <div className="p-5 card-body mb-3">

                                    <Form onSubmit={this.onSubmit}>

                                        <Form.Group controlId="formBasicName">
                                            <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                                            <Form.Control name="email"
                                                required
                                                type="email"
                                                value={this.state.email}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicName">
                                            <Form.Label style={{ color: 'black' }}>Name</Form.Label>
                                            <Form.Control name="name"
                                                required
                                                type="name"
                                                value={this.state.name}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSubject">
                                            <Form.Label style={{ color: 'black' }}>Subject</Form.Label>
                                            <Form.Control name="subject"
                                                required
                                                type="name"
                                                value={this.state.subject}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicMessage">
                                            <Form.Label style={{ color: 'black' }}>Message</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                name="message"
                                                required
                                                value={this.state.message}
                                                onChange={this.onChange}
                                            />
                                        </Form.Group>
                                        <Button type="submit" variant="primary" >Register</Button>

                                    </Form>

                                </div>
                            </div>
                        </div>

                        <div className='col-md-6' style={{ marginTop: '5%' }}>
                            <img src="https://crove.app/wp-content/uploads/2021/04/undraw_contact_us_15o2-2.png" style={{ height: '60%', width: '100%' }}></img>
                            <h6 style={{ margin: '5%' }}>Colombo 07</h6>
                            <h6 style={{ margin: '5%' }}>T : 011 2222 555</h6>
                            <h6 style={{ margin: '5%' }}>E : info@code4.com</h6>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default ContactUs
