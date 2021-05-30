/*
@author : Janaka Chinthana
@date : 26/05/2021
*/

import React from 'react';
import { Link } from 'react-router-dom';
import './DashBoard.css';
import { InternalUserContext } from '../../context/internalUser.context';


export default class DashBoard extends React.Component {
    static contextType = InternalUserContext;
    constructor(props) {
        super(props);
    }

    render() {
        const userCount = this.context?.internalUsers;
        const writerCount = [];
        const reseacherCount = [];

        for (let index = 0; index < userCount.length; index++) {
            if (userCount[index].type == "Writer") {
                writerCount.push(userCount[index])
            } else {
                reseacherCount.push(userCount[index])
            }

        }

        return <div>
            <br />
            <h1 className="center">Welcome to DashBoard</h1>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-stats">
                                    <div className="card-header card-header-dark card-header-icon">
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
                                            <p className="card-category">Reseachers Count</p>
                                            <h3 className="card-title">{reseacherCount.length}</h3>
                                        </div>
                                        <hr />
                                        <div>
                                            <p className="card-category">Writers Count</p>
                                            <h3 className="card-title">{writerCount.length}</h3>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="center">
                                            <Link to="/dashboard/internalusers" className="btn btn-info">View Users</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card card-stats">
                                    <div className="card-header card-header-success card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">store</i>
                                        </div>
                                        <p className="card-category">Work Shops</p>
                                        <h3 className="card-title">12</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">date_range</i> Up-Comming...
                  </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card card-stats">
                                    <div className="card-header card-header-danger card-header-icon">
                                        <div className="card-icon">
                                            <i className="material-icons">info_outline</i>
                                        </div>
                                        <p className="card-category">Reseach Papers</p>
                                        <h3 className="card-title">75</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">local_offer</i> View More...
                  </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="card card-stats">
                                    <div className="card-header card-header-info card-header-icon">
                                        <div className="card-icon">
                                            <i className="fa fa-user-circle"></i>
                                        </div>
                                        <p className="card-category">Followers</p>
                                        <h3 className="card-title">+245</h3>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">update</i> Just Updated
                  </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="card card-chart">
                                    <div className="card-header card-header-success">
                                        <div className="ct-chart" id="dailySalesChart"></div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Daily Sales</h4>
                                        <p className="card-category">
                                            <span className="text-success"><i className="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-chart">
                                    <div className="card-header card-header-warning">
                                        <div className="ct-chart" id="websiteViewsChart"></div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Email Subscriptions</h4>
                                        <p className="card-category">Last Campaign Performance</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">access_time</i> campaign sent 2 days ago
                  </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card card-chart">
                                    <div className="card-header card-header-danger">
                                        <div className="ct-chart" id="completedTasksChart"></div>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Completed Tasks</h4>
                                        <p className="card-category">Last Campaign Performance</p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="stats">
                                            <i className="material-icons">access_time</i> campaign sent 2 days ago
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