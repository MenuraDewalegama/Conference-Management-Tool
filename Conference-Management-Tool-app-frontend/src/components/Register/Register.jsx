/*
@author : Ssachintha de Zoysa
@date : 27/05/2021
*/
import React from 'react';
import { Card, Button, Form, Col, Raw } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ExternalUserContext } from '../../context/externalUser.context';
import axios from '../../service/axios.service';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import 'react-slideshow-image/dist/styles.css'
import { Zoom } from 'react-slideshow-image';
import Payment from '../Register/Payment';


//declaring constants
const slideImages = [
    'https://www.techedt.com/wp-content/uploads/2019/03/Your-guide-to-top-7-tech-conferences-in-2019.png',
    'https://sliitacademy.lk/wp-content/uploads/2020/09/business-degree.jpg',
    'https://bs-uploads.toptal.io/blackfish-uploads/blog/post/seo/og_image_file/og_image/15051/angular-5-tutorial-325403e130ba3b2c367174b73bb7275a.png',
    'https://res.cloudinary.com/practicaldev/image/fetch/s--THwyjA44--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/4kpbveocl2p5qjorilos.png',
    'https://miro.medium.com/max/1040/1*0lgunvVYa8gZ_sfMHflyvw.jpeg',
    'https://miro.medium.com/max/1040/1*0lgunvVYa8gZ_sfMHflyvw.jpeg'

];

const slideProperties = {
    duration: 2500,
    scale: 0.8,
    arrows: false
}

export default class Register extends React.Component {

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
            activityInformation: null,
            status: null,
            imagePath: '',
            imageFile: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    /** Set image file to the component state when user upload a image file.
         * @param event */
    onChangeProductFormFile(event) {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        this.setState({ imageFile: (imageFile) ? imageFile : null });
    }

    removeImagePath() {
        this.setState({
            pdfPath: ''
        });
    }

    //onclick method for submit button in form
    onSubmit(event) {
        event.preventDefault();
        const { password } = this.state;
        this.state.status = 'Processing';
        const externalUserObj = {
            email: this.state.email,
            name: this.state.name,
            contactNo: this.state.contactNo,
            password: this.state.password,
            type: this.state.type,
            activityType: this.state.activityType,
            category: this.state.activityType,
            activityInformation: this.state.activityInformation,
            status: this.state.status
        };
        //for update
        if (this.state.imageFile) {
            externalUserObj.imageFile = this.state.imageFile;
        } else {
            /* existing imagePath is assigned to the productObject.
            * That means no image update happens. */
            externalUserObj.imagePath = this.state.imagePath;
        }
        if (externalUserObj.hasOwnProperty('imagePath') && externalUserObj.imagePath.length === 0) {
            delete externalUserObj.imagePath;
        }
        let formData = new FormData();
        formData.append('email', externalUserObj.email);
        formData.append('productImage', externalUserObj.productImage);
        formData.append('name', externalUserObj.name);
        formData.append('contactNo', externalUserObj.contactNo);
        formData.append('password', externalUserObj.password);
        formData.append('type', externalUserObj.type);
        formData.append('activityType', externalUserObj.activityType);
        formData.append('category', externalUserObj.category);
        formData.append('activityInformation', externalUserObj.activityInformation);
        formData.append('status', externalUserObj.status);
        formData.append('externalUserImage', externalUserObj.imageFile);

        if (this.state.password == this.state.password2) {
            axios.post('http://localhost:3000/externaluser/', formData)
                .then(res => {
                    alert('Successfully added');
                    console.log(res);
                    window.location.reload();
                })
                .catch(err => {
                    alert(err.message)
                });
        } else {
            alert('Passwords not matching');
        }
    }

    /* keep track of changes of the form field values. */
    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        // console.log(name, value);
    }

    render() {

        // console.log(this.context);
        return (
            <div style={{ backgroundColor: 'whitesmoke' }}>

                <div className="row">
                    <div className="col-md-6">
                        <div className="slide-container" style={{ width: 'auto', height: 'auto', marginLeft: '35%' }}>
                            <img style={{ marginTop: '5%', objectFit: "inherit", textAlign: "center", width: "100%", height: '5cm', borderRadius: "10px" }} src="http://p14cdn4static.sharpschool.com/UserFiles/Servers/Server_131208/Image/For%20Families/Online%20Registration%20-%20red%20banner.png"></img>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <div className="slide-container" style={{ width: 'auto', height: 'auto', marginRight: '35%' }}>
                            <Zoom autoplay='true' {...slideProperties} style={{ textAlign: 'center', marginTop: '5%' }}>
                                {slideImages.map((each, index) => (
                                    <div key={index} style={{ width: "100%" }}>
                                        <img style={{ objectFit: "inherit", textAlign: "center", width: "100%", height: '5cm', borderRadius: "10px" }} src={each} />
                                    </div>
                                ))}
                            </Zoom>
                        </div>

                    </div>

                </div>




                <Card border="dark" style={{ width: 'auto', height: 'auto', marginLeft: '15%', marginRight: '15%', marginTop: '1%', marginBottom: '10%', padding: '10px', backgroundColor: 'white' }}>

                    <div className="card-header card-header-primary card-header-icon">
                        <div className="card-icon">
                            <i className="material-icons">people_alt</i>
                        </div></div>

                    <div className="container">
                        <div >

                        </div>
                        <br />
                        <br />
                        <Form onSubmit={this.onSubmit}>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicName">
                                    <Form.Label style={{ color: 'black' }}>Email</Form.Label>
                                    <Form.Control name="email"
                                        required
                                        type="email"
                                        placeholder="Ex: examplemail.com"
                                        onChange={(event) => this.onChange(event)}
                                    />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formBasicName">
                                    <Form.Label style={{ color: 'black' }}>Name</Form.Label>
                                    <Form.Control name="name"
                                        required
                                        type="name"
                                        placeholder="Ex : Jhon Carter"
                                        onChange={(event) => this.onChange(event)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label style={{ color: 'black' }}>Password</Form.Label>
                                    <Form.Control name="password"
                                        minLength='8'
                                        required
                                        type="password"
                                        placeholder="Should have minimum of 8 characters"
                                        onChange={(event) => this.onChange(event)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formBasicPassword">
                                    <Form.Label style={{ color: 'black' }}>Re Enter the Password</Form.Label>
                                    <Form.Control name="password2"
                                        required
                                        type="password"
                                        placeholder="Re type your password"
                                        onChange={(event) => this.onChange(event)}
                                    />
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="formBasicContactNo">
                                    <Form.Label style={{ color: 'black' }}>Contact No</Form.Label>
                                    <PhoneInput
                                        required
                                        country={'us'}
                                        value={this.state.contactNo}
                                        onChange={contactNo => this.setState({ contactNo })}
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



                            {(this.state.type != "ATTENDEE") ?

                                <div>
                                    <br />
                                    <Form.Label style={{ color: 'black' }}> Upload Deliverables</Form.Label>
                                    <Form.File accept="application/pdf" className="form-control-file" multiple id="id_productImage"
                                        onChange={event => this.onChangeProductFormFile(event)} />
                                </div>


                                :
                                ''
                            }

                            {(this.state.type == "RESEARCHER") ?
                                <Form.Group controlId="formBasicDelivery">
                                    <Form.Label style={{ color: 'black' }}>Activity Type</Form.Label>
                                    <Form.Control name="activityType" as="select"
                                        custom
                                        onChange={(event) => this.onChange(event)}>
                                        {/* <option value="PresentResults">Present Results</option> */}
                                        <option value="Workshops">Workshops</option>
                                        <option value="TechnicalSessions">Technical Sessions (Present Research Results)</option>
                                        <option value="OtherActivity">Other Activity</option>
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

                            {(this.state.type == "ATTENDEE") ?
                                <div className="container" style={{ marginTop: '5%', textAlign: 'center' }}>
                                    <h5>Registration Fee of Rs 1000 have to be payed</h5>
                                    <Payment />
                                </div>
                                :
                                ''
                            }
                            {(this.state.type == "PRESENTER") ?
                                <div className="container" style={{ marginTop: '5%', textAlign: 'center' }}>
                                    <h5>Registration Fee of Rs 3000 have to be payed.</h5>
                                    <h6 style={{ color: 'red' }}> The amount will be deducted from your account once the proposal is accepted by the management team. We will get back to you through email.</h6>
                                    <Payment />
                                </div>
                                :
                                ''
                            }
                            <div style={{ marginTop: '5%', textAlign: 'center' }}>
                                <Button type="submit" variant="primary" >Register</Button>
                            </div>
                        </Form>

                        <br />
                        
                        <Link to="/login" style={{ textDecoration: 'none', color: 'black', marginBottom: '10%' }}>Already have an account? Login</Link>
                        <br />
                    </div>
                    <br />
                    <br />

                </Card >
            </div>
        );
    }
}

