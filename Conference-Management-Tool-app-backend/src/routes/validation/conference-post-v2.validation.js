/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const commonValidation = require('./common.validation');
const keys = ['topic', 'description', 'venue', 'dateTime'];

const validateTopic = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

const validateDescription = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

const validateVenue = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

const validateDateTime = (dateString) => {
    const errorMessage = commonValidation.validateDateIsInISOFormat(dateString);
    return (errorMessage.length !== 0) ? errorMessage : '';
};

// const detectUnknownFields = (conferencePost, keys) => {
//     let errorMessages = '';
//     // const keys = ['topic', 'description', 'venue', 'dateTime'];
//     let fieldNotDetected = [...keys];
//     Object.keys(conferencePost).forEach((key, index) => {
//         let isKnownField = false;
//         for (let i = 0; i < keys.length; i++) {
//             if (key === keys[i]) {
//                 isKnownField = true;
//                 fieldNotDetected = fieldNotDetected.filter(elem => elem !== key);
//                 break;
//             }
//         }
//
//         /*if this key field is NOT a known field. */
//         if (!isKnownField) {
//             errorMessages += `Invalid Key Field Detected: ${key}\n`;
//         }
//     });
//
//     /* if some field are missing, then */
//     if (fieldNotDetected.length !== 0) {
//         fieldNotDetected.forEach(field => {
//             errorMessages += `${field} key field is required.\n`;
//         });
//     }
//
//     return errorMessages;
// };

// detectUnknownFields({
//     topic: 'batman',
//     description: 'superman',
//     venue: 'SLIIT',
//     dateTime: '2021-05-05'
// });

const validateConferencePost = (conferencePost) => {
    let errorMessages = '';
    /* detectUnknownFields */
    errorMessages += commonValidation.detectUnknownFields(conferencePost, keys);

    if (errorMessages.length === 0) {
        /* topic */
        errorMessages += (validateTopic(conferencePost?.topic).length > 0) ?
            validateTopic(conferencePost?.topic).replace(`{0}`, `topic`) + '\n' : '';


        /* description */
        errorMessages += (validateDescription(conferencePost?.description).length > 0) ?
            validateDescription(conferencePost?.description).replace(`{0}`, `description`) + '\n' : '';

        /* venue */
        errorMessages += (validateVenue(conferencePost?.venue).length > 0) ?
            validateDescription(conferencePost?.venue).replace(`{0}`, `venue`) + '\n' : '';

        /* dateTime */
        errorMessages += (validateDateTime(conferencePost?.dateTime).length > 0) ?
            validateDateTime(conferencePost?.dateTime).replace(`{0}`, `dateTime`) + '\n' : '';
    }

    return (errorMessages);
};


module.exports = {
    validateTopic,
    validateDescription,
    validateVenue,
    validateDateTime,
    // detectUnknownFields,
    validateConferencePost
};
