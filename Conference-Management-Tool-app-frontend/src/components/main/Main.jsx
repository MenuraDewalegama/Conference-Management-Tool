import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ConferenceHolder from '../conference/ConferenceHolder';

/* functional component. */
const Main = () => {
    return (
        <div>
            <Switch>
                <Redirect exact from="/" to="/conferences"/>
                {/* conferences component */}
                <Route path="/conferences">
                    <ConferenceHolder/>
                </Route>
            </Switch>
        </div>
    );
};

export default Main;


