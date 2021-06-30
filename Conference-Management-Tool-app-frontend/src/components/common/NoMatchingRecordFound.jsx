/*
@author : Dhanusha Perera
@date : 30/06/2021
*/
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const NoMatchingRecordFound = (props) => {
    return (
        <Container>
            <Row>
                <Col>
                    <h4>No Matching Record Found</h4>
                    <Link to={'/'}>Click here to go back to main page</Link>
                </Col>
            </Row>
        </Container>
    );
};

export default NoMatchingRecordFound;

