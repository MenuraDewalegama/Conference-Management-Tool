//imports
import React, { Component } from 'react'
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class AddCommitteeMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            designation: '',
            information: '',
            imagePath: '',
            imageFile: null
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        //get details of the member if the ID comes as a parameter
        if (this.props.match.params.id) {
            axios.get(`http://localhost:3000/members/${this.props.match.params.id}`)
                .then(res => {
                    console.log('response:' + res.data.name);
                    this.setState({
                        name: res.data.name,
                        designation: res.data.designation,
                        information: res.data.information
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    }

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    //on submit form
    onSubmit(event) {
        event.preventDefault();
        let member = {
            name: this.state.name,
            designation: this.state.designation,
            information: this.state.information
        }
        if (this.state.imageFile) {
            member.imageFile = this.state.imageFile;
        } else {
            member.imagePath = this.state.imagePath;
        }
        if (member.hasOwnProperty('imagePath') && member.imagePath.length === 0) {
            delete member.imagePath;
        }
        //add data to formData object to pass along with axios post request body
        let formData = new FormData();
        formData.append('name', member.name);
        formData.append('designation', member.designation);
        formData.append('information', member.information);
        formData.append('speecherImage', member.imageFile);
        if (this.props.match.params.id) {
            //update
            axios.put(`http://localhost:3000/members/${this.props.match.params.id}`, member)
                .then(res => {
                    toast.success('Member Updated Successfully', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(function () { window.location = '/internal/members'; }, 2000);
                })
                .catch(err => {
                    alert(err.message)
                })
        } else {
            axios.post('http://localhost:3000/members', formData)
                .then((result) => {
                    //save
                    toast.success('Member Added Successfully', {
                        position: 'top-right',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    this.setState({
                        name: '',
                        designation: '',
                        information: ''
                    });
                    setTimeout(function () { window.location = '/internal/members'; }, 2000);
                }).catch((err) => {
                    alert(err)
                });



        }
    }

    /** Set image file to the component state when user upload a image file.
      * @param event */
    onChangeImage(event) {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        this.setState({ imageFile: (imageFile) ? imageFile : null });
    }

    render() {
        return (
            <div className="container" >
                <div style={{ marginTop: '5%' }}>

                    <h1 style={{ textAlign: 'center' }}>Add Committe Members</h1>

                    <div className='row'>
                        <div className='col-md-6'>
                            <div className="card bg-light">

                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">person</i>
                                        <h6></h6>
                                    </div>
                                </div>

                                <div className="p-5 card-body mb-3">
                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Group controlId="formBasicSubject">
                                            <Form.Label style={{ color: 'black' }}>Name</Form.Label>
                                            <Form.Control name="name"
                                                required
                                                type="name"
                                                value={this.state.name}
                                                onChange={(event) => this.onChange(event)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicSubject">
                                            <Form.Label style={{ color: 'black' }}>Designation</Form.Label>
                                            <Form.Control name="designation"
                                                required
                                                type="name"
                                                value={this.state.designation}
                                                onChange={(event) => this.onChange(event)}
                                            />
                                        </Form.Group>

                                        <Form.Group controlId="formBasicMessage">
                                            <Form.Label style={{ color: 'black' }}>Information</Form.Label>
                                            <Form.Control as="textarea" rows={3}
                                                name="information"
                                                required
                                                value={this.state.information}
                                                onChange={(event) => this.onChange(event)}
                                            />
                                        </Form.Group>

                                        <div>
                                            <br />
                                            <Form.Label style={{ color: 'black' }}> Upload Image</Form.Label>
                                            <Form.File style={{ color: 'black' }} className="form-control-file" id="id_productImage"
                                                onChange={event => this.onChangeImage(event)} />
                                        </div>
                                        <br></br>

                                        <Button type="submit" variant="primary" onClick={() => {
                                        }}>Submit</Button>

                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6' style={{ marginTop: '5%' }}>
                            <img src="https://assets.entrepreneur.com/content/3x2/2000/20160303162410-businesswoman-speaker-speech-presentation-meeting-conference-talk-seminar-guest.jpeg" style={{ height: '60%', width: '100%' }}></img>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCommitteeMembers
