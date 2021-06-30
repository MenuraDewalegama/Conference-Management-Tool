import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { UserProvider } from './src/context/user.context';
import { InternalUserProvider } from './src/context/internalUser.context';
import { ExternalUserProvider } from './src/context/externalUser.context';
import { DashboardProvider } from './src/context/dashboard.context';
import { ConferencePostProvider } from './src/context/conference-post.context';
import { ConferencePostAddEditProvider } from './src/context/conference-post-add-edit.context';

render(
    <ConferencePostAddEditProvider><ConferencePostProvider>
        <DashboardProvider>
            <ExternalUserProvider>
                <InternalUserProvider>
                    <UserProvider>
                        <App />
                    </UserProvider>
                </InternalUserProvider>
            </ExternalUserProvider>
        </DashboardProvider>
    </ConferencePostProvider></ConferencePostAddEditProvider>
    , document.getElementById('app'));
