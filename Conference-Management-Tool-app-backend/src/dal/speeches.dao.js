const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'KeyNoteSpeeches';
//creating the database collection
const KeyNoteSpeeches = new DatabaseService(collectionName);

//add an user to the collection
const addKeyNoteSpeeches = async ({ name, designation, information, imagePath }) => {
    return await KeyNoteSpeeches.save({ name,designation, information, imagePath })
}


const updateKeyNoteSpeechesImagePath = async (id, { imagePath }) => {
    return await KeyNoteSpeeches.update(id, { imagePath });
};

const getAllSpeakers = async ()=>{
    return await KeyNoteSpeeches.findAll();
};


module.exports = {
    addKeyNoteSpeeches, updateKeyNoteSpeechesImagePath,getAllSpeakers
}