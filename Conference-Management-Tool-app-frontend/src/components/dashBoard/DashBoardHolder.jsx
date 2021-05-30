/*
@author : Janaka Chinthana
@date : 26/05/2021
*/

import React from 'react';
import {Col, Container, Image, Row} from 'react-bootstrap';
import { Link, Route, Switch } from 'react-router-dom';
import DashBoard from './DashBoard';
import './DashBoard.css';
import CreateUserView from './SubModules/UsersViews/CreateUserView';
import InternalUsersViewHolder from './SubModules/UsersViews/InternalUsersViewHolder';

export default class DashBoardHolder extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div>
          <Switch>
                <Route exact path='/dashboard'>
                  <DashBoard/>
                </Route>
                 <Route path='/dashboard/internalusers'>
                   <InternalUsersViewHolder/>
                </Route>
          </Switch>
        </div>
    }

}