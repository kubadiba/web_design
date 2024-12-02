import React, { useEffect, useState } from 'react';
import { updateCartItemQuantity, getCartItems, removeFromCart } from '../../api/apiService';
import './CartPage.css';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    
    useEffect(() => {
        const fetchCartItems = async () => {
            setLoading(true);
            try {
                const data = await getCartItems();
                setItems(data);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleIncreaseQuantity = async (item) => {
        if (item.quantity < 30) {
            try {
                const updatedItems = await updateCartItemQuantity(item.id, item.quantity + 1, item.language);
                setItems(updatedItems);
            } catch (error) {
                console.error('Error increasing quantity:', error);
            }
        }
    };

    const handleDecreaseQuantity = async (item) => {
        if (item.quantity > 1) {
            try {
                const updatedItems = await updateCartItemQuantity(item.id, item.quantity - 1, item.language);
                setItems(updatedItems);
            } catch (error) {
                console.error('Error decreasing quantity:', error);
            }
        } else {
            // Видаляємо товар, якщо кількість стає 0
            handleDeleteItem(item.id, item.language);
        }
    };

    const handleDeleteItem = async (id, language) => {
        try {
            const updatedItems = await removeFromCart({ id, language }); // Видалення товару
            setItems(updatedItems);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleContinue = () => {
        if (items.length > 0) {
            navigate('/checkout');
        } else {
            alert('Your cart is empty!');
        }
    };

    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h2>Shopping Cart</h2>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="cart-items">
                        {items.length === 0 ? (
                            <p>Your cart is empty</p>
                        ) : (
                            items.map((item) => (
                                <div className="cart-item" key={`${item.id}-${item.language}`}>
                                    <img src={`http://localhost:3002${item.image}`} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h3>{item.title}</h3>
                                        <p><strong>Language:</strong> {item.language}</p>
                                        <div className="quantity-controls">
                                            <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                                        </div>
                                    </div>
                                    <div className="cart-item-actions">
                                        <p className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</p>
                                        <button className="delete-button" onClick={() => handleDeleteItem(item.id, item.language)}>Delete</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="cart-summary">
                        <h3>Total amount: ${totalAmount.toFixed(2)}</h3>
                        <div className="cart-buttons">
                            <button className="back-to-catalog" onClick={() => window.history.back()}>Back to Catalog</button>
                            <button className="continue" onClick={handleContinue}>Continue</button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;



