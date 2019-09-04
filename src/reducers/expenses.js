import { GET_EXPENSES } from "../constants";

export default (state=[], action) => {
    switch (action.type) {
        case GET_EXPENSES:
            return action.expenses;
        default:
            return state;
    }
}