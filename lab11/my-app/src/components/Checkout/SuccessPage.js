import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './SuccessPage.css';
import { clearCart } from '../../actions/cartActions';

const SuccessPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBackToCatalog = async () => {
        console.log("Clearing cart...");
        await dispatch(clearCart()); // Очищення кошика
        console.log("Cart cleared. Navigating to catalog...");
        navigate('/catalog'); // Перехід до каталогу
    };
    

    return (
        <div className="success-page">
            <header className="success-header">
                <h2>Success!</h2>
            </header>
            <div className="success-content">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/1200px-Flat_tick_icon.svg.png"
                    alt="Success"
                    className="success-icon"
                />
                <p>Your order was sent to processing!</p>
                <p>Check your email box for further information.</p>
                <button
                    onClick={handleBackToCatalog}
                    className="success-button"
                >
                    Go back to Catalog
                </button>
            </div>
        </div>
    );
};

export default SuccessPage;
