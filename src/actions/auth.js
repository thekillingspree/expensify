import axios from '../utils/axios';
import { API, SIGN_UP, AUTH_ERROR, LOGIN, LOGOUT } from '../constants';

const signUp = user => ({
    type: SIGN_UP,
    user
});

const login = user => ({
    type: LOGIN,
    user
});

const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const logout = () => {
    axios.defaults.headers['Authorization'] = null;
    return {
        type: LOGOUT
    }
}

export const authCall = (user, type) => {
    return async dispatch => {
        try {
            const {data} = await axios.post(`/users/${type}`, user);
            const userData = {...data.user, token: data.token};
            axios.defaults.headers['Authorization'] = data.token;
            if (type === 'signup') {
                return dispatch(signUp(userData));
            }
            return dispatch(login(userData));
        } catch (error) {
            console.log(error.response.data);
            return error.response.data;
        }
    }
}