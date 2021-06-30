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

const deleteMember = async id =>{
    return await Members.delete(id);
}

const getMember = async id =>{
    return await Members.findById(id);
}

const updateMember = async(id, {name, designation, information })=>{
    const member = {
        name, 
        designation, 
        information, 
         }
    return await Members.update(id,member);
}

module.exports = {
    addMember, UpdateMemberImagePath,getAllMembers,deleteMember,getMember,updateMember
}