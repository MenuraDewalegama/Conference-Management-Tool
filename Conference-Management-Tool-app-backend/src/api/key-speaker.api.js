/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const keySpeakerDAO = require('../dal/key-speaker.dao');
const path = require('path');
const fileIOHelper = require('../util/file-io-helper.util');
const dirService = require('../service/dir.service');

const conferencePostKeySpeakerFullDirPath = path
    .join(process.cwd(), '/public/assets/conference-posts/key-speakers');

const KeySpeakerImageURI = '/assets/conference-posts/key-speakers';

/* Get all key-speakers under conferencePostID. */
const getAllKeySpeakers = (conferencePostID) => {
    return keySpeakerDAO.getAllKeySpeakers(conferencePostID);
};

/* Get key-speaker by keySpeakerID. */
const getKeySpeakerByID = (keySpeakerID) => {
    return keySpeakerDAO.getKeySpeakerByID(keySpeakerID);
};

/** Create a new key-speaker. */
const saveKeySpeaker = (conferencePostID, keySpeaker, uploadedImageFiles) => {
    return new Promise(async (resolve, reject) => {
        if (!uploadedImageFiles.hasOwnProperty('keySpeakerImage')) {
            reject({
                code: 400,
                message: 'keySpeakerImage is required!'
            });
            return;
        }

        /* create new folder. folderName = conferencePostID */
        const newDirPathToBeCreated = path.join(conferencePostKeySpeakerFullDirPath, `${conferencePostID}`);

        /* get image file. */
        const keySpeakerImage = uploadedImageFiles.keySpeakerImage;

        try { /* save the database record. */
            const generatedResult = await keySpeakerDAO.createKeySpeaker(keySpeaker);

            if (generatedResult?.insertedId) {
                /* record was create successfully in the database. */

                /* create a new dir for the conference-post. */
                try {
                    const createDirResult = await dirService.createNewDirFor(newDirPathToBeCreated);

                    /* save the imageFile of the key-speaker. */
                    if (createDirResult) {
                        try {
                            // save the imageFile of the key-speaker.
                            const saveImageFileIOResult = await fileIOHelper
                                .saveFile(keySpeakerImage,
                                    generatedResult?.insertedId,
                                    newDirPathToBeCreated);

                            if (saveImageFileIOResult.fileNameWithExt) {
                                /* update the key-speaker imageURI */
                                try {
                                    const updateRecordResult = await _updateImageURI(conferencePostID,
                                        generatedResult?.insertedId, saveImageFileIOResult?.fileNameWithExt);

                                    if (updateRecordResult?.modifiedCount > 0) {
                                        resolve({
                                            code: 201, // 201 = CREATED
                                            message: generatedResult?.insertedId
                                        });
                                    }
                                } catch (error) {
                                    reject(error);
                                }
                            }
                        } catch (error) {
                            reject({
                                code: 500,
                                message: 'Something went wrong when saving image file.'
                            });
                        }
                    } else {
                        reject({
                            code: 500,
                            message: 'Something went wrong when creating new directory.'
                        });
                    }
                } catch (error) {
                    reject(error);
                }
            }
        } catch (error) {
            reject(error);
        }
    });

};

/** update key-speaker. */
const updateKeySpeaker = (keySpeakerID, keySpeaker, uploadedImageFiles, existingKeySpeakerRecord) => {
    return new Promise(async (resolve, reject) => {
        let keySpeakerImage;
        const existingImageFilePath = path.join(`/public`, existingKeySpeakerRecord?.keySpeakerImageURI);
        let saveImageFileIOResult;

        /* get image file. */
        if (uploadedImageFiles.hasOwnProperty('keySpeakerImage') && uploadedImageFiles?.keySpeakerImage?.size > 0) {
            keySpeakerImage = uploadedImageFiles?.keySpeakerImage;
        }

        /* create new folder. folderName = conferencePostID */
        const newDirPathToBeCreated = path.join(conferencePostKeySpeakerFullDirPath,
            `${existingKeySpeakerRecord?.conferencePostID}`);


        /* if new image file uploaded, let's handle uploaded image file, and save it. */
        if (keySpeakerImage) { /* create a new dir for the conference-post. */
            try {
                const createDirResult = await dirService.createNewDirFor(newDirPathToBeCreated);

                /* save the imageFile of the key-speaker. */
                if (createDirResult) {
                    try {
                        /* deleting existing image file. */
                        await fileIOHelper.deleteFile(existingImageFilePath);

                        // save the imageFile of the key-speaker.
                        saveImageFileIOResult = await fileIOHelper
                            .saveFile(keySpeakerImage,
                                existingKeySpeakerRecord?._id,
                                newDirPathToBeCreated);

                    } catch (error) {
                        reject({
                            code: 500,
                            message: 'Something went wrong when deleting existing image file.'
                        });
                    }
                } else {
                    reject({
                        code: 500,
                        message: 'Something went wrong when creating new directory.'
                    });
                }

            } catch (error) {
                reject(error);
            }
        } // end-save-image

        /* if new image is saved successfully, let's update the new keySpeakerImageURI. */
        if (keySpeakerImage && saveImageFileIOResult?.fileNameWithExt) {
            keySpeaker.keySpeakerImageURI
                = path.join(KeySpeakerImageURI,
                existingKeySpeakerRecord?.conferencePostID,
                saveImageFileIOResult?.fileNameWithExt);
        }

        try { /* save the database record. */
            const updatedResult = await keySpeakerDAO.updateKeySpeaker(keySpeakerID, keySpeaker);

            if (updatedResult?.modifiedCount > 0) {
                /* updated successfully. */
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

/** Delete key-speaker by ID. */
const deleteKeySpeakerByID = (keySpeakerID, existingKeySpeakerRecord) => {
    return new Promise(async (resolve, reject) => {
        try {
            /* delete the key-speaker record from DB. */
            const deleteResult = await keySpeakerDAO.deleteKeySpeakerByID(keySpeakerID);

            if (deleteResult?.deletedCount > 0) {
                const deleteFilePath = path.join(`/public`,
                    existingKeySpeakerRecord?.keySpeakerImageURI);
                try {
                    /* delete the key-speaker image file from the disk. */
                    const fileDeleteIOResult = await fileIOHelper.deleteFile(deleteFilePath);
                    if (fileDeleteIOResult) {
                        resolve(deleteResult);
                    }
                } catch (error) {
                    reject(error);
                }
            }

        } catch (error) {
            reject(error);
        }
    });
};

/* Update the keySpeakerImageURI in the DB. */
const _updateImageURI = (conferencePostID, keySpeakerID, keySpeakerImageFileName) => {
    return new Promise(async (resolve, reject) => {
        const KeySpeakerImageURIToBeSaved = path
            .join(KeySpeakerImageURI, `${conferencePostID}`, `${keySpeakerImageFileName}`);

        try {
            const updatingRecordResult = await keySpeakerDAO
                .updateKeySpeaker(keySpeakerID, {keySpeakerImageURI: KeySpeakerImageURIToBeSaved});
            resolve(updatingRecordResult);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllKeySpeakers,
    getKeySpeakerByID,
    saveKeySpeaker,
    updateKeySpeaker,
    deleteKeySpeakerByID
};
