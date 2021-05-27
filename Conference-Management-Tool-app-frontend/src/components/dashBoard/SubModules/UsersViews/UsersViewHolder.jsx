import React from 'react';
import { Link } from 'react-router-dom';

export default class UsersViewHolder extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return <div>
           <h1 className="center">Welcome to Users view</h1>
           <Link to="/dashboard/craetusers">Create User</Link>
        </div>
    }
    
}