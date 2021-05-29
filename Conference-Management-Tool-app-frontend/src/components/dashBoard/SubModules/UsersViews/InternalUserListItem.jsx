import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { Card } from 'react-bootstrap';

export default function InternalUserListItem(props) {

    const { internalUser } = props;
    let history = useHistory();

    return (
        <div>
            <br />
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <div className="cart-title"><b>{internalUser.fullName}</b></div>
                            <div className="cart-text" >
                            <b>{internalUser.contactNo}</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}