import {combineReducers} from 'redux';
import user from './user';
import expenses from './expenses';

export default combineReducers({
    user,
    expenses
});