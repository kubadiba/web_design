import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import cartReducer from '../reducers/cartReducer';

const rootReducer = combineReducers({
    cart: cartReducer
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk)  // використовуємо thunk як middleware
);

export default store;
