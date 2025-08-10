import BlogSection from './BlogSection';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuBar from './MenuBar';
import Slider from './Slider';
import AboutUs from './AboutUs';
import CounterSection from './CounterSection';
import ProductAutoSlider from './ProductAutoSlider';
import Newsletter from './Newsletter';
import Footer from './Footer';
import ProductPage from './ProductPage';

function App() {
    return (
        <BrowserRouter>
            <MenuBar />
            <Routes>
                {/* Homepage */}
                <Route path="/" element={
                    <>
                        <Slider />
                        <AboutUs />
                        <CounterSection />
                        {/* Keep ProductAutoSlider only on homepage */}
                        <ProductAutoSlider />
                        <BlogSection />
                    </>
                } />

                {/* About Page */}
                <Route path="/about" element={<AboutUs />} />

                {/* Products Page (only full listing here) */}
                <Route path="/products" element={<ProductPage />} />

                {/* Blog Page */}
                <Route path="/blog" element={<BlogSection />} />

                {/* Newsletter Page */}
                <Route path="/newsletter" element={<Newsletter />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<App />);
