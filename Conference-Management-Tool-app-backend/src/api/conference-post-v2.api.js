/*
@author : Dhanusha Perera
@date : 28/06/2021
*/

const conferencePostDAO = require('../dal/conference-post-dao');
const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');
const fileIOHelper = require('../util/file-io-helper.util');

const conferencePostAssetPath = path.join(process.cwd(), '/public/assets/conference-posts');
// const cpKeySpeakersAssetPath = path.join(process.cwd(), '/public/assets/conference-posts/key-speakers');


/* get all conference posts. */
const getAllConferencePost = () => {
    return conferencePostDAO.getAllConferencePost();
};

/* get a conference post by ID. */
const getConferencePostByID = (conferencePostID) => {
    return conferencePostDAO.getConferencePost(conferencePostID);
};

/* get a conference post by ID. */
const approvePost = (conferencePostID) => {
    return conferencePostDAO.updateConferencePost(conferencePostID, { isApproved:true });
};


/* creates a new save conference post. */
const saveConferencePost = (conferencePost, uploadedImageFiles) => {
    return new Promise(async (resolve, reject) => {
        // console.log(conferencePost);
        // console.log(uploadedImageFiles);
        let fileIOOperationResult;
        let dataToBeUpdated = {};

        try {
            const generatedResult = await conferencePostDAO.createConferencePost(conferencePost);
            // console.log(generatedResult);

            if (generatedResult?.insertedId) {
                /* insertion is successful. then let's save the conference IMAGE */
                const uploadedImage = uploadedImageFiles?.conferencePostImage;
                if (uploadedImage) {
                    /* save conference post image. */
                    try {
                        fileIOOperationResult = await fileIOHelper.saveFile(uploadedImage,
                            generatedResult?.insertedId,
                            conferencePostAssetPath);

                        /* if an image is successfully saved in the file directory. then let's update the mainImageURI */
                        if (fileIOOperationResult?.fileNameWithExt) {
                            dataToBeUpdated.mainImageURI = `/assets/conference-posts/${fileIOOperationResult?.fileNameWithExt}`;
                        }

                        // let's update the key-speakers URI segment
                        dataToBeUpdated.keySpeakersURI = `/conferences/${generatedResult?.insertedId}/keyspeakers`;

                        /* insertion is successful. then let's update the key-speakers url segment */
                        const result = await conferencePostDAO.updateConferencePost(generatedResult?.insertedId,
                            dataToBeUpdated);

                        if (result.modifiedCount > 0) {
                            /* update successful. */
                            resolve({
                                code: 201, // 201 = CREATED
                                message: generatedResult?.insertedId
                            });
                        } else {
                            reject({
                                code: 500,
                                message: 'result.modifiedCount is not greater than zero, insertion did not complete successfully!'
                            });
                        }

                    } catch (error) {
                        reject(error);
                    }
                }

            } else {
                reject({
                    code: 500,
                    message: 'Something went wrong, insertion did not complete successfully!'
                });
            }

        } catch (error) {
            reject(error);
        }
    });
};

/* update a conference post. */
const updateConferencePost = (id, conferencePost, uploadedImageFiles, existingConferenceRecord) => {
    return new Promise(async (resolve, reject) => {

        let fileIOOperationResult;
        const uploadedImage = uploadedImageFiles?.conferencePostImage;

        /* update the uploadedImage. write new Image to the disk. */
        if (uploadedImage) {
            try {
                fileIOOperationResult = await fileIOHelper.saveFile(uploadedImage,
                    existingConferenceRecord?._id,
                    conferencePostAssetPath);
            } catch (error) {
                reject(error);
                return;
            }
        }

        /* update the newly updated imageURI*/
        if (fileIOOperationResult?.fileNameWithExt) {
            conferencePost.mainImageURI = `/assets/conference-posts/${fileIOOperationResult?.fileNameWithExt}`;
        }

        /* update the record. */
        try {
            const result = await conferencePostDAO.updateConferencePost(id, conferencePost);
            if (result?.modifiedCount > 0) {
                resolve({
                    code: 204,
                    message: ''
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

/* delete a conference post by ID. */
const deleteConferencePost = (conferencePostID, existingRecord) => {
    return new Promise(async (resolve, reject) => {
        const filePath = path.join(`/public`, existingRecord?.mainImageURI);
        try {
            const deleteFileResult = await fileIOHelper.deleteFile(filePath);

            if (deleteFileResult) {
                const deletedRecordDBResult = await conferencePostDAO.deleteConferencePost(conferencePostID);
                resolve(deletedRecordDBResult);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllConferencePost,
    getConferencePostByID,
    saveConferencePost,
    updateConferencePost,
    deleteConferencePost,
    approvePost
};
