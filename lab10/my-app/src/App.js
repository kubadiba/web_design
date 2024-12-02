// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CatalogProvider from './components/Catalog/Context/CatalogContext';
import Catalog from './components/Catalog/Catalog';
import ProductDetailPage from './components/Catalog/Product/ProductDetailPage';
import Home from './components/MainContent/MainContent';
import CartPage from './components/Cart/CartPage';

function App() {
    return (
        <CatalogProvider>
            <div className="App">
                <Header />
                <main>
                    {/* Компонент Routes, який містить всі маршрути */}
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* Головна сторінка */}
                        <Route path="/catalog" element={<Catalog />} /> {/* Сторінка каталогу */}
                        <Route path="/product/:id" element={<ProductDetailPage />} /> {/* Сторінка товару */}
                        <Route path="/cart" element={<CartPage />} /> {/* Сторінка кошика */}
                    </Routes>
                </main>
                <Footer />
            </div>
        </CatalogProvider>
    );
}

export default App;
