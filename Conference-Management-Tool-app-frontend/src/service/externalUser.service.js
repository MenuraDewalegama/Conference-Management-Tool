import axios from './axios.service';

/** Get all internal Users by calling backend services.
//  * @return Promise promise a result. */
// const getAllInternalUsers = () => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const result = await axios.get(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}internaluser`);
//             resolve(result);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };

/** Get internal User by internalUserID by calling backend services.
//  * @param internalUserID ID of the internal Users  that is being retrieved.
//  * @return Promise promise a result. */
//  const getInternalUserByID = (internalUserID) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const result = await axios.get(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}internaluser/${internalUserID}`);
//             resolve(result);
//         } catch (error) {
//             reject(error);
//         }
//     });
// };


/** Save a new InernalUser by calling backend services.
 * @param externalUser InernalUser object with and new values but the ID .
 * @returns Promise promise a result. */
const saveExternalUser = (externalUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formData = await configureFormDataObject(true, externalUser);

            try { /* send a post request to the backend using axios. */
                const response = await axios.post(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}externalUser`, formData);
                resolve(response);
            } catch (error) {
                reject(error);
            }

        } catch (error) {
            reject(error);
        }

    });
};


// /** Update a existing InternalUser by calling backend services.
//  * @param InternalUser InternalUser object with the ID and new values.
//  * @returns Promise promise a result. */
//  const updateInternalUser = (internalUser) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const formData = await configureFormDataObject(false, internalUser);

//             /* send a put request to the backend using axios. */
//             const response = axios.put(`${process.env.CONFERENCE_MANAGEMENT_BACKEND_API_URL}internaluser/${internalUser?.id}`, formData);
//             resolve(response);
//         } catch (error) {
//             if (error.response) {
//                 // The request was made and the server responded with a status code
//                 // that falls out of the range of 2xx
//             } else if (error.request) {
//                 // The request was made but no response was received
//                 // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//                 // http.ClientRequest in node.js
//                 console.log(error.request);
//             } else {
//                 // Something happened in setting up the request that triggered an Error
//                 console.log('Error', error.message);
//             }
//             console.log(error.config);
//             reject(error);
//         }
//     });
// };

const configureFormDataObject = (isAdding, externalUser) => {
    return new Promise((resolve, reject) => {
        try {
            let formData = new FormData();
            formData.append('name', externalUser.name);
            formData.append('contactNo', externalUser.contactNo);
            formData.append('password', externalUser.password);
            formData.append('activityType', externalUser.activityType);
            formData.append('activityType', externalUser.activityType);
            formData.append('category', externalUser.category);
            formData.append('activityInformation', externalUser.activityInformation);


            if (isAdding && externalUser.hasOwnProperty('externalUserImage') && externalUser.externalUserImage) {
                /* append the image to the formData, if only client did upload any image. */
                formData.append('externalUserImage', externalUser.externalUserImage);
            }

            if (!isAdding) {
                /* ready the formData object for update operation. */
                if (externalUser.hasOwnProperty('externalUserImage') && externalUser.externalUserImage) {
                    /* append the image to the formData, if only client did upload any image. */
                    formData.append('externalUserImage', externalUser.externalUserImage);
                } else {
                    /* append the imagePath to the formData, if only client did not upload any image
                        or if in case client wants to remove the existing image. */
                    if (externalUser.hasOwnProperty('imagePath')) {
                        formData.append('imagePath', externalUser.imagePath);
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

    saveExternalUser

};