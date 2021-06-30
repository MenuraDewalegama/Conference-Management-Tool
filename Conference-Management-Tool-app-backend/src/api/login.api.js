const LoginDao = require('../dal/login.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');


/**get the password of external users when pass the email */
const getPasswordbyID = async email => {
    return new Promise(async (resolve, reject) => {
        try {
            const generateResult = await LoginDao.getPasswordbyEmail(email);
            resolve(generateResult);
        } catch (error) {
            reject(error);
            console.log("test")
        };
    });
}


/**get the password of internal users when pass the email */
const getPasswordbyIDInternal = async email => {
    return new Promise(async (resolve, reject) => {
        try {
            const generateResult = await LoginDao.getPasswordbyEmailInternal(email);
            resolve(generateResult);
        } catch (error) {
            reject(error);
            console.log("test")
        };
    });
}



module.exports = {
     getPasswordbyID,getPasswordbyIDInternal
}

