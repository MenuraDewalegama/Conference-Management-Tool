import axios from './axios.service';


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