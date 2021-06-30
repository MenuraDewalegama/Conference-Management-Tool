import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { ExternalUserContext } from '../../../../../context/externalUser.context'
import CreateEditExternalUserView from './CreateEditExternalUserView';
import ExternalUsers from './ExternalUsers';

export default class ExternalUsersViewHolder extends React.Component {

    static contextType = ExternalUserContext;
    constructor(props) {
        super(props);
    }

    /** temporary method to add a new internalUser. */
    addExternalUser(externalUser) {
        return this.context.addExternalUser(externalUser);
    }

    /** temporary method to update the internalUser. */
    updateExternalUser(externalUser) {
        return this.context.updateExternalUser(externalUser);
    }

    render() {
        console.log(this.context.externalUsers);
        // const isAdmin = (atob(sessionStorage.getItem(sha256(process.env.AUTHENTICATED_USER_TYPE))) === 'ADMIN');
        return <div>
            <h1 className="center">Welcome to Users view</h1>
            <Switch>
                <Route exact path='/dashboard/externalusers'>
                    <ExternalUsers externalUsers={(this.context?.externalUsers) ? this.context?.externalUsers : []} />
                </Route>
                {/* <Route path='/dashboard/internalusers/create'
                    render={(props) =>
                        <CreateEditUserView {...props} saveOrUpdate={this.addInternalUser.bind(this)} />} /> */}
                <Route path='/dashboard/externalusers/:externalUserID/edit'
                    render={(props) =>
                        <CreateEditExternalUserView {...props} saveOrUpdate={this.updateExternalUser.bind(this)} />} />
            </Switch>
        </div>
    }

}