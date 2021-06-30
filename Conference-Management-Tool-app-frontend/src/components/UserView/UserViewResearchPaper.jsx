import React, { Component } from 'react'
import axios from 'axios'


export class UserViewResearchPaper extends Component {

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

    render() {
        return (
            <div className="container" style={{ margin: 'auto-align', textAlign: 'center' }}>
                <h2>This is for research papers</h2>
                <br />
                <div className="row" style={{ marginTop: "2%" }}>
                    {
                        (this.state.research_papers.length > 0 && this.state.research_papers.map((research_paper) => (
                            (research_paper.type == "RESEARCHER" && research_paper.status == "Approved") ?
                                <div className="col-md-6">
                                    <div className="card bg-dark">
                                        <div className="card-header card-header-light card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">book</i>
                                            </div>
                                        </div>

                                        <div className="p-5 card-body mb-3">
                                            <h6>Author Name : {research_paper.name}</h6>
                                            <div>
                                                <object width="100%" height="400" data={`http://localhost:3000${research_paper.imagePath}`} type="application/pdf"></object>
                                            </div>
                                            <a href={`http://localhost:3000${research_paper.imagePath}`}>VIEW PDF</a>
                                            <br />
                                            <br />
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

export default UserViewResearchPaper
