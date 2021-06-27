import React, { Component } from 'react'
import axios from 'axios'

export class ResearchPaperHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            research_papers: [],
            status: ''
        }
    }

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
        return (
            <div className="container" style={{ margin: 'auto-align', textAlign: 'center' }}>
                <h1>This is for research papers</h1>
                <div className="row" style={{ marginTop: "2%" }}>
                    {
                        (this.state.research_papers.length > 0 && this.state.research_papers.map((research_paper) => (
                            (research_paper.type == "RESEARCHER") ?
                                <div className="col-md-6">
                                    <div className="card-header">
                                        <div className="p-3 card-body mb-3">
                                            <h4>Author Name : {research_paper.name}</h4>
                                            <h6>Email : {research_paper.email}</h6>
                                            <h6>Contact No : {research_paper.contactNo}</h6>
                                            <button type="button" className="btn btn-danger" onClick={event => this.statusUpdate(event, research_paper.id, 0)}>
                                                Reject
                                            </button>
                                            <button type="button" className="btn btn-success" onClick={event => this.statusUpdate(event, research_paper.id, 1)}>
                                                Approve
                                            </button>

                                            {
                                                (research_paper.status == 'Approved') ?
                                                    <h6 style={{ textAlign: 'unset', color: 'green' }}>Approved</h6>
                                                    :
                                                    <h6 style={{ textAlign: 'unset', color: 'red' }}>Rejected</h6>
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
