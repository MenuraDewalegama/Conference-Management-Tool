const keyNoteSpeechesDao = require('../dal/speeches.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

/* asestes and internalUser dir */

const assetDir = `${process.cwd()}${path.sep}public/assets`;
const speechesDir = `${assetDir}${path.sep}speeches`;


const getSpeakers = async () => {
    return await keyNoteSpeechesDao.getAllSpeakers();
};

/** add internalUser */

const addKeyNoteSpeech = async ({  name, designation, information }, ctxSpeecherImage) => {
    const keyNoteSpeech = {
        name,
        designation,
        information,
        imagePath: null
    }

    return new Promise(async (resolve, reject) => {
        try {
            const generateResult = await keyNoteSpeechesDao.addKeyNoteSpeeches(keyNoteSpeech);

            /* check the admin has upload an image*/
            if (ctxSpeecherImage) {

                /** get image extension */
                const fileType = mineTypes.extension(ctxSpeecherImage?.type);

                /** set image save path */
                const desFilePath = `${speechesDir + path.sep + generateResult.insertedId}.${fileType}`;
                const dbImagePath = `/assets/speeches/${generateResult.insertedId}.${fileType}`;

                console.log("des path", desFilePath);

                console.log("db image path", dbImagePath);
                try {
                    fs.copyFileSync(ctxSpeecherImage?.path, desFilePath);
                    fs.unlinkSync(ctxSpeecherImage?.path);

                    try {
                        /** update the image path of internalUser`s */
                        const result = await keyNoteSpeechesDao.updateKeyNoteSpeechesImagePath(generateResult.insertedId,
                            { imagePath: dbImagePath });
                        resolve(result);

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



module.exports = {
    addKeyNoteSpeech,getSpeakers
}

