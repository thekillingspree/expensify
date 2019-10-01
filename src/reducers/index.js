import {combineReducers} from 'redux';
import user from './user';
import expenses from './expenses';
import theme from './theme';

export default combineReducers({
    user,
    expenses,
    theme
});