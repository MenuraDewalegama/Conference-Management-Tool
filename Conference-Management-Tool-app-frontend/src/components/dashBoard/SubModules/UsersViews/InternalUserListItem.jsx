import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { Card } from 'react-bootstrap';

export default function InternalUserListItem(props) {

    const { internalUser } = props;
    let history = useHistory();

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h1 className="card-title"><b>{internalUser.fullName}</b></h1>
                    <div className="card-text"><b>{internalUser.contactNo}</b></div>
                    <div className="card-text"><b>{internalUser.email}</b></div>
                    <div className="card-text"><b>{internalUser.type}</b></div>
                    <div className="card-text"><b>{internalUser.imagePath}</b></div>
                </div>
            </div>
        </div>
    );
}