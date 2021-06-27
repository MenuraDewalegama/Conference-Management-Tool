/*
@author : Ssachintha de Zoysa
@date : 27/05/2021
*/
import React from 'react';
import { Card, Button, Form, Col, Raw } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ExternalUserContext } from '../../context/externalUser.context';
import axios from '../../service/axios.service';


export default class Register extends React.Component {
    // static contextType = ExternalUserContext;

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            name: null,
            contactNo: null,
            password: null,
            password2: null,
            type: 'ATTENDEE',
            activityType: null,
            category: null,
            activityInformation: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

   onSubmit(event) {
    event.preventDefault();

        console.log('Submit called!');
        // console.log(this.state);
        const { password } = this.state;

        const externalUserObj =  {
            email : this.state.email,
            name: this.state.name,
            contactNo: this.state.contactNo,
            password: this.state.password,
            type: this.state.type,
            activityType: this.state.activityType,
            category: this.state.activityType,
            activityInformation: this.state.activityInformation,
        };

       
        axios.post('http://localhost:3000/externaluser/', externalUserObj)
        .then(res => {
            alert('Successfully added');
            console.log(res);
            window.location.reload();

        })
        .catch(err => {
            alert(err.message)
        });

  
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        // console.log(name, value);
    }



    /** Set image file to the component state when user upload a image file.
    * @param event */
    onChangeInternalUserFormFile(event) {
        const imageFile = event.target.files[0];
        this.setState({ imageFile: (imageFile) ? imageFile : null });
    }

    /* Remove Image button process - we just remove the imagePath. */
    removeImagePath() {
        this.setState({
            imagePath: ''
        });
    }

 


    render() {
        // console.log(this.context);
        return (

            <Card style={{ width: 'auto', height: 'auto', marginLeft: '10%', marginRight: '10%', marginTop: '5%' }}>
                <div className="container">
                    <br />
                    <h1 style={{ textAlign: 'center' }}>Register Here</h1>

                    <br />
                    <br />
                    <Form onSubmit={this.onSubmit}>
                        <Form.Group controlId="formBasicName">
                            <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                            <Form.Control name="email"
                                type="email"
                                placeholder="Ex: examplemail.com"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label style={{ color: 'black' }}>Name</Form.Label>
                            <Form.Control name="name"
                                type="name"
                                placeholder="Ex : Jhon Carter"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                                <Form.Control name="password"
                                    type="password"
                                    placeholder="Should have minimum of 8 characters"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label style={{ color: 'black' }}>Re Enter the Password</Form.Label>
                                <Form.Control name="password2"
                                    type="password"
                                    placeholder="Re type your password"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>


                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicContactNo">
                                <Form.Label style={{ color: 'black' }}>Contact No</Form.Label>
                                <Form.Control type="name"
                                    name="contactNo"
                                    placeholder="Ex : 0775488985"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicDelivery">
                                <Form.Label style={{ color: 'black' }}>User Type</Form.Label>
                                <Form.Control name="type" as="select"
                                    custom
                                    onChange={(event) => this.onChange(event)}>
                                    <option value="ATTENDEE">Attendee</option>
                                    <option value="RESEARCHER">Researcher</option>
                                    <option value="PRESENTER">Presenter</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        {(this.state.type == "RESEARCHER") ?
                            <Form.Group controlId="formBasicDelivery">
                                <Form.Label style={{ color: 'black' }}>Activity Type</Form.Label>
                                <Form.Control name="activityType" as="select"
                                    custom
                                    onChange={(event) => this.onChange(event)}>
                                    <option value="ATTENDEE">Present Results</option>
                                    <option value="RESEARCHER">Do workshops</option>
                                    <option value="PRESENTER">Other Activity</option>
                                </Form.Control>
                            </Form.Group>

                            :
                            ''
                        }

                        {(this.state.type != "ATTENDEE") ?
                            <Form.Group controlId="formBasicDelivery">
                                <Form.Label style={{ color: 'black' }}>Category</Form.Label>
                                <Form.Control name="activityType" as="select"
                                    custom
                                    onChange={(event) => this.onChange(event)}>
                                    <option value="REACT">React</option>
                                    <option value="MONGODB">Mongo DB</option>
                                    <option value="RESTFUL API">Restfull API</option>
                                    <option value="SPRING">Springboot</option>
                                    <option value="DOCKER">Docker</option>
                                    <option value="JAVASCRIPT">Javascript</option>

                                </Form.Control>
                            </Form.Group>

                            :
                            ''
                        }

                        {(this.state.type != "ATTENDEE") ?

                            <Form.Group controlId="formBasicContactNo">
                                <Form.Label style={{ color: 'black' }}>Activity Information</Form.Label>
                                <Form.Control as="textarea" rows={3}
                                    name="activityInformation"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>


                            :
                            ''
                        }




                        {(this.state.type != "ATTENDEE") ?
                            <Form.File id="formcheck-api-regular">
                                <Form.File.Label style={{ color: 'black' }}>Upload Deliverables</Form.File.Label>
                                <Form.File.Input />
                            </Form.File>


                            :
                            ''
                        }


                        <br />
                        <Button type="submit" variant="primary">Register</Button>
                        <br />
                        <br />
                        <p>{
                            // (this.context?.currentUser?._id) ?
                            //     <>
                            //         <p className="text-success font-weight-bold">Copy and save your Generated User ID
                            //             : &nbsp; {`${this.context?.currentUser?._id}`}</p>
                            //         <Badge variant="secondary">{this.context?.currentUser?.id}</Badge>
                            //         <p>(Use this generated ID and your password as login credentials in the future.)</p>
                            //         <Link to="/">All done!, click here and enter to the site</Link>
                            //     </>
                            //     : ''
                        }</p>
                    </Form>
                    <br />

                    <Link to="/login" style={{ textDecoration: 'none', color: 'black', marginBottom: '10%' }}>Already have an account? Login</Link>
                    <br />
                </div>
                <br />
                <br />

            </Card>

        );
    }
}

