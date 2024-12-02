// ProductDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';
import { getProductById, addToCart } from '../../../api/apiService';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("Ukrainian");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = await getProductById(id);
                if (data && typeof data.price === 'string') {
                    data.price = parseFloat(data.price);
                }
                setProduct(data);
                if (data.selectableField && data.selectableField.length > 0) {
                    setSelectedLanguage(data.selectableField[0]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        try {
            if (product) {
                await addToCart({
                    id: product.id,
                    quantity,
                    language: selectedLanguage, // Include selected language
                });
                alert('Product added to cart!');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Failed to add product to cart. Please try again.');
        }
    };
    
    
    

    const handleQuantityChange = (e) => {
        const value = parseInt(e.target.value);
        if (value >= 1 && value <= 30) {
            setQuantity(value);
        }
    };

    if (!product) return <p>Loading...</p>;

    const price = !isNaN(product.price) ? product.price.toFixed(2) : 'Price not available';

    return (
        <div className="product-detail-page">
            <div className="product-detail">
                <img src={`http://localhost:3002${product.image}`} alt={product.title} className="product-image" />
                <div className="product-detail-content">
                    <h1 className="product-title">{product.title}</h1>
                    <p className="product-description">{product.description}</p>
                    <p><strong>Author:</strong> {product.author}</p>
                    <p><strong>Genre:</strong> {product.genre}</p>
                    <div className="field-container">
                        <label htmlFor="quantity"><strong>Countable Field:</strong></label>
                        <input 
                            type="number" 
                            id="quantity" 
                            min="1" 
                            max="30" 
                            value={quantity} 
                            onChange={handleQuantityChange} 
                            className="countable-field-input"
                        />
                    </div>
                    <div className="field-container">
                        <label htmlFor="language"><strong>Selectable Field:</strong></label>
                        <select
                            id="language"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                            className="selectable-field-select"
                        >
                            {product.selectableField && Array.isArray(product.selectableField) ? (
                                product.selectableField.map((language, index) => (
                                    <option key={index} value={language}>{language}</option>
                                ))
                            ) : (
                                <option value="" disabled>No options available</option>
                            )}
                        </select>
                    </div>
                    <p className="price"><strong>Price:</strong> ${price}</p>
                    <div className="button-group">
                        <button className="go-back" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
