/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {useState} from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import './key-speaker.css';

const KeySpeaker = () => {

    const [keySpeaker, setKeySpeaker] = useState({
        name: '',
        title: '',
        description: '',
        imageURL: ''
    });

    return (
        <Container fluid style={{padding: '1.5rem 0'}}>
            <Container fluid className={'p-0'}>
                <Row>
                    <Col sm={12} md={5} lg={4}>
                        <Image style={{width: '300px', marginBottom: '1rem'}} src="https://via.placeholder.com/300"/>
                    </Col>
                    <Col sm={12} md={7} lg={8}>
                        <h5>Dr. Nuwan Kodagoda</h5>
                        <h6 className={'title_styles'}>
                            Head/Asst.Professor
                            Department of Computer Science & Software Engineering
                            - Faculty of Computing
                        </h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci animi
                            aspernatur atque, beatae cum distinctio ea est excepturi itaque minus neque nisi
                            non nostrum quaerat, repudiandae, rerum suscipit. Expedita, velit.</p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
};

export default KeySpeaker;
