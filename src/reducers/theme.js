import { red, SET_DARK, SET_THEME, LOGOUT } from "../constants"

const initialState = {
    darkMode: false,
    color: red
}

export default (state = initialState, action) => {
    switch (action.type) {

    case SET_DARK:
        return { ...state, darkMode: action.darkMode }
    case SET_THEME:
        return {...state, color: action.color}
    case LOGOUT:
        return initialState;
    default:
        return state
    }
}
