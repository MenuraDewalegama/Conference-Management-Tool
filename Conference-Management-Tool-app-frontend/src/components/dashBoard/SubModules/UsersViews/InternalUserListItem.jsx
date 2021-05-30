import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { Card } from 'react-bootstrap';

export default function InternalUserListItem(props) {

    const { internalUser, selectInternalUser } = props;
    let history = useHistory();

    /** redirecting to the edit page,using product ID. */
    const redirectToEdit = () => {
        history.push(`/dashboard/internalUsers/${internalUser?._id}/edit`);
    };

    return (
        <div className="col">
            {true ?
                <div className="card">
                    <div className="card-body center">
                        {/* Todo: should add imge view */}
                        <h3 className="card-title"><b>Name: </b>{internalUser.fullName}</h3>
                        <div className="card-text"><b>Contact: </b>{internalUser.contactNo}</div>
                        <div className="card-text"><b>Email: </b>{internalUser.email}</div>
                        <div className="card-text"><b>User Type: </b>{internalUser.type}</div>
                        <div className="card-text"><b>password: </b>{internalUser.password}</div>   {/* Todo:  should remove */}
                        <div className="card-text"><b>{internalUser.imagePath}</b></div>
                    </div>
                    <button
                        onClick={() => {
                            selectInternalUser(internalUser);
                            redirectToEdit();
                        }}
                        title="Edit"
                    >
                        <PencilSquare style={{ fontSize: '1.6rem' }} />
                    </button>
                </div> :
                <div>
                </div>}

        </div>
    );
}