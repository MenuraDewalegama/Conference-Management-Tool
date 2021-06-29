import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import SpeakerService from '../service/speaker.service'

const SpeakerContext = React.createContext({
    speakers: [],
    getAllSpeakers: () => {
    },
});


class SpeakerProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            speaker: []
        };
    }

    async componentDidMount() {
        const jwtToken = sessionStorage.getItem(sha256(process.env.JWT_TOKEN_NAME));
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        try {
            await this.getAllSpeakers();
        } catch (error) {
            console.log(error);
        }
    }

    getAllSpeakers() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await SpeakerService.getAllSpeakers();
                if (response.status === 200) {
                    this.setState({
                        internalUsers: response.data
                    });
                    resolve(this.state.internalUsers);
                }
            } catch (error) {
                reject(error);
            }
        });
    }



    render() {
        return (
            <SpeakerContext.Provider value={{
                externalUsers: this.state.speaker,
                getAllInternalUsers: this.getAllInternalUsers.bind(this),

            }
            }>
                {this.props.children}
            </SpeakerContext.Provider>
        );
    }
}
const SpeakerConsumer = SpeakerContext.Consumer;
module.exports = {
    SpeakerContext, SpeakerProvider, SpeakerConsumer
};
