/*
@author : Dhanusha Perera
@date : 26/06/2021
*/

import React, {Component} from 'react';
import {Button, Col, Container, Form, Image, Row} from 'react-bootstrap';
import {ConferencePostContext} from '/src/context/conference-post.context';
import {Link} from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';


class AddEditConferencePost extends Component {

    static contextType = ConferencePostContext;

    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            topic: '',
            description: '',
            venue: '',
            dateTime: new Date(),
            conferencePostImage: null,
            errors: {
                _id: '',
                topic: '',
                description: '',
                venue: '',
                dateTime: '',
                conferencePostImage: '',
            }
        };
    }

    componentDidMount() {
        /* get the conferencePostID from the URL and assign it to state(conferencePostID). */
        const conferencePostIDFromURL = this.props.match.params?.conferencePostID;

        if (conferencePostIDFromURL) {
            this.setState(prevState => {
                return prevState._id = conferencePostIDFromURL;
            });
        }

        if (!this.props.isAdding) {
            this.context.getConferencePostByID(conferencePostIDFromURL).then(response => {
                this.setState({
                    ...response.data
                });

                this.setState({
                    mainImageURI: new URL(this.state.mainImageURI, process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL).href
                });
            }).catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    if (error.response.status === 404) {
                        window.location = '/no-matching-record-found';
                    }
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.error(error);
            });
        }
    }

    /** Set other user inputs in the form to the component state.
     * @param event */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }

    onChangeDateTime(date) {
        this.setState({dateTime: date});
    }

    onChangeConferenceMainImageFormFile(event) {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        this.setState({conferencePostImage: (imageFile) ? imageFile : null});
    }

    performSave(conferencePostData) {
        console.log('conferencePost save !');
        console.log(conferencePostData);
        this.props.saveOrUpdate(conferencePostData).then(response => {
            window.location = '/';
            console.log(response);
            alert('Conference Post created successfully!');
        }).catch(reason => {
            console.error(reason);
            alert('Conference Post saved failed!');
        });
    }

    performUpdate(conferencePostID, conferencePostData) {
        console.log('conferencePost update !');
        // console.log(conferencePostID, conferencePostData);
        this.props.saveOrUpdate(conferencePostID, conferencePostData);
    }


    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col>
                            {(this.props.isAdding) ? (<h2>Add Conference Post</h2>)
                                : (<h2>Edit Conference Post</h2>)}
                            <hr/>
                        </Col>
                    </Row>

                    {/* Conference Post ID is displayed here when editing. */}
                    {(!this.props.isAdding) ? (
                        <Row>
                            <Col>
                                <Form.Group style={formGroupStyles} controlId="venueFG">
                                    <Form.Label style={formGroupLabelStyles}>Conference Post ID</Form.Label>
                                    <Form.Control
                                        style={{maxWidth: '40%'}}
                                        type="text" name="conferencePostID" placeholder="ConferencePost ID"
                                        value={this.state._id}
                                        disabled
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                    ) : ''}


                    {/* Conference Post Main Image. */}
                    {(!this.props.isAdding) ? (
                        <Row style={{padding: '2rem 0'}}>
                            <Col>
                                <h4>Existing Image</h4>
                                <Image style={{maxWidth: '768px'}}
                                       src={this.state.mainImageURI}
                                       alt={'No Image Found For This Conference Post, Try Uploading New Image'}
                                />
                            </Col>
                        </Row>
                    ) : ''}


                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="conferencePostImageFG">
                                <Form.Label style={formGroupLabelStyles}>Upload an Image</Form.Label>
                                <Form.File
                                    id="id_conferencePostImage"
                                    label="Upload Conference Post Image"
                                    onChange={event => this.onChangeConferenceMainImageFormFile(event)}/>
                            </Form.Group>
                            {(this.state.errors.conferencePostImage.length !== 0) ? (
                                <div>
                                    <small className={'text-danger'}>* Please upload an image. Conference Post Image is
                                        required.</small>
                                </div>
                            ) : ''}
                        </Col>
                    </Row>


                    <Row>
                        <Col>
                            <Form.Group controlId="topicFG">
                                <Form.Label style={formGroupLabelStyles}>Topic</Form.Label>
                                <Form.Control
                                    style={{maxWidth: '40%'}}
                                    type="text" name="topic" placeholder="Type Topic"
                                    value={this.state.topic}
                                    onChange={event => this.onChange(event)}
                                    as="textarea" rows={3}
                                />
                            </Form.Group>
                            {(this.state.errors.topic.length !== 0) ? (
                                <div>
                                    <small className={'text-danger'}>* Topic field is required.</small>
                                </div>
                            ) : ''}

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="mainDescriptionFG">
                                <Form.Label style={formGroupLabelStyles}>Description</Form.Label>
                                <Form.Control
                                    style={{maxWidth: '40%'}}
                                    type="text" name="description" placeholder="Type Description"
                                    value={this.state.description}
                                    onChange={event => this.onChange(event)}
                                    as="textarea" rows={15}
                                />
                            </Form.Group>
                            {(this.state.errors.description.length !== 0) ? (
                                <div>
                                    <small className={'text-danger'}>* Description field is required.</small>
                                </div>
                            ) : ''}
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="venueFG">
                                <Form.Label style={formGroupLabelStyles}>Venue</Form.Label>
                                <Form.Control
                                    style={{maxWidth: '40%'}}
                                    type="text" name="venue" placeholder="Type Venue"
                                    value={this.state.venue}
                                    onChange={event => this.onChange(event)}
                                />
                            </Form.Group>
                            {(this.state.errors.venue.length !== 0) ? (
                                <div>
                                    <small className={'text-danger'}>* Venue field is required.</small>
                                </div>
                            ) : ''}

                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="dateTimeFG">
                                <Form.Label style={formGroupLabelStyles}>Date and Time</Form.Label>
                                <DateTimePicker
                                    style={{maxWidth: '40%'}}
                                    onChange={(date) => this.onChangeDateTime(date)}
                                    value={new Date(this.state.dateTime)}
                                    minDate={(this.props.isAdding) ? new Date(Date.now()) : new Date('2020-01-01')}
                                />
                            </Form.Group>
                            {(this.state.errors.dateTime.length !== 0) ? (
                                <div>
                                    <small className={'text-danger'}>* Date and Time is required. Please select a date
                                        and
                                        time</small>
                                </div>
                            ) : ''}

                        </Col>
                    </Row>


                </Form>


                <Container style={{padding: '2rem 0'}}>
                    <Row>
                        <Col>
                            <Button style={{marginRight: '1.2rem'}} variant="primary"
                                    onClick={event => {
                                        event.preventDefault();
                                        console.log('button clicked!');
                                        /* TODO: validation conference post data. */
                                        if (!this.state.conferencePostImage && this.props.isAdding) {
                                            this.setState(prevState => {
                                                return prevState.errors.conferencePostImage = `Image should be uploaded.`;
                                            });
                                            return;
                                        }

                                        const conferencePostObject = {
                                            topic: this.state.topic,
                                            description: this.state.description,
                                            venue: this.state.venue,
                                            dateTime: this.state.dateTime.toISOString()
                                        };

                                        let conferencePostFormDataObject = new FormData();
                                        const conferenceDetailsJSONObj = JSON.stringify(conferencePostObject);

                                        conferencePostFormDataObject
                                            .append('conferenceDetails', conferenceDetailsJSONObj);
                                        conferencePostFormDataObject
                                            .append('conferencePostImage', this.state.conferencePostImage);


                                        // /* perform save or update operation. */
                                        if (this.props.isAdding) {
                                            this.performSave(conferencePostFormDataObject);
                                        } else {
                                            this.performUpdate(this.state._id, conferencePostFormDataObject);
                                        }

                                    }}>{
                                (this.props.isAdding) ? 'ADD' : 'Edit'
                            }
                            </Button>
                        </Col>
                        <Col style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            justifyItems: 'center'
                        }}>
                            <Button variant="primary">
                                <Link to="/conferences"
                                      style={{textDecoration: 'none', color: 'white'}}>Cancel</Link>
                            </Button>
                        </Col>
                    </Row>

                    {/*<ReactBootStrap.Button variant="secondary" as="input" type="reset" value="Reset"/>*/}
                </Container>

            </Container>
        );
    }
}

export default AddEditConferencePost;

/* styles */
const formGroupStyles = {
    padding: '1rem 0'
};

const formGroupLabelStyles = {
    fontSize: '1rem',
    color: '#2c061f'
};

// let noOfKeySpeakersArr = [];
