/*
@author : Ssachintha de Zoysa
@date : 27/05/2021
*/
import React from 'react';
import { Card, Button, Form, Col, Raw } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default class Register extends React.Component {

    // static contextType = UserContext;

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            contactNo: null,
            password: null,
            password2: null,
            type: 'ATTENDEE',
            activityType: null,
            category:null,
            activityInformation: null

        };
    }

    /** Register the user. */
    onSubmit() {
        console.log('register called!');
        console.log(this.state);
        // const {password} = this.state;

        // if (!this.state?.type) {
        //     console.log('Invalid type: Select');
        //     return;
        // }
        // UserService.addUser(this.state).then(async response => {
        //     if (response.status === 201) {
        //         /* 201- user created. */
        //         console.log('user created!', response.data);
        //         const resultObject = response?.data;
        //         try {
        //             await this.context.authenticateUser({userID: resultObject?.generatedId, password: password});
        //             // await UserService.authenticate(response.data?.generatedId, this.state?.password);
        //             // sessionStorage.setItem(sha256(process.env.AUTHENTICATED_USER_NAME), this.user)
        //             // window.location = '/';
        //         } catch (error) {
        //             console.error(error);
        //         }
        //     }
        // });
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(name, value);
    }

    render() {
        // console.log(this.context);
        return (

            <Card style={{ width: 'auto', height: 'auto', marginLeft: '10%', marginRight: '10%', marginTop:'5%' }}>
                <div className="container-sm">
                    <br />
                    <h1 style={{ textAlign: 'center' }}>Register Here</h1>

                    <br />
                    <br />
                    <Form>
                        <Form.Group controlId="formBasicName">
                            <Form.Label style={{color:'black'}}>Email</Form.Label>
                            <Form.Control name="email"
                                type="email"
                                placeholder="Ex: examplemail.com"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicName">
                            <Form.Label style={{color:'black'}}>Name</Form.Label>
                            <Form.Control name="name"
                                type="name"
                                placeholder="Ex : Jhon Carter"
                                onChange={(event) => this.onChange(event)}
                            />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label style={{color:'black'}}>Password</Form.Label>
                                <Form.Control name="password"
                                    type="password"
                                    placeholder="Should have minimum of 8 characters"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label style={{color:'black'}}>Re Enter the Password</Form.Label>
                                <Form.Control name="password2"
                                    type="password"
                                    placeholder="Re type your password"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>


                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicContactNo">
                                <Form.Label style={{color:'black'}}>Contact No</Form.Label>
                                <Form.Control type="name"
                                    name="contactNo"
                                    placeholder="Ex : 0775488985"
                                    onChange={(event) => this.onChange(event)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicDelivery">
                                <Form.Label style={{color:'black'}}>User Type</Form.Label>
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
                                <Form.Label style={{color:'black'}}>Activity Type</Form.Label>
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
                                <Form.Label style={{color:'black'}}>Category</Form.Label>
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
                                <Form.Label style={{color:'black'}}>Activity Information</Form.Label>
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
                                <Form.File.Label style={{color:'black'}}>Upload Deliverables</Form.File.Label>
                                <Form.File.Input />
                            </Form.File>


                            :
                            ''
                        }


                        <br />
                        <Button variant="primary"
                            onClick={this.onSubmit.bind(this)}
                        >Register</Button>
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

