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
                /* delete if another file exists. */
                if (fs.existsSync(desPath)) {
                    fs.unlinkSync(desPath);
                }

                fs.copyFileSync(sourcePath, desPath);
                fs.unlinkSync(ctxFile?.path);
            } catch (error) {
                reject(error);
            }

            resolve(result);
        } catch (error) {
            reject({
                code: 500,
                message: 'Something went wrong, when writing the file to the disk!'
            });
            console.error(error);
        }
    });
};

/** Delete file. */
const deleteFile = (fileRelativePath) => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(process.cwd(), fileRelativePath);

        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
                resolve(true);
            } catch (error) {
                reject(error);
            }
        } else {
            resolve(true);
        }
    });
};

module.exports = {
    // getFileExtension,
    // createFileNameWithExtension,
    saveFile,
    deleteFile
};
