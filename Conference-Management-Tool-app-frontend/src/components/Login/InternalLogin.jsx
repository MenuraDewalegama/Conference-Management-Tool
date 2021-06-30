import React, { Component } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../service/axios.service';
import { DashboardContext } from '../../context/dashboard.context'

export class InternalLogin extends Component {
    
    static contextType = DashboardContext;
 

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        // console.log(name, value);
    }


    onSubmit() {
        event.preventDefault();
        if (this.state.password != '' && this.state.email != '') {
                this.context.getInternalUserByemail(this.state.email).then(internalUserElem => {
                    console.log(internalUserElem);
                    if (internalUserElem.password == this.state.password) {
                        alert('Successfully loged in');
                        if (internalUserElem.type == 'Admin') {
                            window.location = '/dashboard';
                        } else if (internalUserElem.type == 'Editor') {
                            //should be edited
                            window.location = '/';
                        } else if (internalUserElem.type == 'Reviewer') {
                            window.location = '/review';
                        }
                        localStorage.setItem('User', internalUserElem.fullName);
                        localStorage.setItem('UserType', internalUserElem.type);
                        console.log(this.context.loginUser );
                    } else {
                        alert('Invalid Credentials')
                    }
                }).catch(err => {
                    alert('Invalid credentials')
                });

        } else {
            alert('Please Enter values');
        }
    };

    render() {
        return (
            <div>
                <Card border="dark" style={{ width: 'auto', height: 'auto', marginLeft: '40%', marginRight: '40%', marginTop: '10%', marginBottom: '10%', padding: '10px', backgroundColor: 'white' }}>
                    <div className="card-header card-header-primary card-header-icon">
                        <div className="card-icon">
                            <h3>Internal User Login</h3>
                        </div>
                    </div>

                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicName" style={{ padding: '15px' }}>
                            <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                            <Form.Control name="email"
                                required
                                type="email"
                                placeholder="Ex: examplemail.com"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicName" style={{ padding: '15px' }}>
                            <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                            <Form.Control name="password"
                                required
                                type="password"
                                placeholder="Enter your password here!"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>
                        <div style={{ marginTop: '5%', textAlign: 'center' }}>
                            <Button type="submit" variant="primary">Login</Button>
                            <br></br>

                        </div>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default InternalLogin
