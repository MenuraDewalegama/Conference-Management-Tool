const DatabaseService = require('../service/database.service.js');

const collectionName= 'InternalUsers';
const InternalUsers = new DatabaseService(collectionName);

const addInternalUser = async({fullName, contactNo, email, type, password, imagePath }) =>{
    return await InternalUsers.save({fullName, contactNo, email, type, password, imagePath })
}

const updateInternalUser = async(id, {fullName, contactNo, email, type, password, imagePath })=>{
    const internalUser = {
        fullName, 
        contactNo, 
        email, 
        type, 
        password, 
        imagePath }
    return await InternalUsers.update(id,internalUser);
}

const updateInternalUserImagePath = async(id, {imagePath}) =>{
    return await InternalUsers.update(id, {imagePath});
}

const deleteInternalUser = async id =>{
    return await InternalUsers.delete(id);
    console.log('enawa')
}

const getInternalUser = async id =>{
    return await InternalUsers.findById(id);
}

const getAllInternalUsers = async ()=>{
    return await InternalUsers.findAll();
};

module.exports = {
    addInternalUser,
    updateInternalUser,
    updateInternalUserImagePath,
    deleteInternalUser,
    getInternalUser,
    getAllInternalUsers,
}