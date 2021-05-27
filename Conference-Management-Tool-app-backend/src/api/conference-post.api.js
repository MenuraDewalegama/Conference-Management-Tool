/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const conferencePostDAO = require('../dal/conference-post-dao');

/* get all conference posts. */
const getAllConferencePost = () => {
    return conferencePostDAO.getAllConferencePost();
};

/* get a conference post by ID. */
const getConferencePostByID = (conferencePostID) => {
    return conferencePostDAO.getConferencePost(conferencePostID);
};

/* creates a new save conference post. */
const saveConferencePost = (conferencePost) => {
    return conferencePostDAO.createConferencePost(conferencePost);
};

/* update a conference post. */
const updateConferencePost = (id, conferencePost) => {
    return conferencePostDAO.updateConferencePost(id, conferencePost);
};

/* delete a conference post by ID. */
const deleteConferencePost = (conferencePostID) => {
    return conferencePostDAO.deleteConferencePost(conferencePostID);
};

module.exports = {
    getAllConferencePost,
    getConferencePostByID,
    saveConferencePost,
    updateConferencePost,
    deleteConferencePost
};
