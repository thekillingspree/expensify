import axios from "./axios";

export const resendMail = async () => {
    try {
        const {data} = await axios.post('/users/confirm/resend');
        if (data.result === 'success')
         return data.msg;
    } catch (error) {
        throw new Error('Failed To send mail. Please Try Again');
    }
}

