/*
@author : Dhanusha Perera
@date : 30/06/2021
*/

const commonValidation = require('./common.validation');
const conferencePostV2Validation = require('./conference-post-v2.validation');
const keys = ['name', 'title', 'description']; // 'conferencePostID',

const validateName = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

const validateTitle = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

const validateDescription = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};


const validateKeySpeaker = async (keySpeaker) => {
    let errorMessages = '';
    /* detectUnknownFields */
    errorMessages += commonValidation.detectUnknownFields(keySpeaker, keys);

    if (errorMessages.length === 0) {

        // try {
        //     await commonValidation.validateID(keySpeaker?.conferencePostID);
        // } catch (errorMessage) {
        //     errorMessages += `${errorMessage}\n`;
        // }

        /* name */
        errorMessages += (validateName(keySpeaker?.name).length > 0) ?
            validateName(keySpeaker?.name).replace(`{0}`, `name`) + '\n' : '';

        /* title */
        errorMessages += (validateTitle(keySpeaker?.title).length > 0) ?
            validateTitle(keySpeaker?.title).replace(`{0}`, `title`) + '\n' : '';

        /* description */
        errorMessages += (validateDescription(keySpeaker?.description).length > 0) ?
            validateDescription(keySpeaker?.description).replace(`{0}`, `description`) + '\n' : '';
    }

    return (errorMessages);
};


module.exports = {
    validateName,
    validateTitle,
    validateDescription,
    validateKeySpeaker
};
