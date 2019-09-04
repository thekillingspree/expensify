import axios from "../utils/axios";
import { SET_PROFILE } from "../constants";

const setProfile = user => ({
    type: SET_PROFILE,
    user
});

export const updateProfile = () => {
    return async (dispatch) => {
        try {
            const {data} = await axios.get('/users/me');
            dispatch(setProfile(data));
        } catch (error) {
            console.log(error.response.data);
        }
    }
}