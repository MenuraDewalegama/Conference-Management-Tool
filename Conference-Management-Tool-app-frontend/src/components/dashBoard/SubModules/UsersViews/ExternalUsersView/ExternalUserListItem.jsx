import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { Card } from 'react-bootstrap';

export default function ExternalUserListItem(props) {

    const { externalUser, selectExternalUser, removeExternalUser } = props;
    let history = useHistory();

    /** redirecting to the edit page,using product ID. */
    const redirectToEdit = () => {
        history.push(`/dashboard/externalUsers/${externalUser?._id}/edit`);
    };


    return (
        <div className="col-md-4">
            {true ?
                <div className="card bg-dark text-warning">
                    <div className="card-header">
                        <h3 className="text-center text-light">{externalUser.name}</h3>
                    </div>
                    <div className="card-body center">
                        {/* Todo: should add imge view */}
                        <h4 className="text-center"><b className="text-light">Contact: </b>{externalUser.contactNo}</h4>
                        <h4 className="text-center"><b className="text-light">Email: </b>{externalUser.email}</h4>
                        <h4 className="text-center"><b className="text-light">User Type: </b>{externalUser.type}</h4>
                        {/* <h4 className="text-center"><b className="text-light">password: </b>{internalUser.password}</h4> */}
                        <h4 className="text-center"><b className="text-light">image URL</b>{externalUser.imagePath}</h4>
                        <h4 className="text-center"><b className="text-light">Activity Type</b>{externalUser.activityType}</h4>
                        <h4 className="text-center"><b className="text-light">Category</b>{externalUser.category}</h4>
                        <h4 className="text-center"><b className="text-light">Activity Information</b>{externalUser.activityInformation}</h4>
                        <h4 className="text-center"><b className="text-light">Status</b>{externalUser.status}</h4>
                    </div>
                    <div className="card-footer center">
                        <button className="btn btn-info"
                            onClick={() => {
                                selectExternalUser(externalUser);
                                redirectToEdit();
                            }} >
                            <PencilSquare style={{ fontSize: '1.3rem' }} />
                        </button>
                        <button className="btn btn-denger"
                            onClick={() => {
                                // selectInternalUser(internalUser);
                                removeExternalUser(externalUser);
                            }}>Delete
                    </button>
                    </div>
                </div> : []}

        </div>
    );
}