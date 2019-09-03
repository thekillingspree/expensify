import { API } from "../constants";

import axios from 'axios';
import store from '../store';

const instance = axios.create({
    baseURL: API,
    headers: {
        contentType: 'application/json',
        accept: 'application/json',
    }
});

export default instance;