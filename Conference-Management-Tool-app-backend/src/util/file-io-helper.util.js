/*
@author : Dhanusha Perera
@date : 28/06/2021
*/

const fs = require('fs');
const path = require('path');
const mimeTypes = require('mime-types');

/** Get file extension. */
const getFileExtension = (ctxFile) => {
    return new Promise((resolve, reject) => {
        try { /* get image extension. */
            const extension = mimeTypes.extension(ctxFile?.type);
            resolve(extension);
        } catch (error) {
            reject(error);
        }
    });
};


/** Create filename with extension by using file-data(uploaded file data). */
const createFileNameWithExtension = (ctxFile, fileName) => {
    return new Promise(async (resolve, reject) => {
        try {
            const fileExtension = await getFileExtension(ctxFile);
            resolve({fileNameWithExt: `${fileName}.${fileExtension}`});
        } catch (error) {
            reject(error);
        }
    });
};

/** Save file in the file directory. */
const saveFile = (ctxFile, fileName, destinationPath) => {
    return new Promise(async (resolve, reject) => {

        try {
            const result = await createFileNameWithExtension(ctxFile, fileName);

            const sourcePath = ctxFile?.path;
            const desPath = path.join(destinationPath, result.fileNameWithExt);

            // console.log(`sourcePath`, sourcePath);
            // console.log(`destinationPath`, desPath);

            try {
                fs.copyFileSync(sourcePath, desPath);
                fs.unlinkSync(ctxFile?.path);
            } catch (error) {
                reject(error);
            }

            resolve(true);
        } catch (error) {
            reject({
                code: 500,
                message: 'Something went wrong, when writing the file to the disk!'
            });
            console.error(error);
        }
    });
};

module.exports = {
    // getFileExtension,
    // createFileNameWithExtension,
    saveFile
};
