import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import ConferenceHolder from '../conference/ConferenceHolder';
import DashBoardHolder from '../dashBoard/DashBoardHolder';
import ReviewHolder from '../Review/ReviewHolder';
import ResearchPaperHolder from '../Review/SubReviewer/ResearchPaperHolder';
import WorkshopHolder from '../Review/SubReviewer/WorkshopHolder';
import AddEditConferencePost from '../conference/conference-posts/conference-post/AddEditConferencePost';
import LoginHolder from '../Login/Login';
import InternalLoginHolder from '../Login/InternalLogin';
import DownloadsHolder from '../downloads/DownloadsHolder';
import RegisterHome from '../Register/RegisterHome';
import ContactUs from '../ContactUs/ContactUs';
import UserViewResearchPaper from '../UserView/UserViewResearchPaper';
import UserViewWorkshop from '../UserView/UserViewWorkshop';
import AddCommitteeMembers from '../committee/AddCommitteeMembers';
import CommitteeMembers from '../committee/ViewComMembers';
import AdminViewComMembers from '../committee/AdminViewComMembers';
import NoMatchingRecordFound from '../common/NoMatchingRecordFound';
import { ConferencePostContext } from '../../context/conference-post.context';
import ReviewContactUS from '../ContactUs/ReviewContactUS';

/* functional component. */
const Main = () => {
    const context = useContext(ConferencePostContext);

    return (
        <div style={{ height: '100%' }}>
            <Switch>
                <Redirect exact from="/" to="/conferences" />
                {/* conferences component */}
                <Route exact path="/conferences">
                    <ConferenceHolder />
                </Route>
                <Route exact path="/conferences/add" render={(props) => (true) ? (  // IF user is an editor = true
                    <AddEditConferencePost{...props} isAdding={true} saveOrUpdate={context.addConferencePost} />) :
                    (<Redirect to="/" />)}
                />
                <Route exact path="/conferences/:conferencePostID/edit" render={(props) => (true) ? ( // IF user is an editor = true
                    <AddEditConferencePost{...props} isAdding={false} saveOrUpdate={context.editConferencePost} />) :
                    (<Redirect to="/" />)}
                />
                <Route exact path="/no-matching-record-found">
                    <NoMatchingRecordFound />
                </Route>
                <Route path="/dashboard">
                    <DashBoardHolder />
                </Route>
                <Route exact path="/review" component={ReviewHolder} />
                <Route exact path="/downloads" component={DownloadsHolder} />
                <Route exact path="/register-home" component={RegisterHome} />
                <Route exact path="/review/research-papers" component={ResearchPaperHolder} />
                <Route exact path="/login" component={LoginHolder} />
                <Route exact path="/internal/login" component={InternalLoginHolder} />
                <Route path="/review/project-proposals" component={WorkshopHolder} />
                <Route path="/contact-us" component={ContactUs} />
                <Route path="/research-papers" component={UserViewResearchPaper} />
                <Route path="/workshops" component={UserViewWorkshop} />
                <Route exact path="/add-members/:id" component={AddCommitteeMembers} />
                <Route path="/add-members/" component={AddCommitteeMembers} />
                <Route path="/members" component={CommitteeMembers} />
                <Route path="/internal/members" component={AdminViewComMembers} />
                <Route exact path="/review/research-papers" component={ResearchPaperHolder} />
                <Route exact path="/login" component={LoginHolder} />
                <Route exact path="/internal/login" component={InternalLoginHolder} />
                <Route path="/review/project-proposals" component={WorkshopHolder} />
                <Route path="/review/contact-us" component={ReviewContactUS} />
            </Switch>
        </div>
    );
};

export default Main;
