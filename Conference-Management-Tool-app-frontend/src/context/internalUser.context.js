import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import InternalUserService from '../service/internalUser.service'

const InternalUserContext = React.createContext({
    internalUser: [],
    getAllInternalUsers: () => {
    },
    addInternalUser: (internalUser) => {
    },
});

class InternalUserProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internalUsers: []
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

    /** Get all the getAllInternalUsers by calling backend.
  * @return Promise with a result. If success, then resolve the product.
  * otherwise, reject the error(errorRespond) */

    getAllInternalUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await InternalUserService.getAllInternalUsers();
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

    /** Add a new internal user */
    addInternalUser(internalUser) {
        return new Promise(async (resolve, reject) => {
            try {
                
                const response = await InternalUserService.saveInternalUser(internalUser);
                if (response.status === 201) {
                    /* 201 -  created. */
                    // const responseResultObject = response.data;
                    // const newInternalUsersList = [...this.state.internalUsers];
                    // newInternalUsersList.unshift({
                    //     ...internalUsers,
                    //     _id: responseResultObject?.generatedId
                    // });

                    // this.setState({
                    //     internalUsers: newInternalUsersList
                    // });

                    // const addedInternalUsers = this.state
                    //     .internalUsers.find(internalUserElem => internalUserElem._id === responseResultObject?.generatedId);
                    if (response) {
                        resolve(response);
                    } else {
                        reject(new Error('Product was not inserted successfully!'));
                    }
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    render() {
        return (
            <InternalUserContext.Provider value={{
                internalUsers: this.state.internalUsers,
                getAllInternalUsers: this.getAllInternalUsers.bind(this),
                addInternalUser: this.addInternalUser.bind(this),
            }
            }>
                {this.props.children}
            </InternalUserContext.Provider>
        );
    }
}
const InternalUserConsumer = InternalUserContext.Consumer;
module.exports = {
    InternalUserContext, InternalUserProvider, InternalUserConsumer
};
