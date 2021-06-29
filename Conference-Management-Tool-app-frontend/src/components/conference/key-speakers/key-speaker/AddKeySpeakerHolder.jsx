/*
@author : Dhanusha Perera
@date : 26/06/2021
*/

import React, {Component} from 'react';
import AddKeySpeaker from './AddKeySpeaker';

class AddKeySpeakerHolder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noOfKeySpeakersArr: [],
            noOfKeySpeakers: this.props.noOfKeySpeakers,
            getNoOfKeySpeakers: this.props.getNoOfKeySpeakers
        };
    }

    componentDidMount() {
        this.calcNoOfKeySpeakers();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.noOfKeySpeakers !== this.props.noOfKeySpeakers) {
            this.calcNoOfKeySpeakers();
        }
    }

    calcNoOfKeySpeakers() {
        const tempArr = [];
        for (let i = 1; i <= this.state.getNoOfKeySpeakers(); i++) {
            // console.log(i);
            tempArr.push(i);
        }
        this.setState({noOfKeySpeakersArr: tempArr});
    }

    render() {

        return (
            <div>
                {this.state.noOfKeySpeakersArr.map(elem => {
                    return (
                        <AddKeySpeaker key={elem}
                                       idx={elem}
                                       getKeySpeakerDetails={this.props.getKeySpeakerDetails}
                                       setOnSubmitClick={this.props.setOnSubmitClick}
                        />
                    );
                })}
            </div>
        );
    }
}

export default AddKeySpeakerHolder;


