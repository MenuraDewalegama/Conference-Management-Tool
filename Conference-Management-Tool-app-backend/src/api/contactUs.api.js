const contactUsDao = require('../dal/contactUs.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

// Inserting a message 
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

// Get all messages
const getAllMessages = async () => {
    return await contactUsDao.getAllMessages();
}

// Deleting a message
const deleteMessage = async id => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await contactUsDao.deleteMessage(id);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    })
};


module.exports = {
    insertMessage, getAllMessages, deleteMessage
}

