import React from "react";
import { Link } from "react-router-dom";
import sha256 from "crypto-js/sha256";
import { ExternalUserContext } from '../../../../../context/externalUser.context'
import ExternalUserListItem from "./ExternalUserListItem";

export default class ExternalUsers extends React.Component {

    static contextType = ExternalUserContext;
    constructor(prop) {
        super(prop);
        this.state = {
            externalUser: null,
        };
    }

    selectInternalUser(externalUser) {
        this.setState({ externalUser: externalUser });
    }

    removeExternalUser (externalUser) {
        console.log(externalUser._id);
        window.location = '/dashboard/externalUsers';
        return this.context.deleteInternalUser(externalUser._id);
       
    }

    render() {
        const { externalUsers } = this.props;
        // console.log(this.props);
        return (
            <div className="container" style={{ padding: "2rem 0" }}>
                {/* header. */}
                <div className="container products-header p-0">
                    <div className="row">
                        <div className='col'>
                            <h1>External Users</h1>
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
                        {externalUsers.map((externalUser) => {
                            return (
                                <ExternalUserListItem
                                    key={externalUser._id}
                                    externalUser={externalUser}
                                    selectExternalUser={(externalUser) =>{
                                        this.selectExternalUser(externalUser)
                                    }}
                                    removeExternalUser={() =>{
                                        this.removeExternalUser(externalUser)
                                    }} />
                            );
                        })}
                    </div>
                </div>
            </div>
        );
    }
}