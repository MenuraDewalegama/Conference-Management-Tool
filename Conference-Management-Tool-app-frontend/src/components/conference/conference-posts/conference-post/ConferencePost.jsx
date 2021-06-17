/*
@author : Dhanusha Perera
@date : 17/06/2021
*/
import React, {useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import KeySpeakers from '../../key-speakers/KeySpeakers';

const ConferencePost = (props) => {

    const [conferencePost, setConferencePost] = useState(props.conferencePost);

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h2 className="conf_header">{conferencePost.mainHeader}</h2>
                        <p>{conferencePost.description}</p>
                    </div>
                    <div>
                        <h5 className="conf_header">VENUE</h5>
                        <p>{conferencePost.venue}</p>
                    </div>

                    <div>
                        <h5 className="conf_header">DATE AND TIME</h5>
                        <p>{conferencePost.dateTime}</p>
                    </div>
                </Col>
                <Col style={{marginBottom: '1rem'}}>
                    <Image style={{minWidth: '400px', width: '100%'}}
                           src={(conferencePost.mainImageURL) ? conferencePost.mainImageURL : 'https://via.placeholder.com/1920x1080'}/>
                </Col>
            </Row>
            <Row style={{padding: '1.5rem 0'}}>
                <Col>
                    <h5 className="conf_header">KEY SPEAKERS</h5>
                    <KeySpeakers keySpeakers={conferencePost.keySpeakers}/>
                </Col>
            </Row>

            {(props.isShowMore) ? (
                <hr style={{
                    borderTop: '1px solid',
                    paddingBottom: '2.5rem'
                }}/>
            ) : ''}
        </Container>
    );
};

export default ConferencePost;

