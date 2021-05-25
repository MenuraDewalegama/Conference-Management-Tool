import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context'

render(
    <UserProvider><App/></UserProvider>
    , document.getElementById('app'));
