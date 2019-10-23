import { GET_EXPENSES, LOGOUT, DELETE_EXPENSE } from "../constants";

export default (state=[], action) => {
    switch (action.type) {
        case GET_EXPENSES:
            return action.expenses;
        case DELETE_EXPENSE:
            return state.filter((e) => e._id !== action.id);
        case LOGOUT:
            return [];
        default:
            return state;
    }
}