/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import axios from 'axios';

const baseURL = process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL;

const getAllConferencePosts = () => {
    return new Promise((resolve, reject) => {
        return new Promise(async (resolve, reject) => {
            try {
                // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
                const getAllConferencePostsURL = new URL(`/api/v1/conferences`, baseURL);
                resolve(await axios.get(getAllConferencePostsURL.href));
            } catch (error) {
                reject(error);
            }
        });
    });
};

const getConferencePostByID = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const getConferencePostByIDURL = new URL(`/api/v1/conferences/${conferencePostID}`, baseURL);
            resolve(await axios.get(getConferencePostByIDURL.href));
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConferencePosts,
    getConferencePostByID
};
