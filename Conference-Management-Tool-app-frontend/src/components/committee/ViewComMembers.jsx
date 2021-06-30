//imports
import React, { Component } from 'react'
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';

export class ViewComMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:3000/members`)
            .then(response => {
                this.setState({ members: response.data })
                console.log(this.state.members)
            }).catch(error => {
                alert(error.message)
            })
    }
    render() {
        return (
            <div className="container  text-center">

                <br />
                <h1 style={{ marginTop: '5%', backgroundColor: 'black', color: 'white' }}>O  r  g  a  n  i  z  i  n  g   C  o  m  m  i  t  t  e  e</h1>
                <br />
                {this.state.members.length > 0 && this.state.members.map((item, index) => (
                    <div>
                        <Card key={index} className="card mb-3 App" style={{ textAlign: 'center' }}>
                            <div className="card-header card-header-dark  card-header-icon">
                               
                                <div className="card-icon">
                                    <Image roundedCircle
                                        style={{ objectFit: 'fill', maxHeight: '100px', maxWidth: '100px', textAlign: 'center', marginLeft: '42%', marginRight: '42%' }}
                                        variant="top"
                                        src={
                                            item?.imagePath
                                                ? `http://localhost:3000${item.imagePath}`
                                                : 'https://via.placeholder.com/300'
                                        }
                                        alt="Product image"
                                    />
                                    <h4>{item.name}</h4>

                                </div>
                            </div>

                            <Card.Body className="p-3">
                                <h5 className="card-header-dark" style={{ backgroundColor: 'black', color: 'white', marginLeft: '35%', marginRight: '35%', boxShadow: '5px 10px 20px black'}}><b>{item.designation}</b></h5>
                                <br />
                                <h5 style={{ fontFamily: 'monospace', textAlign: 'left' }}>{item.information}</h5>
                            </Card.Body>

                        </Card>
                    </div>
                ))}
                <br />
            </div>
        )
    }
}

export default ViewComMembers
