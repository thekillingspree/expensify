import { SIGN_UP, LOGOUT, DEF_USER, LOGIN, SET_PROFILE } from "../constants";

export default (state={}, action) => {
    switch(action.type) {
        case SIGN_UP:
            return action.user;
        case LOGIN:
            return action.user;
        case LOGOUT:
            return DEF_USER;
        case SET_PROFILE: 
            return {...state, ...action.user};
        default:
            return state; 
    }
}