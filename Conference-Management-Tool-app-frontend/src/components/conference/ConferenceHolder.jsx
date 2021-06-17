/*
@author : Dhanusha Perera
@date : 25/05/2021
*/
import React from 'react';
import './ConferenceHolder.css';
import ConferencePosts from './conference-posts/ConferencePosts';

/* functional component. */
const ConferenceHolder = () => {
    return (
        <div className="outer_container" style={{paddingBottom: '4rem'}}>
            <ConferencePosts/>
        </div>
    );
};

export default ConferenceHolder;
