import axios from 'axios';
import { API, SIGN_UP, AUTH_ERROR } from '../constants';

const signUp = user => ({
    type: SIGN_UP,
    user
});

const authError = error => ({
    type: AUTH_ERROR,
    error
});


export const signUpCall = user => {
    return async dispatch => {
        try {
            const {data} = await axios.post(`${API}/users/signup`, user);
            console.log(data);
            return dispatch(signUp({...data.user, token: data.token}));
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
}