/*
@author : Dhanusha Perera
@date : 27/05/2021
*/
const uuid = require('uuid');

/** generate an unique id and return it.
 * @param object  object.
 * @return Object with generated ID. */
const generateId = (object) => {
    object.id = uuid.v4();
    return object;
};

/** generate an unique id and return it.
 * @param object  object.
 * @return Array Array elements with generated ID. */
const generateIdForElementsInArray = (object) => {
    object.forEach(elem => {
        elem.id = uuid.v4();
    });

    return object;
};

module.exports = {
    generateId,
    generateIdForElementsInArray
};
