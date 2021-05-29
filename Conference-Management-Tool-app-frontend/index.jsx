import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context';
import {InternalUserProvider} from './src/context/internalUser.context'

render(
    <InternalUserProvider>
            <UserProvider>
                <App/>
        </UserProvider>
    </InternalUserProvider>
    , document.getElementById('app'));