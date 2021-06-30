//imports
import React, { Component } from 'react'
import axios from 'axios';
import { Card, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class ViewComMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        }
    }

    //actions to be done with page load
    componentDidMount() {
        axios.get(`http://localhost:3000/members`)
            .then(response => {
                this.setState({ members: response.data })
                console.log(this.state.members)
            }).catch(error => {
                alert(error.message)
            })
    }

    //delete method 
    deleteItem(e, itemId) {
        <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) }} />
        axios.delete(`http://localhost:3000/members/${itemId}`)
            .then((response) => {
                toast.warning('Member Deleted Successfully', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setTimeout(function () { window.location.reload(); }, 2000);

            }).catch((err) => {
                alert(err.message)
            });
    }

    //update method
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
                                <button className="btn btn-danger" onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteItem(e, item._id) }} >Delete</button>

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
