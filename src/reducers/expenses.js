import { GET_EXPENSES, LOGOUT } from "../constants";

export default (state=[], action) => {
    switch (action.type) {
        case GET_EXPENSES:
            return action.expenses;
        case LOGOUT:
            return [];
        default:
            return state;
    }
}