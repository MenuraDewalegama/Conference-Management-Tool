/*
@author : Dhanusha Perera
@date : 17/06/2021
*/
import React, {useContext, useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import KeySpeakers from '../../key-speakers/KeySpeakers';
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import {ConferencePostContext} from '/src/context/conference-post.context';

const ConferencePost = (props) => {

    const context = useContext(ConferencePostContext);

    const [conferencePost, setConferencePost] = useState(props.conferencePost);

    return (
        <Container>
            {(true) ? ( // if the user is an editor = true // TODO: check the user type
                <Row>
                    <Col style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        padding: '2rem'
                    }}>
                        <div title={'Edit this conference-post'}>
                            <PencilSquare style={{
                                margin: '0 1rem',
                                color: 'blue',
                                fontSize: '1.2rem',
                                cursor: 'pointer'
                            }} onClick={(event) => context.editConferencePost(conferencePost)}/>
                        </div>
                        <div title={'Delete this conference-post'}>
                            <Trash style={{
                                color: 'crimson',
                                fontSize: '1.2rem',
                                cursor: 'pointer'
                            }} onClick={(event) => context.deleteConferencePost(conferencePost?.id)}
                            /></div>
                    </Col>
                </Row>
            ) : ''}
            <Row>
                <Col>
                    <div>
                        <h2 className="conf_header">{conferencePost.topic}</h2>
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

