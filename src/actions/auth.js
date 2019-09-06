import axios from '../utils/axios';
import { SIGN_UP, AUTH_ERROR, LOGIN, LOGOUT } from '../constants';

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


export const logoutRedux = () => {
    return {
        type: LOGOUT
    }
}
export const logout = () => {
    return async dispatch => {
        try {
            await axios.post('/users/logout');
            dispatch(logoutRedux());
        } catch (error) {
            console.log(error);
            dispatch(authError(error.response.data))
        }
    }
}

export const authCall = (user, type) => {
    return async dispatch => {
        try {
            const {data} = await axios.post(`/users/${type}`, user);
            const userData = {...data.user, token: data.token};
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