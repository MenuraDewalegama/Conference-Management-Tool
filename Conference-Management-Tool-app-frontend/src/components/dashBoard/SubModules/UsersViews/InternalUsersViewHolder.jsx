import React from 'react';
import { Link } from 'react-router-dom';
import {InternalUserContext} from '../../../../context/internalUser.context'

export default class UsersViewHolder extends React.Component {

    static contextType = InternalUserContext
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1 className="center">Welcome to Users view</h1>
            <div className="center">
                <Link to="/dashboard/craetusers">Create User</Link>
            </div>
        </div>
    }

}