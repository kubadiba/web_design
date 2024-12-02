// apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3002';

export const getCatalogItems = async (filters) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/catalog`, { params: filters });
        return response.data;
    } catch (error) {
        console.error('Error fetching catalog items:', error);
        throw error;
    }
};

export const getCartItems = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart items:', error);
        throw error;
    }
};

// export const updateCartItemQuantity = async (id, quantity) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/cart`, { id, quantity });
//         return response.data;
//     } catch (error) {
//         console.error('Error updating cart item quantity:', error);
//         throw error;
//     }
// };

export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/catalog/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        throw error;
    }
};

export const addToCart = async (product) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart`, {
            id: product.id,
            quantity: product.quantity,
            language: product.language, // Include language field
        });
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error);
        throw error;
    }
};


export const updateCartItemQuantity = async (id, quantity, language) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart`, { id, quantity, language });
        return response.data;
    } catch (error) {
        console.error('Error updating cart item quantity:', error);
        throw error;
    }
};



export const removeFromCart = async ({ id, language }) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/cart`, { id, quantity: 0, language });
        return response.data;
    } catch (error) {
        console.error('Error removing item from cart:', error);
        throw error;
    }
};

