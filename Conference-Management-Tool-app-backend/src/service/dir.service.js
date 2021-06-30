/*
@author : Dhanusha Perera
@date : 28/05/2021
*/
const fs = require('fs');
const path = require('path');

/* directory paths declaration. */
const publicDir = path.join(process.cwd(), `/public`);
const assetDir = path.join(process.cwd(), `/public/assets`);
const conferencePostDir = path.join(process.cwd(), `/public/assets/conference-posts`);
const keySpeakersDir = path.join(process.cwd(), `/public/assets/conference-posts/key-speakers`);

/* creates dir if not exists. */
const createDirIfNotExists = () => {
    if (!fs.existsSync(publicDir)) {
        /* creating assets dir. */
        fs.mkdirSync(publicDir);
    }

    /* create assets dir if not exists. */
    if (!fs.existsSync(assetDir)) {
        /* creating assets dir. */
        fs.mkdirSync(assetDir);
    }

    /* create products dir if not exists. */
    if (!fs.existsSync(conferencePostDir)) {
        /* creating products dir. */
        fs.mkdirSync(conferencePostDir);
    }

    if (!fs.existsSync(keySpeakersDir)) {
        /* creating products dir. */
        fs.mkdirSync(keySpeakersDir);
    }
};

/* Creates a new dir if not exists. */
const createNewDirFor = (directoryPath) => {
    return new Promise((resolve, reject) => {
        const dirPath = directoryPath;

        try {
            if (!fs.existsSync(dirPath)) {
                /* creating products dir. */
                fs.mkdirSync(dirPath);
            }

            resolve(fs.existsSync(dirPath));
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createDirIfNotExists,
    createNewDirFor
};
