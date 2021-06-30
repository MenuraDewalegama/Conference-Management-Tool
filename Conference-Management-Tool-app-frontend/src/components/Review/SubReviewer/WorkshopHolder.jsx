import React, { Component } from 'react'
import { Button } from 'react-bootstrap';

import axios from 'axios'


export class WorkshopHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workshops: [],
            status: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3000/research-papers')
            .then(res => {
                this.setState({ workshops: res.data })
            })
    }

    statusUpdate(event, research_paper_id, index) {
        if (index == 1) {
            let review = {
                status: "Approved"
            }
            console.log(research_paper_id);
            axios.put(`http://localhost:3000/research-papers/${research_paper_id}`, review)
                .then((result) => {
                    alert('Successfully updated the status');
                    window.location.reload();
                }).catch((err) => {
                    alert(err)
                });
        } else {
            let review = {
                status: "Rejected"
            }
            console.log(research_paper_id);
            axios.put(`http://localhost:3000/research-papers/${research_paper_id}`, review)
                .then((result) => {
                    alert('Successfully updated the status');
                    window.location.reload();
                }).catch((err) => {
                    alert(err)
                });
        }

    }

    render() {
        return (
            <div className="container" style={{ margin: 'auto-align', textAlign: 'center' }}>
                <h2>This is for workshop details</h2>
                <Button className='primary' href='/review'>Home</Button>

                <br />
                <div className="row" style={{ marginTop: "2%" }}>
                    {
                        (this.state.workshops.length > 0 && this.state.workshops.map((workshop) => (
                            (workshop.type == "PRESENTER") ?
                                <div className="col-md-6">
                                    <div className="card bg-dark">


                                        {
                                            (() => {
                                                if (workshop.status == 'Approved') {
                                                    return (
                                                        <div>
                                                            <div className="card-header card-header-success card-header-icon">
                                                                <div className="card-icon">
                                                                    <i className="material-icons">done</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else if (workshop.status == 'Rejected') {
                                                    return (
                                                        <div>
                                                            <div className="card-header card-header-danger card-header-icon">
                                                                <div className="card-icon">
                                                                    <i className="material-icons">info_outline</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div>
                                                            <div className="card-header card-header-warning card-header-icon">
                                                                <div className="card-icon">
                                                                    <i className="material-icons">loop</i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            })()
                                        }











                                        <div className="card-header">
                                            <div className="p-3 card-body mb-3">
                                                <h5></h5>
                                                <h6>Author Name : {workshop.name}</h6>
                                                <h6>Email : {workshop.email}</h6>
                                                <h6>Contact No : {workshop.contactNo}</h6>
                                                <h5></h5>
                                                <div>
                                                    <object width="100%" height="400" data={`http://localhost:3000${workshop.imagePath}`} type="application/pdf"></object>
                                                </div>
                                                <a href={`http://localhost:3000${workshop.imagePath}`}>VIEW PDF</a>
                                                <br />
                                                <br />


                                                {
                                                    (() => {
                                                        if (workshop.status == 'Approved') {
                                                            return (
                                                                <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, workshop.id, 0)}>
                                                                    Reject
                                                                </button>
                                                            )
                                                        } else if (workshop.status == 'Rejected') {
                                                            return (
                                                                <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, workshop.id, 1)}>
                                                                    Approve
                                                                </button>
                                                            )
                                                        } else {
                                                            return (
                                                                <div>
                                                                    <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, workshop.id, 0)}>
                                                                        Reject
                                                                    </button>
                                                                    <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, workshop.id, 1)}>
                                                                        Approve
                                                                    </button>
                                                                </div>
                                                            )

                                                        }
                                                    })()
                                                }

                                                {/* <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, workshop.id, 0)}>
                                                    Reject
                                                </button>
                                                <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, workshop.id, 1)}>
                                                    Approve
                                                </button> */}

                                                {/* {
                                                    (workshop.status == 'Approved') ?
                                                        <h6 style={{ textAlign: 'unset', color: 'green' }}>Approved</h6>
                                                        :
                                                        (workshop.status == 'Rejected') ?
                                                            <h6 style={{ textAlign: 'unset', color: 'red' }}>Rejected</h6>
                                                            :
                                                            <h6 style={{ textAlign: 'unset', color: 'blue' }}>Processing</h6>
                                                } */}
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                :
                                ''
                        )))
                    }
                </div>
            </div>
        )
    }
}

export default WorkshopHolder
