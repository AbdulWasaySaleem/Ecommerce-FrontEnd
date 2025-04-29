import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FlashSalesSlider } from './components/FlashSalesSlider';
import { CategorySlider } from './components/CategorySlider';
import { ExploreProducts } from './components/ExploreProducts';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Wishlist } from './pages/Wishlist';
// import { Brands } from "./pages/Brands";
import { Products } from './pages/Products';
import { ProductDetail } from './pages/ProductDetail';
import { Link } from 'react-router-dom';
import { PromoSlider } from './components/PromoSlider';
import Brands from './pages/Brands';
function App() {
  return (
    <Router>
      <ShopProvider>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Header />
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/" element={
              <main className="container mx-auto px-4 py-8 flex-grow">
                <section className="mb-12">
                 <PromoSlider/>
                </section>

                <section className="mb-12">
                  <FlashSalesSlider />
                </section>

                <section className="mb-12">
                  <CategorySlider />
                </section>

                <section className="mb-12">
                  <ExploreProducts />
                </section>
              </main>
            } />
          </Routes>
          
          <Footer />
        </div>
      </ShopProvider>
    </Router>
  );
}

export default App;