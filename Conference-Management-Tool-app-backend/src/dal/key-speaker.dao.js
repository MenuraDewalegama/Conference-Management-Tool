/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const DatabaseService = require('../service/database.service');
const KeySpeakerDatabaseService = new DatabaseService('KeySpeakers');

/* get all conference posts. */
const getAllKeySpeakers = (conferencePostID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await KeySpeakerDatabaseService.find({
                conferencePostID: conferencePostID
            }));
        } catch (error) {
            reject(error);
        }
    });
};

/* get a key-speaker by ID. */
const getKeySpeakerByID = (keySpeakerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await KeySpeakerDatabaseService.findById(keySpeakerID));
        } catch (error) {
            reject(error);
        }
    });
};

/* create a new key-speaker. */
const createKeySpeaker = (keySpeaker) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await KeySpeakerDatabaseService.save(keySpeaker));
        } catch (error) {
            reject(error);
        }
    });
};

/* update a key-speaker. */
const updateKeySpeaker = (keySpeakerID, keySpeaker) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await KeySpeakerDatabaseService.update(keySpeakerID, keySpeaker));
        } catch (error) {
            reject(error);
        }
    });
};

/*delete a key-speaker. */
const deleteKeySpeakerByID = (keySpeakerID) => {
    return new Promise(async (resolve, reject) => {
        try {
            resolve(await KeySpeakerDatabaseService.delete(keySpeakerID));
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllKeySpeakers,
    getKeySpeakerByID,
    createKeySpeaker,
    updateKeySpeaker,
    deleteKeySpeakerByID
};
