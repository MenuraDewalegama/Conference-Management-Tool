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
import UsersViewHolder from './SubModules/UsersViews/UsersViewHolder';

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
                <Route exact path='/dashboard/users'>
                   <UsersViewHolder/>
                </Route>
                <Route exat path='/dashboard/craetusers'>
                    <CreateUserView/>
                </Route>
          </Switch>
        </div>
    }

}