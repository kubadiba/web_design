// ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCart.css';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cartActions';

const ProductCard = ({ id, image, title, description, author, genre, price }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const truncatedDescription = description.length > 100
        ? description.slice(0, 100) + '...'
        : description;

    const handleAddToCart = () => {
        dispatch(addToCart({ id, image, title, price }));
    };

    return (
        <div className="product-card">
            <h2>{title}</h2>
            <div className="product-image-placeholder">
                <img src={`http://localhost:3002${image}`} alt={title} />
            </div>
            <p>{truncatedDescription}</p>
            <p><strong>Author:</strong> {author}</p>
            <p><strong>Genre:</strong> {genre}</p>
            <p><strong>Price:</strong> ${price}</p>
            <button className="view-more" onClick={() => navigate(`/product/${id}`)}>View more</button>
        </div>
    );
};

export default ProductCard;
