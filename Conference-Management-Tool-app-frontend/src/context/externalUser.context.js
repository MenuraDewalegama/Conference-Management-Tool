import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import ExternalUserService from '../service/externalUser.service'

const ExternalUserContext = React.createContext({
    externalUser: [],
    getAllExternalUser: () => {
    },
    addExternalUser: (externalUser) => {
    }
});

class ExternalUserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalUsers: []
        };
    }

    async componentDidMount() {
        const jwtToken = sessionStorage.getItem(sha256(process.env.JWT_TOKEN_NAME));
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        try {
            await this.getAllExternalUser();
        } catch (error) {
            console.log(error);
        }
    }

    //get all external users
    getAllExternalUser() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ExternalUserService.getAllExternalUsers();
                if (response.status === 200) {
                    this.setState({
                        externalUsers: response.data
                    });
                    // console.log(this.state.externalUser);
                    resolve(this.state.externalUser);
                }
            } catch (error) {
                reject(error);
            }
        });
    }


    /** Add a new external user */
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
                addExternalUser: this.addExternalUser.bind(this),
                getAllExternalUser: this.getAllExternalUser.bind(this),
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
