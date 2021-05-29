import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import {InternalUserContext} from '../../../../context/internalUser.context'
import CreateUserView from './CreateUserView';
import InternalUsers from './InternalUsers';

export default class InternalUsersViewHolder extends React.Component {

    static contextType = InternalUserContext;
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.context);
        return <div>
            <h1 className="center">Welcome to Users view</h1>
            <Switch>
                <Route path='/dashboard/internalusers'>
                  <InternalUsers internalUsers={(this.context?.internalUsers) ? this.context?.internalUsers : []} />
                </Route>
                <Route path='/dashboard/craetusers'>
                    <CreateUserView/>
                </Route>
          </Switch>
        </div>
    }

}