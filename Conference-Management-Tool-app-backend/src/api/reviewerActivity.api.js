const reviewerActivityDao = require('../dal/reviewerActivity.dao');
const mineTypes = require('mime-types');
const fs = require('fs');
const path = require('path');

const getAllPapers = async () => {
    return await reviewerActivityDao.getAllPapers();
}

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