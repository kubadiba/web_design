// Header.js
import React from 'react';
import { Link } from 'react-router-dom'; // Додаємо Link для роботи з React Router
import './Header.css';
import logoImage from '../../images/book_logo.png';

function Header() {
    return (
        <header className="header">
            <div className="logo-container">
                <img src={logoImage} alt="Logo" className="header-logo" />
                <p className="logo-text">BookShop</p>
            </div>
            <div className="header-buttons">
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/catalog">Catalog</Link>
                    {/* Замінюємо <a> на <Link> для правильного маршруту */}
                    <Link to="/cart">Cart</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
