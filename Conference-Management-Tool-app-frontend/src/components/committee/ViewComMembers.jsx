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
              
                <br/>
                <h1 style={{marginTop:'5%'}}>Organizing Committee</h1>
                <br />
                {this.state.members.length > 0 && this.state.members.map((item, index) => (
                    <div>
                        <Card key={index} className="card mb-3 App" style={{textAlign:'center'}}>
                            <br/>
                            <Image roundedCircle
                                style={{ objectFit: 'fill', maxHeight: '300px', maxWidth: '200px', textAlign: 'center', marginLeft:'42%', marginRight:'42%' }}
                                variant="top"
                                src={
                                    item?.imagePath
                                        ? `http://localhost:3000${item.imagePath}`
                                        : 'https://via.placeholder.com/300'
                                }
                                alt="Product image"
                            />

                            <Card.Body className="p-3">
                                <h4><b>{item.name}</b></h4>
                                <h5>{item.designation}</h5>
                                <h5>{item.information}</h5>
                            </Card.Body>
                        </Card>
                        
                    </div>

                ))}

                <br/>
            </div>
        )
    }
}

export default ViewComMembers