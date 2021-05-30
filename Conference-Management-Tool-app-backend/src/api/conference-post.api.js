/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const conferencePostDAO = require('../dal/conference-post-dao');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');

const conferencePostAssetPath = path.join(process.cwd(), '/public/assets/conference-posts');
const cpKeySpeakersAssetPath = path.join(process.cwd(), '/public/assets/conference-posts/key-speakers');

/* get all conference posts. */
const getAllConferencePost = () => {
    return conferencePostDAO.getAllConferencePost();
};

/* get a conference post by ID. */
const getConferencePostByID = (conferencePostID) => {
    return conferencePostDAO.getConferencePost(conferencePostID);
};

/* creates a new save conference post. */
const saveConferencePost = (conferencePost, uploadedImageFiles) => {
    return new Promise(async (resolve, reject) => {
        try {
            /* create the conference post. */
            const generatedResult = await conferencePostDAO.createConferencePost(conferencePost);

            /* write the uploaded images to assets folder, if any. */
            if (uploadedImageFiles) {
                /* iterate through uploaded files. */
                for (const [key, value] of Object.entries(uploadedImageFiles)) {
                    // console.log(`${key}: ${value}`, value);

                    if (fs.existsSync(conferencePostAssetPath) && fs.existsSync(cpKeySpeakersAssetPath)) {

                        if (key === 'conferencePostImage' && value) {
                            const fileType = mimeTypes.extension(uploadedImageFiles?.conferencePostImage?.type);
                            const destFilePath = path.join(conferencePostAssetPath, `${generatedResult?.insertedId}.${fileType}`);
                            fs.copyFileSync(uploadedImageFiles?.conferencePostImage?.path, destFilePath);
                        }


                        const keySpeakerIndex = Number.parseInt(key.split('imageOfKeySpeaker')[1]);
                        if (!isNaN(keySpeakerIndex)) {

                            const keySpeaker = conferencePost.keySpeakers[keySpeakerIndex - 1];
                            if (key.startsWith('imageOfKeySpeaker') && keySpeaker && value) {
                                /* get image extension. */
                                const fileType = mimeTypes.extension(uploadedImageFiles?.conferencePostImage?.type);
                                const destFilePath = path.join(cpKeySpeakersAssetPath, `${keySpeaker?.id}.${fileType}`);

                                fs.copyFileSync(uploadedImageFiles[key]?.path, destFilePath);
                            }
                        }
                    }
                }
                resolve(generatedResult);
            }
        } catch (error) {
            reject(error);
        }
    });
};

/* update a conference post. */
const updateConferencePost = (id, conferencePost, uploadedImageFiles, existingConferenceRecord) => {
    return new Promise(async (resolve, reject) => {
        try {
            const generatedResult = await conferencePostDAO.updateConferencePost(id, conferencePost);

            /* write the uploaded images to assets folder, if any. */
            if (uploadedImageFiles) {
                /* iterate through uploaded files. */
                for (const [key, value] of Object.entries(uploadedImageFiles)) {
                    // console.log(`${key}: ${value}`, value);

                    if (fs.existsSync(conferencePostAssetPath) && fs.existsSync(cpKeySpeakersAssetPath)) {

                        if (key === 'conferencePostImage' && value) {
                            const fileType = mimeTypes.extension(uploadedImageFiles?.conferencePostImage?.type);
                            const destFilePath = path.join(conferencePostAssetPath, `${existingConferenceRecord?._id}.${fileType}`);
                            if (fs.existsSync(destFilePath)) {
                                fs.unlinkSync(destFilePath);
                            }
                            fs.copyFileSync(uploadedImageFiles?.conferencePostImage?.path, destFilePath);
                        }

                        const keySpeakerIndex = Number.parseInt(key.split('imageOfKeySpeaker')[1]);
                        if (!isNaN(keySpeakerIndex)) {
                            const keySpeaker = conferencePost.keySpeakers[keySpeakerIndex - 1];
                            if (key.startsWith('imageOfKeySpeaker') && keySpeaker && value) {
                                /* get image extension. */
                                const fileType = mimeTypes.extension(uploadedImageFiles?.conferencePostImage?.type);
                                const destFilePath = path.join(cpKeySpeakersAssetPath, `${keySpeaker?.id}.${fileType}`);
                                if (fs.existsSync(destFilePath)) {
                                    fs.unlinkSync(destFilePath);
                                }
                                fs.copyFileSync(uploadedImageFiles[key]?.path, destFilePath);
                            }
                        }
                    }
                }
                resolve(generatedResult);
            }

        } catch (error) {
            reject(error);
        }
    });
};

/* delete a conference post by ID. */
const deleteConferencePost = (conferencePostID) => {
    return conferencePostDAO.deleteConferencePost(conferencePostID);
};

module.exports = {
    getAllConferencePost,
    getConferencePostByID,
    saveConferencePost,
    updateConferencePost,
    deleteConferencePost
};
