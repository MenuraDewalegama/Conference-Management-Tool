import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import ConferenceHolder from '../conference/ConferenceHolder';
import DashBoardHolder from '../dashBoard/DashBoardHolder';

/* functional component. */
const Main = () => {
    return (
        <div style={{ height: '100%' }}>
            <Switch>
                <Redirect exact from="/" to="/conferences"/>
                {/* conferences component */}
                <Route exact path="/conferences">
                    <ConferenceHolder/>
                </Route>
                <Route path="/dashboard">
                    <DashBoardHolder/>
                </Route>
            </Switch>
        </div>
    );
};

export default Main;


