import React from 'react';
import { Link } from 'react-router-dom';
import {InternalUserContext} from '../../../../context/internalUser.context'
import InternalUsers from './InternalUsers';

export default class UsersViewHolder extends React.Component {

    static contextType = InternalUserContext
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <h1 className="center">Welcome to Users view</h1>
            <Switch>
                <Route path='/internalusers'>
                  <InternalUsers internalUsers={(this.context?.internalUsers)? this.context?.internalUsers : []} />
                </Route>
                <Route exat path='/dashboard/craetusers'>
                    <CreateUserView/>
                </Route>
          </Switch>
        </div>
    }

}