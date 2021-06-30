import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'

export class ReviewContactUS extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
    }

    // Call the endpoint when starting the relevent page 
    componentDidMount() {
        axios.get('http://localhost:3000/contact')
            .then((result) => {
                this.setState({ messages: result.data })
            }).catch((err) => {
                console.log(`Something went wrong ${err}`);
            });

    }

    // This method is to delete a message
    deleteMessage(event, message_id) {
        console.log(message_id);
        axios.delete(`http://localhost:3000/contact/${message_id}`)
            .then((result) => {
                alert('Successfully deleted the message');
                window.location.reload();
            }).catch((err) => {
                alert(err)
            });
    }



    render() {
        return (
            <div className="container">
                <div style={{ marginTop: 'auto-align', textAlign: 'center' }}>
                    <h2>Contact Us Review</h2>

                    <div style={{ margin: 'auto-align' }}>
                        <Button className='primary' href='/review'>Home</Button>
                    </div>


                    <div className="row" style={{ marginTop: "2%" }}>

                        {
                            (this.state.messages.length > 0 && this.state.messages.map((message) => (
                                <div className="col-md-6">
                                    <div className="card bg-dark">

                                        <div className="card-header card-header-success card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">drafts</i>
                                            </div>
                                        </div>

                                        <div className="p-5 card-body mb-3">
                                            <h4>Subject : {message.subject}</h4>
                                            <h5>Sender Name : {message.name}</h5>
                                            <h5>Sender Email : {message.email}</h5>
                                            <h5>Message : {message.message}</h5>

                                            <button className="btn btn-danger"
                                                onClick={(e) => { if (window.confirm('Are you sure to delete this message?')) this.deleteMessage(event, message._id) }} >
                                                Delete
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            )))
                        }




                    </div>

                </div>
            </div>
        )
    }
}

export default ReviewContactUS
