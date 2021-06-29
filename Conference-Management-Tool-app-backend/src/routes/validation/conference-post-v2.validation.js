/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const commonValidation = require('./common.validation');

const validateTopic = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : true;
};

const validateDescription = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : true;
};

const validateVenue = (value) => {
    const errorMessage = commonValidation.validateStringOnly(value);
    return (errorMessage.length !== 0) ? errorMessage : true;
};

const validateDateTime = (dateString) => {
    const errorMessage = commonValidation.validateDateIsInISOFormat(dateString);
    return (errorMessage.length !== 0) ? errorMessage : true;
};


module.exports = {
    validateTopic,
    validateDescription,
    validateVenue,
    validateDateTime
};
