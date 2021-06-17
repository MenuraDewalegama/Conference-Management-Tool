/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useEffect, useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import './key-speaker.css';

const KeySpeaker = (props) => {

    const [keySpeaker, setKeySpeaker] = useState({
        name: '',
        title: '',
        description: '',
        imageURL: 'https://via.placeholder.com/300'
    });

    useEffect(() => {
        setKeySpeaker(props.keySpeaker);
    }, [props.keySpeaker]);


    return (
        <Container fluid style={{padding: '1.5rem 0'}}>
            <Container fluid className={'p-0'}>
                <Row>
                    <Col sm={12} md={5} lg={4}>
                        <Image style={{minWidth: '200px', width: '100%', maxWidth: '300px', marginBottom: '1rem'}}
                               src={keySpeaker.imageURL}/>
                    </Col>
                    <Col sm={12} md={7} lg={8}>
                        <h5>{keySpeaker.name}</h5>
                        <h6 className={'title_styles'}>{keySpeaker.title}</h6>
                        <p>{keySpeaker.description}</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default KeySpeaker;
