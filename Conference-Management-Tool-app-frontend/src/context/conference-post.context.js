/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import React, {Component} from 'react';

import conferencePostService from '../service/conference-post.service';

const ConferencePostContext = React.createContext({
    conferencePosts: []
});

class ConferencePostProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            conferencePosts: []
        };
    }

    componentDidMount() {
        conferencePostService.getAllConferencePosts().then(conferencePosts => {
            this.setState((prevState) => {
                return prevState.conferencePosts = conferencePosts;
            });
        }).catch(reason => {
            console.log(`Something went wrong when retrieving conferencePosts from backend.`);
        });
    }

    /** add a conference post. */
    _addConferencePost(conferencePost) {
        console.log('Add conference post using context!');
    }

    /** edit a conference post. */
    _editConferencePost(conferencePost) {
        console.log('Edit conference post using context!');
    }

    /** delete a conference post by ID. */
    _deleteConferencePost(conferencePostID) {
        console.log('Delete conference post using context!');
    }

    render() {
        return (
            <ConferencePostContext.Provider
                value={
                    {
                        conferencePosts: this.state.conferencePosts,
                        addConferencePost: this._addConferencePost.bind(this),
                        editConferencePost: this._editConferencePost.bind(this),
                        deleteConferencePost: this._deleteConferencePost.bind(this),
                    }
                }>
                {this.props.children}
            </ConferencePostContext.Provider>
        );
    }
}

const ConferenceConsumer = ConferencePostContext.Consumer;
module.exports = {
    ConferencePostProvider,
    ConferencePostContext,
    ConferenceConsumer
};
