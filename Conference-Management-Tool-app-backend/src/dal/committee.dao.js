const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'CommitteeMembers';
//creating the database collection
const Members = new DatabaseService(collectionName);

//add an user to the collection
const addMember = async ({ name, designation, information, imagePath }) => {
    return await Members.save({ name,designation, information, imagePath })
}


const UpdateMemberImagePath = async (id, { imagePath }) => {
    return await Members.update(id, { imagePath });
};

const getAllMembers = async ()=>{
    return await Members.findAll();
};


module.exports = {
    addMember, UpdateMemberImagePath,getAllMembers
}