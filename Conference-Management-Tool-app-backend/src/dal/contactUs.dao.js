const DatabaseService = require('../service/database.service.js');

// Define the collection name
const collectionName = 'ContactUs';
// Creating the database collection
const ContactUs = new DatabaseService(collectionName);

// Add a contact us message to the collection
const insertMessage = async ({ email, name, subject, message }) => {
    return await ContactUs.save({ email, name, subject, message })
}

// Get all contact us messages from the collection
const getAllMessages = async () => {
    const messages = await ContactUs.findAll();
    console.log(messages)
    return messages;
}

// Delete a contact us message from the collection
const deleteMessage = async id => {
    return await ContactUs.delete(id);
}


module.exports = {
    insertMessage, getAllMessages, deleteMessage
}