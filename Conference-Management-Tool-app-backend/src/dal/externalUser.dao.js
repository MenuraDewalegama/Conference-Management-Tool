const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName= 'ExternalUsers';
//creating the database collection
const ExternalUsers = new DatabaseService(collectionName);

//add an user to the collection
const addExternalUser = async({email,name, contactNo, password, type, activityType, category, activityInformation }) =>{
    return await ExternalUsers.save({email, name, contactNo, password, type,activityType, category,activityInformation })
}



module.exports = {
    addExternalUser
}