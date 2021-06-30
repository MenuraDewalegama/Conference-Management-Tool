/*
@author : Dhanusha Perera
@date : 17/06/2021
*/
import React, {useContext, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Col, Container, Image, Row} from 'react-bootstrap';
import {PencilSquare, Trash} from 'react-bootstrap-icons';
import {ConferencePostContext} from '/src/context/conference-post.context';
import KeySpeakerService from '/src/service/key-speaker.service';
import KeySpeakers from '../../key-speakers/KeySpeakers';

const ConferencePost = (props) => {

    const context = useContext(ConferencePostContext);
    const [backendURL, setBackendURL] = useState(process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL);
    const [baseURL, setBaseURL] = useState(backendURL);
    const [conferencePost, setConferencePost] = useState(props.conferencePost);
    const [keySpeakers, setKeySpeakers] = useState([]);

    let history = useHistory();

    /* Redirect to edit UI. */
    const handleClickOnAddIcon = () => {
        history.push(`/conferences/add`);
    };

    /* Redirect to edit UI. */
    const handleClickOnEditIcon = () => {
        history.push(`/conferences/${conferencePost?._id}/edit`);
    };

    const handleClickOnDeleteIcon = (conferencePostID) => {
        context.deleteConferencePost(conferencePostID).then(response => {
            console.log(response);
            console.log('response status', response?.status);
            window.location = '/';
            alert('Conference Post deleted successfully!');
        }).catch(reason => {
            console.error(reason);
            alert('Conference Post deletion failed!');
        });
    };

    const handleClickOnApprove = (conferencePostID) => {
        context.approveConferencePost(conferencePostID).then(response => {
            // console.log(response);
            // console.log('response status', response?.status);
            window.location = '/';
            alert('Conference Post approve successfully!');
        }).catch(reason => {
            // console.error(reason);
            window.location = '/';
            alert('Conference Post approve successfully!');
        });
    };

    useEffect(() => {
        KeySpeakerService.getAllKeySpeakers(conferencePost?._id).then(keySpeakersDB => {
            setKeySpeakers(keySpeakersDB);
        }).catch(reason => {
            console.error('Something went wrong when retrieving keySpeakers from the backend.', reason);
        });
    }, [conferencePost]);

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
                            <button className="btn btn-warning"  onClick={(event) => {
                                console.log('approve icon clicked!')
                                handleClickOnApprove(conferencePost?._id);
                            }}>Approve</button>
                        </div>
                        <div title={'Edit this conference-post'}>
                            <PencilSquare style={{
                                margin: '0 1rem',
                                color: 'blue',
                                fontSize: '1.2rem',
                                cursor: 'pointer'
                            }} onClick={(event) => {
                                handleClickOnEditIcon();
                            }}/>
                        </div>
                        <div title={'Delete this conference-post'}>
                            <Trash style={{
                                color: 'crimson',
                                fontSize: '1.2rem',
                                cursor: 'pointer'
                            }} onClick={(event) => {
                                handleClickOnDeleteIcon(conferencePost?._id);
                            }}
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
                        <p>{(new Date(conferencePost.dateTime).toString()) ?
                            new Date(conferencePost.dateTime).toString() : conferencePost.dateTime}</p>
                    </div>
                </Col>
                <Col style={{marginBottom: '1rem'}}>
                    <Image style={{minWidth: '400px', width: '100%'}}
                           src={(conferencePost.mainImageURI) ?
                               (new URL(`${conferencePost.mainImageURI}`, baseURL).href) : 'https://via.placeholder.com/1920x1080'}/>
                </Col>
            </Row>
            <Row style={{padding: '1.5rem 0'}}>
                <Col>
                    <h5 className="conf_header">KEY SPEAKERS</h5>
                    <KeySpeakers keySpeakers={keySpeakers}/>
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

