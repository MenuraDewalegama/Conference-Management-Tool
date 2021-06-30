/*
@author : Janaka Chinthana
@date : 26/05/2021
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import { DashboardContext } from '../../context/dashboard.context';
// import { InternalUserContext } from '../../context/internalUser.context';

export default class DashBoard extends React.Component {
    // static contextType = InternalUserContext;
    static contextType = DashboardContext;
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.context);
        const userCount = this.context?.internalUsers;
        const editorCount = [];
        const reviewerCount = [];

        const extrenalUserCount = this.context?.externalUsers;
        const PrasenterCount = [];
        const ResearcherCount = [];
        const AttendeeCount = [];

        console.log("extrenalUserCount");
        console.log(extrenalUserCount);

        for (let index = 0; index < userCount.length; index++) {
            if (userCount[index].type == "Editor") {
                editorCount.push(userCount[index])
            } else if (userCount[index].type == "Reviewer") {
                reviewerCount.push(userCount[index])
            }
        }

        for (let index = 0; index < extrenalUserCount.length; index++) {
            if (extrenalUserCount[index].type == "ATTENDEE") {
                AttendeeCount.push(extrenalUserCount[index])
            } else if (extrenalUserCount[index].type == "PRESENTER") {
                PrasenterCount.push(extrenalUserCount[index])
            } else if (extrenalUserCount[index].type == "RESEARCHER") {
                ResearcherCount.push(extrenalUserCount[index])
            }
        }

        return <div>
            <br />
            <h1 className="center">Welcome to DashBoard</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <hr />
                        <div className="row bg-dark text-light">
                            <div className="container">
                                <h2 className="center">Research Papers & Workshops Summary</h2>
                            </div>
                        </div>
                        <div className="row bg-dark">
                            <div className="col-lg-4">
                                <div className="card card-stats">
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">info_outline</i>
                                        </div>
                                        <p className="card-category text-danger">Reseach Papers</p>
                                        <h3 className="card-title text-danger">{ResearcherCount.length}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/review" className="btn btn-danger">View Research Papers Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card card-stats">
                                    <div className="card-header card-header-info card-header-icon">
                                        <div className="card-icon">
                                            <i className="fa fa-user-circle"></i>
                                        </div>
                                        <p className="card-category text-info">Work Shops</p>
                                        <h3 className="card-title text-info">{PrasenterCount.length}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/review" className="btn btn-info">View Work Shops Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="card card-stats">
                                    <div className="card-header card-header-success card-header-icon">
                                        <div className="card-icon">
                                            <i className="fa fa-user-circle"></i>
                                        </div>
                                        <p className="card-category text-success">User Feedback</p>
                                        <h3 className="card-title text-success">{PrasenterCount.length}</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/review" className="btn btn-success">User Feedback Summery</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row bg-dark text-light">
                            <div className="container">
                                <h2 className="center">Internal & External Users Summary</h2>
                            </div>
                        </div>
                        <div className="row bg-dark">
                            <div className="col-lg-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-warning card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">people_alt</i>
                                            <br />
                                            <br />
                                            <br />
                                            <i className="material-icons">science</i>
                                            <br />
                                            <br />
                                            <br />
                                            <i className="material-icons">border_color</i>
                                            <br />
                                            <br />
                                            <br />
                                            <i className="material-icons">border_color</i>
                                        </div>
                                        <br />
                                        <div>
                                            <p className="card-category">Total External Users</p>
                                            <h3 className="card-title">{extrenalUserCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Attendee Count</p>
                                            <h3 className="card-title">{AttendeeCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Prasenter Count</p>
                                            <h3 className="card-title">{PrasenterCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Researcher Count</p>
                                            <h3 className="card-title">{ResearcherCount.length}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/dashboard/externalusers" className="btn btn-warning">View Users</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card card-stats">
                                    <div className="card-header card-header-primary card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">people_alt</i>
                                            <br />
                                            <br />
                                            <br />
                                            <i className="material-icons">science</i>
                                            <br />
                                            <br />
                                            <br />
                                            <i className="material-icons">border_color</i>
                                        </div>
                                        <br />
                                        <div>
                                            <p className="card-category">Total Intrernal Users</p>
                                            <h3 className="card-title">{userCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Reviewer Count</p>
                                            <h3 className="card-title">{reviewerCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Writers Count</p>
                                            <h3 className="card-title">{editorCount.length}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/dashboard/internalusers" className="btn btn-primary">View Users</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="row bg-dark text-light">
                            <div className="container">
                                <h2 className="center">Post Summery</h2>
                            </div>
                        </div>
                        <div className="row bg-dark">
                            <div className="col-md-4">
                                <div className="card card-chart">
                                    <div className="card-header card-header-success">
                                        <div className="ct-chart" id="dailySalesChart"></div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Conference</h4>
                                        {/* <p className="card-category">
                                            <span className="text-success"><i className="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p> */}
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/" className="btn btn-danger">View Posts</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

}