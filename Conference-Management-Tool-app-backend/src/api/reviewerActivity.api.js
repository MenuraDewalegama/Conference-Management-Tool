const reviewerActivityDao = require('../dal/reviewerActivity.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

// Get all papers from the collection
const getAllPapers = async () => {
    return await reviewerActivityDao.getAllPapers();
}

// Update the status
const updateStatus = async (id, { status }) => {
    review = {
        status
    }
    return await reviewerActivityDao.updateStatus(id, review);
}

module.exports = {
    getAllPapers,
    updateStatus
}