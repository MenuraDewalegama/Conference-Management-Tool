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
    console.log('awa ID eka: ', id);
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

module.exports = {
    validateID
};
