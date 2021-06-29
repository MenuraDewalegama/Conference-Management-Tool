const committeeDao = require('../dal/committee.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

/* asestes and internalUser dir */

const assetDir = `${process.cwd()}${path.sep}public/assets`;
const memberDIr = `${assetDir}${path.sep}members`;


const getAllMembers = async () => {
    return await committeeDao.getAllMembers();
};

/** add internalUser */

const addMember = async ({  name, designation, information }, ctxSpeecherImage) => {
    const member = {
        name,
        designation,
        information,
        imagePath: null
    }

    return new Promise(async (resolve, reject) => {
        try {
            const generateResult = await committeeDao.addMember(member);

            /* check the admin has upload an image*/
            if (ctxSpeecherImage) {

                /** get image extension */
                const fileType = mineTypes.extension(ctxSpeecherImage?.type);

                /** set image save path */
                const desFilePath = `${memberDIr + path.sep + generateResult.insertedId}.${fileType}`;
                const dbImagePath = `/assets/members/${generateResult.insertedId}.${fileType}`;

                console.log("des path", desFilePath);

                console.log("db image path", dbImagePath);
                try {
                    fs.copyFileSync(ctxSpeecherImage?.path, desFilePath);
                    fs.unlinkSync(ctxSpeecherImage?.path);

                    try {
                        /** update the image path of internalUser`s */
                        const result = await committeeDao.UpdateMemberImagePath(generateResult.insertedId,
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
    addMember,getAllMembers
}

