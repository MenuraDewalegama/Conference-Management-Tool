const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'ExternalUsers';
//creating the database collection
const ExternalUsers = new DatabaseService(collectionName);

//add an user to the collection
const addExternalUser = async ({ email, name, contactNo, password, type, activityType, category, activityInformation, status, imagePath }) => {
    return await ExternalUsers.save({ email, name, contactNo, password, type, activityType, category, activityInformation, status, imagePath })
}


const updateExternaluserImagePath = async (id, { imagePath }) => {
    return await ExternalUsers.update(id, { imagePath });
};


module.exports = {
    addExternalUser, updateExternaluserImagePath
}