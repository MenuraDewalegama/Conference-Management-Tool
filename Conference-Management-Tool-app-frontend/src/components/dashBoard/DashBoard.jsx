/*
@author : Janaka Chinthana
@date : 26/05/2021
*/

import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import './DashBoard.css';

export default class DashBoard extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div>
            <br />
           <h1 className="center">Welcome to DashBoard</h1>
        </div>
    }

}