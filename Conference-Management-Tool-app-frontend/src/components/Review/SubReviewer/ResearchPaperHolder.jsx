import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import EmailService from '../../../service/email.service'
import axios from 'axios'

export class ResearchPaperHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            research_papers: [],
            status: ''
        }
    }

    // Call the endpoint when starting the relevent page 
    componentDidMount() {
        axios.get('http://localhost:3000/papers')
            .then((result) => {
                this.setState({ research_papers: result.data })
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
                    const mailMessage = "We have approved your research paper"
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
                    const mailMessage = "We have rejected your research paper"
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
        const { pageNumber, numPages } = this.state;
        return (
            <div className="container" style={{ margin: 'auto-align', textAlign: 'center' }}>
                <h2>This is for research papers</h2>
                <Button className='primary' href='/review'>Home</Button>
                <br />
                <div className="row" style={{ marginTop: "2%" }}>
                    {
                        (this.state.research_papers.length > 0 && this.state.research_papers.map((research_paper) => (
                            (research_paper.type == "RESEARCHER") ?
                                <div className="col-md-6">
                                    <div className="card bg-dark">


                                        {
                                            (() => {
                                                if (research_paper.status == 'Approved') {
                                                    return (
                                                        <div>
                                                            <div className="card-header card-header-success card-header-icon">
                                                                <div className="card-icon">
                                                                    <i className="material-icons">done</i>
                                                                    <h6>Approved</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                } else if (research_paper.status == 'Rejected') {
                                                    return (
                                                        <div>
                                                            <div className="card-header card-header-danger card-header-icon">
                                                                <div className="card-icon">
                                                                    <i className="material-icons">info_outline</i>
                                                                    <h6>Rejected</h6>
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
                                                                    <h6>Processing</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )

                                                }
                                            })()
                                        }


                                        <div className="p-3 card-body mb-3">
                                            <h5></h5>
                                            <h6>Author Name : {research_paper.name}</h6>
                                            <h6>Email : {research_paper.email}</h6>
                                            <h6>Contact No : {research_paper.contactNo}</h6>
                                            <h5></h5>
                                            <div>
                                                <object width="100%" height="400" data={`http://localhost:3000${research_paper.imagePath}`} type="application/pdf"></object>
                                            </div>
                                            <a href={`http://localhost:3000${research_paper.imagePath}`}>VIEW PDF</a>
                                            <br />
                                            <br />

                                            {
                                                (() => {
                                                    if (research_paper.status == 'Approved') {
                                                        return (
                                                            <button className="btn btn-danger"
                                                                onClick={(e) => { if (window.confirm('Are you sure to reject this document?')) this.statusUpdate(event, research_paper.id, 0, research_paper.email, research_paper.name) }} >
                                                                Reject
                                                            </button>
                                                        )
                                                    } else if (research_paper.status == 'Rejected') {
                                                        return (
                                                            <button className="btn btn-success"
                                                                onClick={(e) => { if (window.confirm('Are you sure to approvr this document?')) this.statusUpdate(event, research_paper.id, 1, research_paper.email, research_paper.name) }} >
                                                                Approve
                                                            </button>
                                                        )
                                                    } else {
                                                        return (
                                                            <div>
                                                                <button className="btn btn-danger"
                                                                    onClick={(e) => { if (window.confirm('Are you sure to reject this document?')) this.statusUpdate(event, research_paper.id, 0, research_paper.email, research_paper.name) }} >
                                                                    Reject
                                                                </button>
                                                                <button className="btn btn-success"
                                                                    onClick={(e) => { if (window.confirm('Are you sure to approve this document?')) this.statusUpdate(event, research_paper.id, 1, research_paper.email, research_paper.name) }} >
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
                                :
                                ''
                        )))
                    }
                </div>
            </div>
        )
    }
}

export default ResearchPaperHolder
