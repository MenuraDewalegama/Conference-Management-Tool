import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import InternalUserService from '../service/internalUser.service'
import ExternalUserService from '../service/externalUser.service'

const DashboardContext = React.createContext({
    internalUser: [],
    externalUser: [],
    getAllInternalUsers: () => {
    },
    getAllExternalUsers: () => {
    },
});

class DashboardProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            internalUsers: [],
            externalUsers: []
        };
    }

    async componentDidMount() {
        const jwtToken = sessionStorage.getItem(sha256(process.env.JWT_TOKEN_NAME));
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        try {
            await this.getAllInternalUsers();
            await this.getAllExternalUsers();
        } catch (error) {
            console.log(error);
        }
    }

    /** Get all the getAllInternalUsers by calling backend.
  * @return Promise with a result. If success, then resolve the internal User.
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

    getAllExternalUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await ExternalUserService.getAllExternalUsers();
                if (response.status === 200) {
                    this.setState({
                        externalUsers: response.data
                    });
                    resolve(this.state.externalUsers);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
    render() {
        return (
            <DashboardContext.Provider value={{
                internalUsers: this.state.internalUsers,
                externalUsers: this.state.externalUsers,
                getAllInternalUsers: this.getAllInternalUsers.bind(this),
                getAllExternalUsers: this.getAllExternalUsers.bind(this),
            }
            }>
                {this.props.children}
            </DashboardContext.Provider>
        );
    }
}
const DashboardConsumer = DashboardContext.Consumer;
module.exports = {
    DashboardContext, DashboardProvider, DashboardConsumer
};
