/*
@author : Dhanusha Perera
@date : 27/05/2021
*/

const checkKeySpeakersImageFiles = (imageFiles, keySpeakersArray) => {
    return new Promise((resolve, reject) => {
        let countImageOfKeySpeakers = 0;
        let checkingArr = [];

        /* check key speakers variable is an array or not. */
        if (!(imageFiles?.conferencePostImage)) {
            reject({
                code: 400,
                message: 'Invalid: Conference image is required.'
            });
        } else if (Array.isArray(keySpeakersArray) && keySpeakersArray.length >= 0) {
            /* get the key speakers array size and
            put numbers from 1 to key speakers array size into checking array. */
            for (let i = 1; i <= keySpeakersArray.length; i++) {
                checkingArr.push(i);
            }

            /* looping thorough imageFiles. */
            for (const [key, value] of Object.entries(imageFiles)) {
                const keySpeakerNumber = Number.parseInt(key.split('imageOfKeySpeaker')[1]);
                if (key.startsWith('imageOfKeySpeaker') &&
                    !isNaN(keySpeakerNumber) &&
                    value &&
                    checkingArr.includes(keySpeakerNumber)) {
                    countImageOfKeySpeakers += 1;
                }
            }

            if (countImageOfKeySpeakers === keySpeakersArray.length) {
                resolve(true);
            } else {
                reject({
                    code: 400,
                    message: 'Invalid: Number of Key Speakers and number of images for the key speakers do not match.'
                });
            }
        } else {
            reject({
                code: 400,
                message: 'Invalid: Key Speakers should be an array which contains at least one key speaker.'
            });
        }
    });
};

module.exports = {
    checkKeySpeakersImageFiles
};
