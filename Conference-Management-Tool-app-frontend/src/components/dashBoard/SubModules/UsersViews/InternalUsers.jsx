import React from "react";
import { Link } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import InternalUserListItem from './InternalUserListItem';
import { InternalUserContext } from '../../../../context/internalUser.context'

export default class InternalUsers extends React.Component {

    static contextType = InternalUserContext;
    constructor(prop) {
        super(prop);
        this.state = {
            internalUser: null,
        };
    }

    selectInternalUser(internalUser) {
        this.setState({ internalUser: internalUser });
    }

    removeInternalUser (internalUser) {
        console.log(internalUser._id);
        window.location = '/dashboard/internalusers';
        return this.context.deleteInternalUser(internalUser._id);
       
    }

    render() {
        const { internalUsers } = this.props;
        return (
            <div className="container" style={{ padding: "2rem 0" }}>
                {/* header. */}
                <div className="container products-header p-0">
                    <div className="row">
                        <div className='col'>
                            <h1>Internal Users</h1>
                            <Link to="/dashboard/internalusers/create">Create User</Link>
                        </div>
                        <div className='col'
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                justifyItems: "center",
                            }} >
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {/* display Internal Users item by item by looping through. */}
                        {internalUsers.map((internalUser) => {
                            return (
                                <InternalUserListItem
                                    key={internalUser._id}
                                    internalUser={internalUser}
                                    selectInternalUser={(internalUser) =>{
                                        this.selectInternalUser(internalUser)
                                    }}
                                    removeInternalUser={() =>{
                                        this.removeInternalUser(internalUser)
                                    }} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}