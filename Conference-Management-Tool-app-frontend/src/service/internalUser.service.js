import axios from './axios.service';

/** Get all products by calling backend services.
 * @return Promise promise a result. */
const getAllInternalUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}internaluser`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

const saveInernalUser = ()=>{
    
}

module.exports = {
    getAllInternalUsers
};