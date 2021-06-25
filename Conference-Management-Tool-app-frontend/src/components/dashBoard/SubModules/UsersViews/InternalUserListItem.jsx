import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { Card } from 'react-bootstrap';

export default function InternalUserListItem(props) {

    const { internalUser, selectInternalUser, removeInternalUser } = props;
    let history = useHistory();

    /** redirecting to the edit page,using product ID. */
    const redirectToEdit = () => {
        history.push(`/dashboard/internalUsers/${internalUser?._id}/edit`);
    };


    return (
        <div className="col-md-4">
            {true ?
                <div className="card bg-dark text-warning">
                    <div className="card-header">
                        <h3 className="text-center text-light">{internalUser.fullName}</h3>
                    </div>
                    <div className="card-body center">
                        {/* Todo: should add imge view */}
                        <h4 className="text-center"><b className="text-light">Contact: </b>{internalUser.contactNo}</h4>
                        <h4 className="text-center"><b className="text-light">Email: </b>{internalUser.email}</h4>
                        <h4 className="text-center"><b className="text-light">User Type: </b>{internalUser.type}</h4>
                        {/* <h4 className="text-center"><b className="text-light">password: </b>{internalUser.password}</h4> */}
                        <h4 className="text-center"><b className="text-light">image URL</b>{internalUser.imagePath}</h4>
                    </div>
                    <div className="card-footer center">
                        <button className="btn btn-info"
                            onClick={() => {
                                selectInternalUser(internalUser);
                                redirectToEdit();
                            }} >
                            <PencilSquare style={{ fontSize: '1.3rem' }} />
                        </button>
                        <button className="btn btn-denger"
                            onClick={() => {
                                // selectInternalUser(internalUser);
                                removeInternalUser(internalUser);
                            }}>Delete
                    </button>
                    </div>
                </div> : []}

        </div>
    );
}