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

    deleteItem(e, itemId) {
        console.log(itemId);
        axios.delete(`http://localhost:3000/members/${itemId}`)
            .then((response) => {
                alert('Successfully deleted!', response)
                window.location.reload();
            }).catch((err) => {
                alert(err.message)
            });
    }


    updateItem(e, itemId) {
        console.log(itemId);
        window.location = `/add-members/${itemId}`
    }

    
    render() {
        return (
            <div className="container  text-center">

                <br />
                <h1 style={{ marginTop: '5%' }}>Organizing Committee</h1>
                <br />
                {this.state.members.length > 0 && this.state.members.map((item, index) => (
                    <div>
                        <Card key={index} className="card mb-3 App" style={{ textAlign: 'center' }}>
                            <br />
                            <Image roundedCircle
                                style={{ objectFit: 'fill', maxHeight: '300px', maxWidth: '200px', textAlign: 'center', marginLeft: '42%', marginRight: '42%' }}
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

                                <button className="btn btn-primary" onClick={e => this.updateItem(e, item._id)}>Update</button>
                                <button className="btn btn-danger" onClick={e => this.deleteItem(e, item._id)}>Delete</button>

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
