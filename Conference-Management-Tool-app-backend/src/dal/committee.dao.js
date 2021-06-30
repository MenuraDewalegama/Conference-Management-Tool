const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'CommitteeMembers';
//creating the database collection
const Members = new DatabaseService(collectionName);

//add an member to the collection
const addMember = async ({ name, designation, information, imagePath }) => {
    return await Members.save({ name,designation, information, imagePath })
}

//update a member image in the collection
const UpdateMemberImagePath = async (id, { imagePath }) => {
    return await Members.update(id, { imagePath });
};

//update a member from the collection
const updateMember = async(id, {name, designation, information })=>{
    const member = {
        name, 
        designation, 
        information, 
         }
    return await Members.update(id,member);
}

//get a member from the collection
const getMember = async id =>{
    return await Members.findById(id);
}

//get all members from the collection
const getAllMembers = async ()=>{
    return await Members.findAll();
};

//delete a member from the collection
const deleteMember = async id =>{
    return await Members.delete(id);
}



module.exports = {
    addMember, UpdateMemberImagePath,getAllMembers,deleteMember,getMember,updateMember
}