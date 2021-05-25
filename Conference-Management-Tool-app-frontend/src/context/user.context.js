/*
@author : Dhanusha Perera
@date : 25/05/2021
*/
import React, {Component} from 'react';

/* creating the user context with defaultValue. */
const UserContext = React.createContext({
    currentUser: null,
    authenticateUser: () => {
    },
    logOutUser: () => {
    }
});

class UserProvider extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // currentUser: null, // initial currentUser is null because no user is logged in.
            currentUser: {
                id: 'U001',
                name: 'John Doe',
                type: 'ADMIN'
            },
            // { id: 'U001', name: 'John Doe', type: 'ADMIN' }
            addUser: this._addUser.bind(this), // this will not be very much useful, though...
            logOutUser: this._removeUser.bind(this)
        };
    }

    componentDidMount() {
    }

    /** Add user to the context. */
    _addUser(user) {
        this.setState({
            currentUser: user
        });
    }

    /** Remove user to the context. */
    _removeUser() {
        /* TODO: remove saved details in session storage. */
        this.setState({
            currentUser: null
        });
    }

    render() {
        return (
            <UserContext.Provider
                value={
                    {
                        ...this.state,
                    }
                }
            >
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

const UserConsumer = UserContext.Consumer;
module.exports = {
    UserContext, UserProvider, UserConsumer
};
