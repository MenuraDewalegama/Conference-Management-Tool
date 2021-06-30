import React, { Component } from 'react'
import axios from 'axios'


export class UserViewWorkshop extends Component {

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
            })
    }

    render() {
        return (
            <div className="container" style={{ margin: 'auto-align', textAlign: 'center' }}>
                <h2>This is for workshop details</h2>

                <br />
                <div className="row" style={{ marginTop: "2%" }}>
                    {
                        (this.state.workshops.length > 0 && this.state.workshops.map((workshop) => (
                            (workshop.type == "PRESENTER" && workshop.status == "Approved") ?
                                <div className="col-md-6">
                                    <div className="card bg-dark">
                                        <div className="card-header card-header-light card-header-icon">
                                            <div className="card-icon">
                                                <i className="material-icons">mic</i>
                                            </div>
                                        </div>


                                        <div className="card-header">
                                            <div className="p-3 card-body mb-3">
                                                <h6>Author : {workshop.name}</h6>
                                                <div>
                                                    <object width="100%" height="400" data={`http://localhost:3000${workshop.imagePath}`} type="application/pdf"></object>
                                                </div>
                                                <a href={`http://localhost:3000${workshop.imagePath}`}>VIEW PDF</a>
                                                <br />
                                                <br />
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

export default UserViewWorkshop
