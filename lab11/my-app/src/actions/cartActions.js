import axios from 'axios';

export const getCartItems = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('http://localhost:3002/cart');
            dispatch({ type: 'SET_CART_ITEMS', payload: response.data });
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
};

export const updateCartItemQuantity = (id, quantity) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3002/cart', { id, quantity });
            dispatch({ type: 'UPDATE_CART_ITEM', payload: response.data });
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };
};

export const addToCart = (product) => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3002/cart', product);
            dispatch({ type: 'ADD_TO_CART', payload: response.data });
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };
};


export const clearCart = () => {
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3002/cart/clear');
            dispatch({ type: 'CLEAR_CART' });
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };
};

export const removeFromCart = (id) => {
    return async (dispatch) => {
        try {
            const response = await axios.post(`http://localhost:3002/cart`, { id, quantity: 0 }); // Simulates item deletion
            dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };
};



