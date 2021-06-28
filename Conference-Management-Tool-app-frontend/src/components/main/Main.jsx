import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ConferenceHolder from '../conference/ConferenceHolder';
import DashBoardHolder from '../dashBoard/DashBoardHolder';
import ReviewHolder from '../Review/ReviewHolder';
import ResearchPaperHolder from '../Review/SubReviewer/ResearchPaperHolder';
import WorkshopHolder from '../Review/SubReviewer/WorkshopHolder';
import AddConferencePost from '../conference/conference-posts/conference-post/AddConferencePost';

/* functional component. */
const Main = () => {
    return (
        <div style={{ height: '100%' }}>
            <Switch>
                <Redirect exact from="/" to="/conferences" />
                {/* conferences component */}
                <Route exact path="/conferences">
                    <ConferenceHolder />
                </Route>
                {(true)? (  // IF user is an editor
                    <Route exact path="/conferences/add">
                        <AddConferencePost />
                    </Route>
                ): (
                    <Redirect exact from="/conferences/add" to="/conferences" />
                )}
                <Route path="/dashboard">
                    <DashBoardHolder />
                </Route>
                <Route exact path="/review" component={ReviewHolder} />
                <Route exact path="/review/research-papers" component={ResearchPaperHolder} />
                <Route path="/review/project-proposals" component={WorkshopHolder} />

            </Switch>
        </div>
    );
};

export default Main;


