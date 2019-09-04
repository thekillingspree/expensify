import { GET_EXPENSES } from "../constants";
import axios from "../utils/axios";

export const setExpenses = expenses => ({
    expenses,
    type: GET_EXPENSES
});

export const getExpenses = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('/expenses/all');
            return dispatch(setExpenses(data));
        } catch (error) {
            console.log(error);
        }
    }
}