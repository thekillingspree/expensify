import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistReducer, persistStore } from 'redux-persist';

const rootReducer = persistReducer({
    storage: localStorage,
    key: 'root'
}, reducers);

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
export const persistor = persistStore(store);