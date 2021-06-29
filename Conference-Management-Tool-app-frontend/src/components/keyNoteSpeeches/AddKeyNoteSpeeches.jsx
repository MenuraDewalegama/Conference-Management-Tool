import React, { Component } from 'react'
import { Card, Button, Form, Col, Raw, Image } from 'react-bootstrap';
import axios from 'axios';



export class AddKeyNoteSpeeches extends Component {

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

    onChange(event) {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    onSubmit(event) {
        event.preventDefault();
        let speaker = {
            name: this.state.name,
            designation: this.state.designation,
            information: this.state.information
        }
        console.log(speaker);

        if (this.state.imageFile) {
            speaker.imageFile = this.state.imageFile;
        } else {
            speaker.imagePath = this.state.imagePath;
        }
        if (speaker.hasOwnProperty('imagePath') && speaker.imagePath.length === 0) {
            delete speaker.imagePath;
        }

        let formData = new FormData();
        formData.append('name', speaker.name);
        formData.append('designation', speaker.designation);
        formData.append('information', speaker.information);
        formData.append('speecherImage', speaker.imageFile);

        axios.post('http://localhost:3000/speeches', formData)
            .then((result) => {
                console.log(result);
                alert("You have successfully added");
                window.location.reload();
            }).catch((err) => {
                alert(err)
            });
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
                    <h1 style={{ textAlign: 'center' }}>Add Key Note Speaker</h1>


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
                                            <Form.File style={{color:'black'}} className="form-control-file" id="id_productImage"
                                                onChange={event => this.onChangeImage(event)} />
                                        </div>
                                        <br></br>

                                        <Button type="submit" variant="primary" >Submit</Button>

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

export default AddKeyNoteSpeeches
