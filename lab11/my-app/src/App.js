import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CatalogProvider from './components/Catalog/Context/CatalogContext';
import Catalog from './components/Catalog/Catalog';
import ProductDetailPage from './components/Catalog/Product/ProductDetailPage';
import Home from './components/MainContent/MainContent';
import CartPage from './components/Cart/CartPage';
import CheckoutPage from './components/Checkout/CheckoutPage';
import SuccessPage from './components/Checkout/SuccessPage';

function App() {
    return (
        <CatalogProvider>
            <div className="App">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/catalog" element={<Catalog />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/success" element={<SuccessPage />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </CatalogProvider>
    );
}

export default App;
