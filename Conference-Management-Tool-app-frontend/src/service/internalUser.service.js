import axios from './axios.service';

/** Get all products by calling backend services.
 * @return Promise promise a result. */
const getAllinternalUsers = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await axios.get(`${process.env.ECOMMERCE_BACKEND_API_URL}products`);
            resolve(result);
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    getAllinternalUsers
};