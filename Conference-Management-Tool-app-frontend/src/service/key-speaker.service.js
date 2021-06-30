/*
@author : Dhanusha Perera
@date : 30/06/2021
*/

import axios from 'axios';

const baseURL = process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL;

const getAllKeySpeakers = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            // If the given base URL or the resulting URL are not valid URLs, the JavaScript TypeError exception is thrown.
            const getAllKeySpeakersURL = new URL(`/api/v2/conferences/${conferencePostID}/keyspeakers`, baseURL);
            const response = (await axios.get(getAllKeySpeakersURL.href));
            resolve(response.data);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllKeySpeakers
};
