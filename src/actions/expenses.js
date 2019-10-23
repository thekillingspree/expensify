import { GET_EXPENSES, ADD_EXPENSE, DELETE_EXPENSE } from "../constants";
import axios from "../utils/axios";

export const setExpenses = expenses => ({
    expenses,
    type: GET_EXPENSES
});

export const getExpenses = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('/expenses/all?sortBy=updatedAt:desc');
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

export const updateExpense = async (expense, id) => {
    try {
        await axios.patch('/expenses/'+id, expense);
    } catch (error) {
        if (error.response) {
            return error.response.data;
        }
        return true;
    }
}

export const deleteExpenseAction = id => ({
    type: DELETE_EXPENSE,
    id
});

export const deleteExpense = id => {
    return async dispatch => {
        try {

            await axios.delete(`/expenses/${id}`);
            dispatch(deleteExpenseAction(id))

        } catch(e) {
            console.log(e);
            return true;                
        }
    }
}