/*
@author : Dhanusha Perera
@date : 25/05/2021
*/
import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import './ConferenceHolder.css';

/* functional component. */
const ConferenceHolder = () => {
    return (
        <Container className="outer_container">
            <Container style={{padding: '0rem'}}>
                <Row>
                    <Col>
                        <Image src="https://via.placeholder.com/500"/>
                    </Col>
                    <Col>
                        <div>
                            <h2 className="conf_header">Lorem ipsum dolor sit amet, consectetur elit.</h2>
                            <p>A at consectetur consequuntur deleniti ex explicabo illum ipsam, libero modi odit optio
                                pariatur porro quaerat, quam repellendus soluta sunt veniam vero.</p>
                            <p>A at consectetur consequuntur deleniti ex explicabo illum ipsam, libero modi odit optio
                                pariatur porro quaerat, quam repellendus soluta sunt veniam vero.</p>
                        </div>
                        <div>
                            <h6 className="conf_header">Venue</h6>
                            <p>Ducimus excepturi illum molestiae nisi odit optio quibusdam ratione similique.</p>
                        </div>

                        <div>
                            <h6 className="conf_header">Date and Time</h6>
                            <p>Ducimus excepturi illum molestiae nisi odit optio quibusdam ratione similique.</p>
                        </div>

                        <Container className="p-0">
                            <h6 className="conf_header">Key Speakers</h6>
                            <Row>
                                <Col sm={4}>
                                    <Image src="https://via.placeholder.com/150"/>
                                </Col>
                                <Col sm={8}>
                                    <h6 className="conf_header">Doloremque pariatur placeat.</h6>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi
                                        aspernatur atque, beatae cum distinctio ea est excepturi itaque minus neque nisi
                                        non nostrum quaerat, repudiandae, rerum suscipit. Expedita, velit.</p>
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default ConferenceHolder;

