import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context';
import {InternalUserProvider} from './src/context/internalUser.context';
import {ConferencePostProvider} from './src/context/conference-post.context';

render(
    <ConferencePostProvider>
        <InternalUserProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </InternalUserProvider>
    </ConferencePostProvider>
    , document.getElementById('app'));
