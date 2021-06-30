const DatabaseService = require('../service/database.service.js');

//define the collection name
const collectionName = 'ExternalUsers';
//creating the database collection
const ExternalUsers = new DatabaseService(collectionName);

const getAllPapers = async () => {
    const papers = await ExternalUsers.findAll();
    // console.log(papers)
    let research_papers = [];
    if (papers.length > 0) {
        papers.map((paper) => {
            // if (paper.type == "RESEARCHER") {
            paperDetails = {
                id: paper._id,
                email: paper.email,
                name: paper.name,
                contactNo: paper.contactNo,
                type: paper.type,
                status: paper.status,
                activityType: paper.activityType,
                category: paper.category,
                activityInformation: paper.activityInformation,
                imagePath: paper.imagePath
            }
            research_papers.push(paperDetails)
            // }
            console.log(paper)
        });
    }
    return research_papers;
    // return papers;
}

const updateStatus = async (id, { status }) => {
    const reviewUpdate = {
        status
    }
    return await ExternalUsers.update(id,reviewUpdate);

}


module.exports = {
    getAllPapers,
    updateStatus
}