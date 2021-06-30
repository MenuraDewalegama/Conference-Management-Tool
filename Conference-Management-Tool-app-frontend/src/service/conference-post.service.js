/*
@author : Dhanusha Perera
@date : 17/06/2021
*/

import axios from 'axios';

const baseURL = process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL;

const getAllConferencePosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const getAllConferencePostsURL = new URL(`/api/v2/conferences`, baseURL);
            const response = (await axios.get(getAllConferencePostsURL.href));
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

const getConferencePostByID = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const getConferencePostByIDURL = new URL(`/api/v2/conferences/${conferencePostID}`, baseURL);
            const response = await axios.get(getConferencePostByIDURL.href);
            resolve(response);
        } catch (error) {
            reject(error);
        }
    });
};


const saveConferencePost = (conferencePost) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const postConferencePostURL = new URL(`/api/v2/conferences`, baseURL);

            /* send a post request to the backend using axios. */
            resolve(await axios.post(postConferencePostURL.href, conferencePost));
        } catch (error) {
            reject(error);
        }

    });
};

const updateConferencePost = (conferencePostID, conferencePost) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const putConferencePostURL = new URL(`/api/v2/conferences/${conferencePostID}`, baseURL);

            /* send a put request to the backend using axios. */
            const response = axios.put(putConferencePostURL.href, conferencePost);
            resolve(response);
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
            reject(error);
        }
    });
};


const deleteConferencePost = (conferencePostID) => {
    return new Promise((resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const deleteConferencePostURL = new URL(`/api/v2/conferences/${conferencePostID}`, baseURL);

            /* send a delete request to the backend using axios. */
            const result = axios.delete(deleteConferencePostURL.href);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};
const approveConferencePost = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
        
            try { /* send a post request to the backend using axios. */
                const response = await axios.put(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}api/v2/conferences/approve/${conferencePostID}`);
                resolve(response);
            } catch (error) {
                reject(error);
            }

        } catch (error) {
            reject(error);
        }

    });
};


module.exports = {
    getAllConferencePosts,
    getConferencePostByID,
    saveConferencePost,
    updateConferencePost,
    deleteConferencePost,
    approveConferencePost
};
