import React, { Component } from 'react'
import { Document, Page } from "react-pdf";
import { Button } from 'react-bootstrap';

// import { Document, Page } from 'react-pdf/dist/esm/entry.parcel';
import axios from 'axios'
// import pdf from 'url:../../../../../Conference-Management-Tool-app-backend/public/assets/externaluser/60d8c2c9918a8d35cce5adac.pdf'

const url = 'url:D:/SLIIT/3rd Year/2nd Semester/AF/Assignment 2/v3/Conference-Management-Tool/Conference-Management-Tool-app-backend/public'

export class ResearchPaperHolder extends Component {

    state = { numPages: null, pageNumber: 1 };

    constructor(props) {
        super(props);
        this.state = {
            research_papers: [],
            status: ''
        }
    }



    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };


    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));


    componentDidMount() {
        axios.get('http://localhost:3000/research-papers')
            .then((result) => {
                this.setState({ research_papers: result.data })
            }).catch((err) => {
                console.log(`Something went wrong ${err}`);
            });
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

                                                {/* <object width="100%" height="400" data="http://www.africau.edu/images/default/sample.pdf" type="application/pdf"></object> */}
                                                <object width="100%" height="400" data={`http://localhost:3000${research_paper.imagePath}`} type="application/pdf"></object>
                                                {/* <Image style={{ minWidth: '400px', width: '100%' }}
                                                    src={(research_paper.imagePath) ? `/public${research_paper.imagePath}` :'https://via.placeholder.com/1920x1080'} /> */}
                                                {/* <div>
                                                    <nav>
                                                        <button onClick={this.goToPrevPage}>Prev</button>
                                                        <button onClick={this.goToNextPage}>Next</button>
                                                    </nav>

                                                    <div style={{ width: '100%' }}>
                                                        <Document
                                                            // file={}
                                                            onLoadSuccess={this.onDocumentLoadSuccess}
                                                        >
                                                            <Page pageNumber={pageNumber} width={'100%'} />
                                                        </Document>
                                                    </div>

                                                    <p>
                                                        Page {pageNumber} of {numPages}
                                                    </p>
                                                </div> */}
                                            </div>
                                            {/* <h6>{`/public${research_paper.imagePath}`}</h6> */}
                                            {/* <a href="http://localhost:3000/assets/externaluser/60d9894c8f60db47b4336ab7.pdf">VIEW PDF</a> */}
                                            <a href={`http://localhost:3000${research_paper.imagePath}`}>VIEW PDF</a>
                                            <br />
                                            <br />


                                            {/* {
                                                (research_paper.status == 'Approved') ?
                                                    <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                        Reject
                                                    </button>

                                                    :
                                                    (research_paper.status == 'Rejected') ?
                                                        <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                            Approve
                                                        </button>
                                                        :
                                                        <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                            Reject
                                                        </button>,
                                                <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                    Approve
                                                </button>

                                            } */}






                                            {
                                                (() => {
                                                    if (research_paper.status == 'Approved') {
                                                        return (
                                                            <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                                Reject
                                                            </button>
                                                        )
                                                    } else if (research_paper.status == 'Rejected') {
                                                        return (
                                                            <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                                Approve
                                                            </button>
                                                        )
                                                    } else {
                                                        return (
                                                            <div>
                                                                <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                                    Reject
                                                                </button>
                                                                <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                                    Approve
                                                                </button>
                                                            </div>
                                                        )

                                                    }
                                                })()
                                            }

                                            {/* <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                Reject
                                            </button>
                                            <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                Approve
                                            </button> */}


                                            {/* {
                                                (research_paper.status == 'Approved') ?
                                                    <h6 style={{ textAlign: 'unset', color: 'green' }}>Approved</h6>

                                                    :
                                                    (research_paper.status == 'Rejected') ?
                                                        <h6 style={{ textAlign: 'unset', color: 'red' }}>Rejected</h6>
                                                        :
                                                        <h6 style={{ textAlign: 'unset', color: 'blue' }}>Processing</h6>

                                            } */}
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
