const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'ContactUs';
//creating the database collection
const ContactUs = new DatabaseService(collectionName);

//add an user to the collection
const insertMessage = async ({ email, name, subject, message }) => {
    return await ContactUs.save({ email, name, subject, message })
}


const getAllMessages = async () => {
    const messages = await ContactUs.findAll();
    console.log(messages)
    return messages;
}

const deleteMessage = async id => {
    return await ContactUs.delete(id);
}


module.exports = {
    insertMessage, getAllMessages, deleteMessage
}