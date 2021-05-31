import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { InternalUserContext } from '../../../../context/internalUser.context'
import CreateEditUserView from './CreateEditUserView';
import InternalUsers from './InternalUsers';

export default class InternalUsersViewHolder extends React.Component {

    static contextType = InternalUserContext;
    constructor(props) {
        super(props);
    }

    /** temporary method to add a new internalUser. */
    addInternalUser(internalUser) {
        return this.context.addInternalUser(internalUser);
    }

    /** temporary method to update the internalUser. */
    updateInternalUser(internalUser) {
        return this.context.updateInternalUser(internalUser);
    }

    render() {
        // const isAdmin = (atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))) === 'ADMIN');
        return <div>
            <h1 className="center">Welcome to Users view</h1>
            <Switch>
                <Route exact path='/dashboard/internalusers'>
                    <InternalUsers internalUsers={(this.context?.internalUsers) ? this.context?.internalUsers : []} />
                </Route>
                <Route path='/dashboard/internalusers/create'
                    render={(props) =>
                        <CreateEditUserView {...props} saveOrUpdate={this.addInternalUser.bind(this)} />} />
                <Route path='/dashboard/internalUsers/:internalUserID/edit'
                    render={(props) =>
                        <CreateEditUserView {...props} saveOrUpdate={this.updateInternalUser.bind(this)} />} />
            </Switch>
        </div>
    }

}