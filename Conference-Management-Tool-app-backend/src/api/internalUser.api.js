const internalUserDAO = require('../dal/internalUser.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

/* asestes and internalUser dir */

const assetDir = `${process.cwd()}${path.sep}assets`;
const internalUserDir = `${assetDir}${path.sep}internalUsers`;

/** add internalUser */

const addInternalUser = async ({fullName, contactNo, email, type, password }, ctxInternalUserImage) => {
    const internalUser = {
        fullName,
        contactNo,
        email,
        type,
        password,
        imagePath: '/assets/internalUsers/'
    }

    return new Promise(async (resolve, reject) => {
        try {
            const generateResult = await internalUserDAO.addInternalUser(internalUser);

            /* check the admin has upload an image*/
            if (ctxInternalUserImage) {

                /** get image extension */
                const fileType = mineTypes.extension(ctxInternalUserImage?.type);

                /** set image save path */
                const desFilePath = `${internalUserDir + path.sep + generateResult.insertedId}.${fileType}`;
                const dbImagePath = `/assets/internalUsers/${generateResult.insertedId}.${fileType}`;

                try {
                    fs.copyFileSync(ctxInternalUserImage?.path, desFilePath);
                    fs.unlinkSync(ctxInternalUserImage?.path);

                    try {
                        /** update the image path of internalUser`s */
                        const result = await internalUserDAO.updateInternalUserImagePath(generateResult.insertedId,
                            { imagePath: dbImagePath });
                        resolve(generateResult);

                    } catch (error) {
                        /** error: when having issues in updating dbImagePath  */
                        reject(error);
                    }
                } catch (error) {
                    /** error when copping file */
                    reject(error);
                }
            } else {
                /** if admin not insert an images just only save the details */
                resolve(generateResult);
            }

        } catch (error) {
            reject(error);
            console.log("test")
        };
    });
};

const getInternalUsers = async () => {
    return await internalUserDAO.getAllInternalUsers();
};

const getInternalUser = async id => {
    return await internalUserDAO.getInternalUser(id);
};

const updateInternalUser = async (id,
    { fullName, contactNo, email, type, password, imagePath },
    ctxInternalUserImage,
    existingInternalUser) => {

    const internalUser = {
        fullName,
        contactNo,
        email,
        type,
        password,
        imagePath }

        return new Promise(async (resolve, reject) => {

            try {
                /* updating the internalUser. */
                const result = await internalUserDAO.updateInternalUser(id, internalUser);
    
                /* if the internalUser is provided, then it should be saved.
                then update the ImagePath in the Database*/
                if (ctxInternalUserImage) {
                    const fileType = mimeTypes.extension(ctxInternalUserImage?.type);
                    const desFilePath = `${internalUserDir + path.sep + id}.${fileType}`;
    
                    try {
                        /* copy the temp image file to the /assets/internalUser folder. */
                        fs.copyFileSync(ctxInternalUserImage.path, desFilePath);
                        fs.unlinkSync(ctxInternalUserImage.path);
    
                        /* update the database record with the lasted image path. */
                        await internalUserDAO.updateInternalUserImagePath(id, {
                            imagePath: `/assets/internalUsers/${id}.${fileType}`
                        });
    
                        /* old image should be deleted, if found. */
                        if (existingInternalUser?.imagePath) {
                            const oldImageFilePath = `${internalUserDir + path.sep + path.parse(existingInternalUser?.imagePath).base}`;
                            if (fs.existsSync(oldImageFilePath) && (oldImageFilePath !== desFilePath)) {
                                try {
                                    /* delete the old image. */
                                    fs.unlinkSync(oldImageFilePath);
                                    console.log('old image file deleted!');
                                } catch (error) {
                                    reject(error);
                                }
                            } else {
                                console.log('file not deleted!');
                            }
                        }
                        resolve(result);
                    } catch (error) {
                        /* error when writing file. */
                        reject(error);
                    }
                } else {
                    /* Internal User Image are not provided. */
                    if (internalUser?.imagePath == null) {
                        const oldImageFilePath = `${internalUserDir + path.sep + path.parse(existingInternalUser?.imagePath).base}`;
                        if (fs.existsSync(oldImageFilePath)) {
                            try {
                                /* delete the old image. */
                                fs.unlinkSync(oldImageFilePath);
                                console.log('old image deleted!');
                            } catch (error) {
                                reject(error);
                            }
                        }
                    }
                    resolve(result);
                }
            } catch (error) {
                /* error in update process. */
                reject(error);
            }
        })
};

const deleteInternalUser = async id=>{
    return new Promise(async (resolve, reject) =>{
        try {
            const existingInternalUser = await internalUserDAO.getInternalUser(id);
            console.log(existingInternalUser);
            const oldImageFilePath = `${internalUserDir + path.sep + path.parse(existingInternalUser?.imagePath).base}`;
            console.log(oldImageFilePath);
            if (fs.existsSync(oldImageFilePath)) {
                fs.unlinkSync(oldImageFilePath);
            }
            const result = await internalUserDAO.deleteInternalUser(id);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    }) 
};

module.exports = {
    addInternalUser,
    getInternalUsers,
    getInternalUser,
    updateInternalUser,
    deleteInternalUser
}

