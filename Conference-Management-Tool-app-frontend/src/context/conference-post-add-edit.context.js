/*
@author : Dhanusha Perera
@date : 28/06/2021
*/
import React, {Component} from 'react';

const ConferencePostAddEditContext = React.createContext({});

class ConferencePostAddEditProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keySpeakers: []
        };
    }

    addKeySpeaker(keySpeaker) {
        const tempKeySpeakers = this.state.keySpeakers;
        tempKeySpeakers.push(keySpeaker);
        this.setState({keySpeakers: tempKeySpeakers});
    }

    render() {
        return (
            <ConferencePostAddEditContext.Provider value={
                {
                    keySpeakers: this.state.keySpeakers,
                    addKeySpeaker: this.addKeySpeaker.bind(this)
                }
            }>
                {this.props.children}
            </ConferencePostAddEditContext.Provider>
        );
    }
}

const ConferencePostAddEditConsumer = ConferencePostAddEditContext.Consumer;
module.exports = {
    ConferencePostAddEditProvider,
    ConferencePostAddEditContext,
    ConferencePostAddEditConsumer
};
