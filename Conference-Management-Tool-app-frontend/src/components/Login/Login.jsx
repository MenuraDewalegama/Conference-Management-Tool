import React, { Component } from 'react'
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from '../../service/axios.service';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class Login extends Component {
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

            if (this.state.email == 'admin@admin.com' && this.state.password == 'admin') {
                alert('Successfully loged in');
                window.location = '/dashboard';

            } else {
                axios.get(`http://localhost:3000/login/${this.state.email}`)
                    .then(res => {
                        console.log(res);
                        if (res.data == this.state.password) {
                            toast.success('Login successfull!', {
                                position: 'top-right',
                                autoClose: 1000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                            setTimeout(function () { window.location = '/'; }, 1000);

                        } else {
                            toast.warning('Login Unsuccessfull!', {
                                position: 'top-right',
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    })
                    .catch(err => {
                        toast.warning('Login Unsuccessfull!', {
                            position: 'top-right',
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    });
            }
        } else {
            alert('Please Enter values');
        }
    };

    render() {
        return (
            <div>
                <Card border="dark" style={{ width: 'auto', height: 'auto', marginLeft: '40%', marginRight: '40%', marginTop: '5%', marginBottom: '10%', padding: '10px', backgroundColor: 'white' }}>
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
