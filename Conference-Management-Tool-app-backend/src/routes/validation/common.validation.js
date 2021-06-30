/*
@author : Dhanusha Perera
@date : 27/05/2021
*/

/** validate the given ID.
 *
 * @param id id which is going to be validated.
 * @returns errorMessage errors are logged into errorMessage variable as a string.
 * if no errors found then errorMessage object would be a string string. */
const validateID = (id) => {
    return new Promise((resolve, reject) => {
        let errorMessage = '';
        if (id) {
            try {
                require('mongodb').ObjectID(id);
                resolve(true);
            } catch (error) {
                reject('ID is invalid. ID value should be 12 bytes in length. ' +
                    'ID should be contained only letters (case does not matter) and numbers.');
            }
        } else {
            reject('Invalid: ID is required.');
        }
    });
};

/** Check if the input is an string, and check whether it is an empty string. */
const validateStringOnly = (value) => {
    let errorMessage = '';
    if (typeof value !== 'string' || value.length <= 0) {
        errorMessage += '{0} field is required. Accepted only strings.';
    }

    return errorMessage;
};

/* Check if the input value(as string) is an integer. */
const validateIntegerOnly = (value) => {
    let errorMessage = '';
    if (typeof value !== 'number' || !Number.isInteger(Number.parseInt(value))) {
        errorMessage += '{0} field is required. Accepted only an integer.';
    }

    return errorMessage;
};

const validateDateIsInISOFormat = (dateString) => {
    let errorMessage = '';
    try {
        const dateParsed = new Date(Date.parse(dateString));

        if (dateParsed.toISOString() !== dateString) {
            errorMessage += '{0} field is invalid. It should be in ISOString format.';
        }
    } catch (error) {
        errorMessage += '{0} field is invalid. It should be in ISOString format.';
    }

    return errorMessage;
};


const detectUnknownFields = (entityObject, keys) => {
    let errorMessages = '';
    // const keys = ['topic', 'description', 'venue', 'dateTime'];
    let fieldNotDetected = [...keys];
    Object.keys(entityObject).forEach((key, index) => {
        let isKnownField = false;
        for (let i = 0; i < keys.length; i++) {
            if (key === keys[i]) {
                isKnownField = true;
                fieldNotDetected = fieldNotDetected.filter(elem => elem !== key);
                break;
            }
        }

        /*if this key field is NOT a known field. */
        if (!isKnownField) {
            errorMessages += `Invalid Key Field Detected: ${key}\n`;
        }
    });

    /* if some field are missing, then */
    if (fieldNotDetected.length !== 0) {
        fieldNotDetected.forEach(field => {
            errorMessages += `${field} key field is required.\n`;
        });
    }

    return errorMessages;
};

module.exports = {
    validateID,
    validateStringOnly,
    validateIntegerOnly,
    validateDateIsInISOFormat,
    detectUnknownFields
};
