/*
@author : Dhanusha Perera
@date : 25/05/2021
*/
import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import './ConferenceHolder.css';
import KeySpeakers from './key-speakers/KeySpeakers';
import {CaretDown, CaretDownFill} from 'react-bootstrap-icons';

/* functional component. */
const ConferenceHolder = () => {
    return (
        <div className="outer_container" style={{paddingBottom: '4rem'}}>
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h2 className="conf_header">Lorem ipsum dolor sit amet, consectetur elit.</h2>
                            <p>A at consectetur consequuntur deleniti ex explicabo illum ipsam, libero modi odit optio
                                pariatur porro quaerat, quam repellendus soluta sunt veniam vero.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Posuere morbi leo urna molestie at elementum eu
                                facilisis. Phasellus faucibus scelerisque eleifend donec. At quis risus sed vulputate.
                                Blandit massa enim nec dui nunc mattis enim ut tellus.</p>
                        </div>
                        <div>
                            <h5 className="conf_header">VENUE</h5>
                            <p>Ducimus excepturi illum molestiae nisi odit optio quibusdam ratione similique.</p>
                        </div>

                        <div>
                            <h5 className="conf_header">DATE AND TIME</h5>
                            <p>Ducimus excepturi illum molestiae nisi odit optio quibusdam ratione similique.</p>
                        </div>
                    </Col>
                    <Col style={{marginBottom: '1rem'}}>
                        <Image style={{minWidth: '400px', width: '100%'}} src="https://via.placeholder.com/1920x1080"/>
                    </Col>
                </Row>
                <Row style={{padding: '1.5rem 0'}}>
                    <Col>
                        <h5 className="conf_header">KEY SPEAKERS</h5>
                        <KeySpeakers/>
                    </Col>
                </Row>

                <Row style={{padding: '1.5rem 0'}}>
                    <Col>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <h5>More</h5>
                            <CaretDown style={{fontSize: '1.3rem', color: 'black', margin: '0 0.5rem'}}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ConferenceHolder;
