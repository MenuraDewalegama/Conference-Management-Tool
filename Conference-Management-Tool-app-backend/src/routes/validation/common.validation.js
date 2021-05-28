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
            errorMessage = '';
            try {
                require('mongodb').ObjectID(id);
            } catch (error) {
                errorMessage += 'ID is invalid. ID value should be 12 bytes in length. ' +
                    'ID should be contained only letters (case does not matter) and numbers.';
            }
        } else {
            errorMessage += 'Invalid: ID is required.';
        }

        if (errorMessage.length === 0){
            resolve(true);
        } else {
            reject(errorMessage);
        }
    });
};

module.exports = {
    validateID
};
