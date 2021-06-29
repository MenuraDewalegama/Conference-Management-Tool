import axios from './axios.service';


const getAllSpeakers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}speeches`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};



module.exports = {
    getAllSpeakers
}