// store/store.js
import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer,
    // можна додати більше редукторів сюди, якщо буде потреба
});

const store = createStore(rootReducer);

export default store;
