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
            this.setState((prevState) => {
                return prevState.conferencePosts = [];
            });
            console.log(`Something went wrong when retrieving conferencePosts from backend. Check backend services are up and running.`);
        });
    }

    _getConferencePostByID(conferencePostID) {
        return new Promise(async (resolve, reject) => {
            try {
                /* TODO: check response. */
                const response = await conferencePostService.getConferencePostByID(conferencePostID);
                resolve(response);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** add a conference post. */
    _addConferencePost(conferencePost) {
        console.log('Add conference post using context!');
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await conferencePostService.saveConferencePost(conferencePost).data);
            } catch (error) {
                reject(error);
            }
        });
    }

    /** edit a conference post. */
    _editConferencePost(conferencePostID, conferencePost) {
        console.log('Edit conference post using context!');
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await conferencePostService.updateConferencePost(conferencePostID, conferencePost));
            } catch (error) {
                reject(error);
            }
        });
    }

    /** delete a conference post by ID. */
    _deleteConferencePost(conferencePostID) {
        console.log('Delete conference post using context!');
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await conferencePostService.deleteConferencePost(conferencePostID));
            } catch (error) {
                reject(error);
            }
        });
    }

        /** approve a conference post by ID. */
        _approveConferencePost(conferencePostID) {
            console.log('Approve conference post using context!');
            return new Promise(async (resolve, reject) => {
                try {
                    resolve(await conferencePostService.approveConferencePost(conferencePostID));
                } catch (error) {
                    reject(error);
                }
            });
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
                        getConferencePostByID: this._getConferencePostByID.bind(this),
                        approveConferencePost: this._approveConferencePost.bind(this)
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
