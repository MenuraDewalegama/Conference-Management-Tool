import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {UserProvider} from './src/context/user.context';
import {InternalUserProvider} from './src/context/internalUser.context';
import {ConferencePostProvider} from './src/context/conference-post.context';
import {ConferencePostAddEditProvider} from './src/context/conference-post-add-edit.context';

render(
    <ConferencePostAddEditProvider><ConferencePostProvider>
        <InternalUserProvider>
            <UserProvider>
                <App/>
            </UserProvider>
        </InternalUserProvider>
    </ConferencePostProvider></ConferencePostAddEditProvider>
    , document.getElementById('app'));
