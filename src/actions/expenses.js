import { GET_EXPENSES, ADD_EXPENSE } from "../constants";
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

export const addExpense = expense => ({
    expense,
    type: ADD_EXPENSE
})

export const createExpense = expense => {
    return async dispatch => {
        try {
            const {data} = await axios.post('/expenses/new', expense);
            dispatch(addExpense(data));
            return null;
        } catch (error) {
            if (error.response) {
                return error.response.data;
            }
            return true;
        }
    }
}