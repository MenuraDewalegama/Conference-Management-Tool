import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import EmailService from '../../../service/email.service'
import axios from 'axios'

export class WorkshopHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            workshops: [],
            status: ''
        }
    }

    // Call the endpoint when starting the relevent page 
    componentDidMount() {
        axios.get('http://localhost:3000/papers')
            .then(res => {
                this.setState({ workshops: res.data })
            }).catch((err) => {
                console.log(`Something went wrong ${err}`);
            });
    }

    // This method is to update the status
    statusUpdate(event, research_paper_id, index, email, name) {
        if (index == 1) {
            let review = {
                status: "Approved"
            }
            console.log(research_paper_id);
            axios.put(`http://localhost:3000/papers/${research_paper_id}`, review)
                .then((result) => {
                    alert('Successfully updated the status');
                    // window.location.reload();
                    console.log(`this.${email}`);
                    const mailMessage = "We have approved your workshop proposal"
                    this.sendMail(email, name, mailMessage)
                }).catch((err) => {
                    alert(err)
                });
        } else {
            let review = {
                status: "Rejected"
            }
            console.log(research_paper_id);
            axios.put(`http://localhost:3000/papers/${research_paper_id}`, review)
                .then((result) => {
                    alert('Successfully updated the status');
                    // window.location.reload();
                    const mailMessage = "We have rejected your workshop proposal"
                    this.sendMail(email, name, mailMessage)
                }).catch((err) => {
                    alert(err)
                });
        }

    }


    sendMail(email, name, mailMessage) {
        EmailService.sendEmail({
            user_id: 'user_Swzja6hgJOB3MOMfn8x53',
            service_id: 'service_727resg',
            template_id: 'template_3cvmc3f',
            template_params: {
                from_name: 'CMT - SYSTEM',
                to_name: name,
                reply_to: email,
                message: mailMessage
            },
            accessToken: '6ceb240ee4e4e409d19845b2e08cd7fa'
        }).then(response => {
            window.location.reload();
            console.log(response);
        }).catch(reason => {
            console.error(reason);
        });
    };

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
                                                                <button className="btn btn-danger"
                                                                    onClick={(e) => { if (window.confirm('Are you sure to reject this document?')) this.statusUpdate(event, workshop.id, 0, workshop.email, workshop.name) }} >
                                                                    Reject
                                                                </button>
                                                            )
                                                        } else if (workshop.status == 'Rejected') {
                                                            return (
                                                                <button className="btn btn-success"
                                                                    onClick={(e) => { if (window.confirm('Are you sure to approve this document?')) this.statusUpdate(event, workshop.id, 1, workshop.email, workshop.name) }} >
                                                                    Approve
                                                                </button>
                                                            )
                                                        } else {
                                                            return (
                                                                <div>
                                                                    <button className="btn btn-danger"
                                                                        onClick={(e) => { if (window.confirm('Are you sure to reject this document?')) this.statusUpdate(event, workshop.id, 0, workshop.email, workshop.name) }} >
                                                                        Reject
                                                                    </button>
                                                                    <button className="btn btn-success"
                                                                        onClick={(e) => { if (window.confirm('Are you sure to approve this document?')) this.statusUpdate(event, workshop.id, 1, workshop.email, workshop.name) }} >
                                                                        Approve
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    })()
                                                }
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
