import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import axios from 'axios'

export class ReviewHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            papers: [],
            research_paper_count: 0,
            research_paper_count_processing: 0,
            research_paper_count_approved: 0,
            research_paper_count_rejectd: 0,
            workshop_count: 0,
            workshop_count_processing: 0,
            workshop_count_approved: 0,
            workshop_count_rejectd: 0,
            status: '',
            messages: []
        }
    }

    // Call the endpoint when starting the relevent page 
    componentDidMount() {
        axios.get('http://localhost:3000/papers')
            .then((result) => {
                this.setState({ papers: result.data });
                if (this.state.papers.length > 0) {
                    let count1 = 0;
                    let count1_processing = 0;
                    let count1_approoved = 0;
                    let count1_rejected = 0;
                    let count2 = 0;
                    let count2_processing = 0;
                    let count2_approoved = 0;
                    let count2_rejected = 0;

                    this.state.papers.forEach(paper => {
                        if (paper.type == 'RESEARCHER') {
                            count1 = count1 + 1;
                            if (paper.status == 'Processing') {
                                count1_processing = count1_processing + 1;
                            } else if (paper.status == 'Approved') {
                                count1_approoved = count1_approoved + 1;
                            } else if (paper.status == 'Rejected') {
                                count1_rejected = count1_rejected + 1;
                            }

                        } else if (paper.type == 'PRESENTER') {
                            count2 = count2 + 1;
                            if (paper.status == 'Processing') {
                                count2_processing = count2_processing + 1;
                            } else if (paper.status == 'Approved') {
                                count2_approoved = count2_approoved + 1;
                            } else if (paper.status == 'Rejected') {
                                count2_rejected = count2_rejected + 1;
                            }
                        }
                    });

                    this.setState({
                        research_paper_count: count1,
                        research_paper_count_processing: count1_processing,
                        research_paper_count_approved: count1_approoved,
                        research_paper_count_rejectd: count1_rejected,
                        workshop_count: count2,
                        workshop_count_processing: count2_processing,
                        workshop_count_approved: count2_approoved,
                        workshop_count_rejectd: count2_rejected
                    });
                }
            }).catch((err) => {
                console.log(`Something went wrong ${err}`);
            });


        axios.get('http://localhost:3000/contact')
            .then((result) => {
                this.setState({ messages: result.data })
            }).catch((err) => {
                console.log(`Something went wrong ${err}`);
            });
    }

    render() {
        return (
            <div className="container" >
                <div style={{ marginTop: 'auto-align', textAlign: 'center' }}>
                    <h2 style={{ fontFamily: 'roboto' }}>Manage User Research Paper and Worksop Proposals</h2>
                    <div style={{ margin: 'auto-align' }}>
                        <Button href="/review/research-papers">Research Papers</Button>
                        <Button href="/review/project-proposals">Project Proposals</Button>
                    </div>
                </div>


                <div style={{ marginTop: '5%' }}>

                    <div className='p-5 card bg-dark'>

                        {/* Research Papers Section */}
                        <h3>Research Papers</h3>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">list</i>
                                        </div>
                                        <p className="card-category">All</p>
                                        <h3 className="card-title">{this.state.research_paper_count}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-warning card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">loop</i>
                                        </div>
                                        <p className="card-category">Processing</p>
                                        <h3 className="card-title">{this.state.research_paper_count_processing}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-success card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">done</i>
                                        </div>
                                        <p className="card-category">Approved</p>
                                        <h3 className="card-title">{this.state.research_paper_count_approved}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">info_outline</i>
                                        </div>
                                        <p className="card-category">Rejected</p>
                                        <h3 className="card-title">{this.state.research_paper_count_rejectd}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-5 card bg-dark'>

                        {/* Workshop Proposals Section */}
                        <h3>Workshop Proposals</h3>
                        <div className="row" style={{ marginTop: '2%' }}>
                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">list</i>
                                        </div>
                                        <p className="card-category">All</p>
                                        <h3 className="card-title">{this.state.workshop_count}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-warning card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">loop</i>
                                        </div>
                                        <p className="card-category">Processing</p>
                                        <h3 className="card-title">{this.state.workshop_count_processing}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-success card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">done</i>
                                        </div>
                                        <p className="card-category">Approved</p>
                                        <h3 className="card-title">{this.state.workshop_count_approved}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">info_outline</i>
                                        </div>
                                        <p className="card-category">Rejected</p>
                                        <h3 className="card-title">{this.state.workshop_count_rejectd}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='p-5 card bg-dark'>

                        {/* Contact Us Section */}
                        <h3>Contct Us Messages</h3>
                        <div className="row" style={{ marginTop: '2%' }}>
                            <div className="col-lg-3">
                                <div className="card card-stats bg-light">
                                    <div className="card-header card-header card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">list</i>
                                        </div>
                                        <p className="card-category">All</p>

                                        {
                                            (this.state.messages.length > 0) ?
                                                <h3 className="card-title">{this.state.messages.length}</h3>
                                                :
                                                <h3 className="card-title">0</h3>
                                        }
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <Button href="/review/contact-us">Manage Messages</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
                <div></div>
                <br />
                <br />
            </div>
        )
    }
}

export default ReviewHolder
