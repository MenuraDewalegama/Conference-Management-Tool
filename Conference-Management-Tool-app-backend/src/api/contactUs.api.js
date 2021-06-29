const contactUsDao = require('../dal/contactUs.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');


const insertMessage = async ({ email, name, subject, message }) => {
    const contactInfo = {
        email,
        name,
        subject,
        message
    }

    return new Promise(async (resolve, reject) => {
        try {
            const result = await contactUsDao.insertMessage(contactInfo);
            resolve(result) 
        } catch (error) {
            console.log(error)
        };
    });
};



module.exports = {
    insertMessage
}

