import React, { Component } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../service/axios.service';
import { DashboardContext } from '../../context/dashboard.context'

export class Login extends Component {
    static contextType = DashboardContext;
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            type: null
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

            if (this.state.email == 'admin@admin.com' && this.state.password == 'admin') {
                localStorage.setItem('UserType', 'Admin');

                alert('Successfully loged in');
                window.location = '/dashboard';

            } else {
                this.context.getExternalUserByemail(this.state.email).then(internalUserElem => {
                    console.log(internalUserElem);
                    this.context.loginUser = this.state.email;
                    if (internalUserElem.password == this.state.password) {
                        alert('Successfully loged in');
                        localStorage.setItem('User', internalUserElem.name);
                        localStorage.setItem('UserType', internalUserElem.type);
                        window.location = '/';

                    } else {
                        alert('Invalid Credentials')
                    }
                }).catch(err => {
                    alert('Invalid credentials')
                });
            }
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
                            <h3>Login</h3>
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
                            <Link to="/register" style={{ textDecoration: 'none', color: 'black', marginBottom: '40%' }}>No Account? Register Now!</Link>
                        </div>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Login
