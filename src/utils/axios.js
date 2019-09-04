import { API } from "../constants";

import axios from 'axios';
import store from '../store';

const instance = axios.create({
    baseURL: API,
});


instance.interceptors.request.use((config) => {
    const token = store.getState().user.token;
    if (token) 
        return {...config, headers: {...config.headers, Authorization: `Bearer ${token}`}}
    return config;
})

export default instance;