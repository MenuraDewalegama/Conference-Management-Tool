import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ConferenceHolder from '../conference/ConferenceHolder';
import DashBoardHolder from '../dashBoard/DashBoardHolder';
import ReviewHolder from '../Review/ReviewHolder';
import ResearchPaperHolder from '../Review/SubReviewer/ResearchPaperHolder';
import WorkshopHolder from '../Review/SubReviewer/WorkshopHolder';
import LoginHolder from '../Login/Login';
import InternalLoginHolder from '../Login/InternalLogin';
import DownloadsHolder from '../downloads/DownloadsHolder';
import RegisterHome from '../Register/RegisterHome';
import ContactUs from '../ContactUs/ContactUs';
import AddKeyNoteSpeeches from '../keyNoteSpeeches/AddKeyNoteSpeeches';
import ViewKeyNoteSpeakers from '../keyNoteSpeeches/ViewKeyNoteSpeakers';


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
                <Route path="/dashboard">
                    <DashBoardHolder />
                </Route>
                <Route exact path="/review" component={ReviewHolder} />
                <Route exact path="/speeches" component={AddKeyNoteSpeeches} />
                <Route exact path="/downloads" component={DownloadsHolder} />
                <Route exact path="/register-home" component={RegisterHome} />
                <Route exact path="/review/research-papers" component={ResearchPaperHolder} />
                <Route exact path="/login" component={LoginHolder} />
                <Route exact path="/internal/login" component={InternalLoginHolder} />
                <Route path="/review/project-proposals" component={WorkshopHolder} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/speakers" component={ViewKeyNoteSpeakers} />

            </Switch>
        </div>
    );
};

export default Main;


