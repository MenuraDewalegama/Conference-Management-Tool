const DatabaseService = require('../service/database.service.js');

const collectionName= 'InternalUsers';
const InternalUsers = DatabaseService(collectionName);

const addInternalUser = async({fullName, contactNo, email, type, imagePath }) =>{
    return await InternalUsers.save({fullName, contactNo, email, type, imagePath })
}

const updateInternalUser = async(id, {fullName, contactNo, email, type, imagePath })=>{
    const internalUser = {fullName, contactNo, email, type, imagePath }
    return await InternalUsers.update(id,internalUser);
}

const updateInternalUserImagePath = async(id, {imagePath}) =>{
    return await InternalUsers.update(id, {imagePath});
}

const deleteInternalUser = async id =>{
    return await internalUser.delete(id);
}

const getInternalUser = async id =>{
    return await internalUser.findById(id);
}

const getAllInternalUsers = async ()=>{
    return await internalUser.findAll();
};

module.exports = {
    addInternalUser,
    updateInternalUser,
    updateInternalUserImagePath,
    deleteInternalUser,
    getInternalUser,
    getAllInternalUsers,
}