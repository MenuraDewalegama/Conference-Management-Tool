/*
@author : Dhanusha Perera
@date : 27/05/2021
*/

const DatabaseService = require('../service/database.service');
const ConferencePostDatabaseService = new DatabaseService('ConferencePosts');

/* get all conference posts. */
const getAllConferencePost = () => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await ConferencePostDatabaseService.findAll());
        } catch (error) {
            reject(error);
        }
    });
};

/* get a conference post by ID. */
const getConferencePost = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await ConferencePostDatabaseService.findById(conferencePostID));
        } catch (error) {
            reject(error);
        }
    });
};

/* create a new conference post. */
const createConferencePost = (conferencePost) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await ConferencePostDatabaseService.save(conferencePost));
        } catch (error) {
            reject(error);
        }
    });
};

/* update a conference post. */
const updateConferencePost = (id, conferencePost) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await ConferencePostDatabaseService.update(id, conferencePost));
        } catch (error) {
            reject(error);
        }
    });
};

/*delete a conference post. */
const deleteConferencePost = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await ConferencePostDatabaseService.delete(conferencePostID));
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConferencePost,
    getConferencePost,
    createConferencePost,
    updateConferencePost,
    deleteConferencePost
};
