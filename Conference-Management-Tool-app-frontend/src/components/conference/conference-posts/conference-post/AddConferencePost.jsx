/*
@author : Dhanusha Perera
@date : 26/06/2021
*/

import React, {Component} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {ConferencePostContext} from '/src/context/conference-post.context';
import {Link} from 'react-router-dom';
import AddKeySpeakerHolder from '../../key-speakers/key-speaker/AddKeySpeakerHolder';


class AddConferencePost extends Component {

    static contextType = ConferencePostContext;

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            mainImage: null,
            noOfKeySpeakers: 1,
            keySpeakers: []
        };
    }


    /** Set other user inputs in the form to the component state.
     * @param event */
    onChange(event) {
        const {name, value} = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }

    onChangeConferenceMainImageFormFile(event) {
        console.log(event.target.files[0]);
        const imageFile = event.target.files[0];
        this.setState({mainImage: (imageFile) ? imageFile : null});
    }

    getNoOfKeySpeakers() {
        return this.state.noOfKeySpeakers;
    }

    /** get key speaker input and push it into keySpeakers array. */
    getKeySpeakerDetails(keySpeaker) {
        // this.state.keySpeakers.push(keySpeaker);
        console.log('Adoow Key Speaker awa: ', keySpeaker);

        const tempKeySpeakers = this.state.keySpeakers;
        tempKeySpeakers.push(keySpeaker);
        this.setState({keySpeakers: tempKeySpeakers});
    }

    performSaveOrUpdate() {
        console.log('save or update !');
        console.log(this.state.keySpeakers);
    }


    render() {
        return (
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <h2>Add Conference Post</h2>
                            <hr/>
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
                                    as="textarea" rows={3}
                                />
                            </Form.Group>
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
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="dateTimeFG">
                                <Form.Label style={formGroupLabelStyles}>Date and Time</Form.Label>
                                <Form.Control
                                    style={{maxWidth: '40%'}}
                                    type="date" name="dateTime" placeholder="Type DateTime"
                                    value={this.state.dateTime}
                                    onChange={event => this.onChange(event)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="mainImageFG">
                                <Form.File
                                    id="id_conferenceImage"
                                    label="Upload Conference Image"
                                    onChange={event => this.onChangeConferenceMainImageFormFile(event)}/>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Form.Group style={formGroupStyles} controlId="keySpeakersFG">
                                <Form.Label style={formGroupLabelStyles}>Key Speakers</Form.Label>
                                <p>Select No of Key Speakers</p>
                                <Form.Control
                                    name={'noOfKeySpeakers'}
                                    value={this.state.noOfKeySpeakers}
                                    onChange={(event) => this.onChange(event)}
                                    style={{maxWidth: '40%'}} as="select">
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                {/* Kep Speakers Form. */}
                {/*<Row>*/}
                {/*    <Col>*/}
                {/*        <AddKeySpeakerHolder getNoOfKeySpeakers={this.getNoOfKeySpeakers.bind(this)}*/}
                {/*                             noOfKeySpeakers={this.state.noOfKeySpeakers}*/}
                {/*                             getKeySpeakerDetails={this.getKeySpeakerDetails.bind(this)}*/}
                {/*                             setOnSubmitClick={(click) => this.clickChild = click}*/}
                {/*        />*/}
                {/*    </Col>*/}
                {/*</Row>*/}

                <Container style={{padding: '2rem 0'}}>
                    <Row>
                        <Col>
                            <Button style={{marginRight: '1.2rem'}} variant="primary"
                                    onClick={event => {
                                        event.preventDefault();

                                        /* perform save or update operation. */
                                        // this.performSaveOrUpdate(saveOrUpdate);
                                        this.clickChild();
                                        this.performSaveOrUpdate();

                                    }}>{
                                (this.state.id) ? 'Edit' : 'ADD'
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

export default AddConferencePost;

/* styles */
const formGroupStyles = {
    padding: '1rem 0'
};

const formGroupLabelStyles = {
    fontSize: '1rem',
    color: '#2c061f'
};

let noOfKeySpeakersArr = [];
