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

/** Save a new InernalUser by calling backend services.
 * @param product InernalUser object with and new values but the ID .
 * @returns Promise promise a result. */
const saveInternalUser = (internalUser) => {
    return new Promise(async (resolve, reject) => {
        console.log("calling service");
        try {
            const formData = await configureFormDataObject(true, internalUser);

            try { /* send a post request to the backend using axios. */
                const response = await axios.post(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}internaluser`, formData);
                resolve(response);
            } catch (error) {
                reject(error);
            }

        } catch (error) {
            reject(error);
        }

    });
};

const configureFormDataObject = (isAdding, internalUser) => {
    return new Promise((resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('fullName', internalUser.fullName);
            formData.append('contactNo', internalUser.contactNo);
            formData.append('email', internalUser.email);
            formData.append('password', internalUser.password);
            formData.append('type', internalUser.type);

            if (isAdding && internalUser.hasOwnProperty('internalUserImage') && internalUser.internalUserImage) {
                /* append the image to the formData, if only client did upload any image. */
                formData.append('internalUserImage', internalUser.internalUserImage);
            }

            if (!isAdding) {
                /* ready the formData object for update operation. */
                if (product.hasOwnProperty('internalUserImage') && internalUser.internalUserImage) {
                    /* append the image to the formData, if only client did upload any image. */
                    formData.append('productImage', internalUser.internalUserImage);
                } else {
                    /* append the imagePath to the formData, if only client did not upload any image
                        or if in case client wants to remove the existing image. */
                    if (internalUser.hasOwnProperty('imagePath')) {
                        formData.append('imagePath', internalUser.imagePath);
                    }
                }
            }
            resolve(formData);
        } catch (error) {
            reject(error);
        }
    });
};


/**implemented Add internal User Method into context */

module.exports = {
    getAllInternalUsers,
    saveInternalUser
};