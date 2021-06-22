/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useContext, useState} from 'react';
import {ConferencePostContext} from '../../../context/conference-post.context';
import ConferencePost from './conference-post/ConferencePost';
import {Button, Col, Container, Row} from 'react-bootstrap';

const ConferencePosts = () => {
    const context = useContext(ConferencePostContext);

    const [isShowMore, setIsShowMore] = useState(false);

    const toggleIsShowMore = () => {
        setIsShowMore(!isShowMore);
    };

    const showMoreLessButton = () => {
        return (
            <Container>
                <Row style={{padding: '1.5rem 0'}}>
                    <Col>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Button onClick={toggleIsShowMore}>
                                {(isShowMore) ? 'View Less' : 'View All'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };

    return (
        <div>
            {(false) ? ( // if the user is an editor = true // TODO: check the user type
                <Container>
                    <Row>
                        <Col>
                            <h1>Conference Posts</h1>
                        </Col>
                        <Col style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center'
                        }}>
                            <Button title={'Add New Conference Post'}
                                    onClick={() => context.addConferencePost()}>ADD</Button>
                        </Col>
                    </Row>
                </Container>
            ) : ''}

            {context.conferencePosts.map((conferencePost, idx) => {
                return (
                    <div key={conferencePost?.id}>
                        {((isShowMore && context.conferencePosts.length > 1) || (idx === 0 && context.conferencePosts.length > 1)) ?
                            (<ConferencePost key={conferencePost?.id} conferencePost={conferencePost}
                                             isShowMore={isShowMore}/>)
                            : ''
                        }
                    </div>
                );
            })}

            <Container>
                <Row style={{padding: '1.5rem 0'}}>
                    <Col>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Button onClick={toggleIsShowMore}>
                                {(isShowMore) ? 'View Less' : 'View All'}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ConferencePosts;

