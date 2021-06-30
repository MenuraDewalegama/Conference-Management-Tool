// import axios from './axios.service';
const axios = require('axios');

/**
 * Send email using emailJS web service.
 * "user_id": "user_Swzja6hgJOB3MOMfn8x53"
 * "service_id": "service_727resg"
 * "template_id": "template_7yqrsnk"
 * */
const sendEmail = ({
    user_id,
    service_id,
    template_id,
    template_params: { from_name, to_name, reply_to, message },
    accessToken
}) => {
    const sendData = {
        user_id,
        service_id,
        template_id,
        template_params: { from_name, to_name, reply_to, message },
        accessToken
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send',
                JSON.stringify(sendData), {
                headers: { 'Content-Type': 'application/json' }
            });
            if (response.status === 200) {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    sendEmail
};