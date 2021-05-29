import React, { Component } from 'react';
import react from 'react';
import sha256 from 'crypto-js/sha256';
import axios from '../service/axios.service'
import InternalUserService from '../service/internalUser.service'

const InternalUserContext = React.createContext({
    internalUser: [],
    getAllInternalUsers: () => {
    },
});

class InternalUserProvider extends Component{
    constructor(props){
        super(props);
        this.state = {
            internalUsers:[]
        };
    }

    async componentDidMount(){
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
                    console.log("from contex");
                    console.log(response);
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
                <InternalUserContext.Provider value={{
                    internalUsers: this.state.internalUsers,
                    getAllInternalUsers: this.getAllInternalUsers.bind(this),
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
