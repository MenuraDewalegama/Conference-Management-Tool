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
            {context.conferencePosts.map((conferencePost, idx) => {
                return (
                    <div>
                        {((isShowMore && context.conferencePosts.length > 1) || (idx === 0 && context.conferencePosts.length > 1)) ?
                            (<ConferencePost key={idx} conferencePost={conferencePost} isShowMore={isShowMore}/>)
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

