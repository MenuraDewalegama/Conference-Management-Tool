import React, { useState } from 'react';
import { CartPlus, PencilSquare } from 'react-bootstrap-icons';
import { Link, useHistory } from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InternalUserListItem(props) {

    const { internalUser } = props;
    let history = useHistory();

    return (
        <div style={{ marginRight: '5%' }}>
            <br />
            <div className="row">
                <div className="col">
                    <div className="card" style={{ width: '20rem', height: '40rem' }}>
                        <div className="card-body">
                            <Card.Title><b>{internalUser.fullName}</b></Card.Title>
                            <Card.Text style={fontStyle}>
                                contactNo: {internalUser.contactNo}
                            </Card.Text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}