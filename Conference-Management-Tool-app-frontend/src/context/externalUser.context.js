import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import ExternalUserService from '../service/externalUser.service'

const ExternalUserContext = React.createContext({
    externalUser: [],
    addExternalUser: (externalUser) => {
    }
});

class ExternalUserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalUser: []
        };
    }

    async componentDidMount() {
        const jwtToken = sessionStorage.getItem(sha256(process.env.JWT_TOKEN_NAME));
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        try {
            await this.getAllInternalUsers();
        } catch (error) {
            console.log(error);
        }
    }

    /** Add a new internal user */
    addExternalUser(externalUser) {
        return new Promise(async (resolve, reject) => {
            try {

                console.log("context method called");
                const response = await ExternalUserService.saveExternalUser(externalUser);
                if (response.status === 201) {
                    /* 201 -  created. */
                    const responseResultObject = response.data;
                    const newExternalUsersList = [...this.state.externalUsers];
                    newExternalUsersList.unshift({
                        ...externalUsers,
                        _id: responseResultObject?.generatedId
                    });

                    this.setState({
                        externalUsers: newExternalUsersList
                    });

                    const addedExternalUsers = this.state
                        .external.find(externalUserElem => externalUserElem._id === responseResultObject?.generatedId);
                    if (addedExternalUsers) {
                        resolve(addedExternalUsers);
                    } else {
                        reject(new Error('External User was not inserted successfully!'));
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }



    render() {
        return (
            <ExternalUserContext.Provider value={{
                externalUsers: this.state.externalUsers,
                // getAllInternalUsers: this.getAllInternalUsers.bind(this),
                addExternalUser: this.addExternalUser.bind(this)
                // updateInternalUser: this.updateInternalUser.bind(this),
                // getInternalUserByID: this.getInternalUserByID.bind(this),
            }
            }>
                {this.props.children}
            </ExternalUserContext.Provider>
        );
    }
}
const ExternalUserConsumer = ExternalUserContext.Consumer;
module.exports = {
    ExternalUserContext, ExternalUserProvider, ExternalUserConsumer
};
