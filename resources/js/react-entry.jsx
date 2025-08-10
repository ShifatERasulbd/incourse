import BlogSection from './BlogSection';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuBar from './MenuBar';
import Slider from './Slider';
import AboutUs from './AboutUs';
import BlogPage from './BlogPage'; // <-- Fix the import name
import AboutPage from './AboutPage';
import CounterSection from './CounterSection';
import ProductAutoSlider from './ProductAutoSlider';
import Newsletter from './Newsletter';
import Footer from './Footer';
import ProductPage from './ProductPage';
import ContactPage from './ContactPage'; // Import the ContactPage component

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
                        <ProductAutoSlider />
                        <BlogSection />
                    </>
                } />

                {/* About Page */}
                <Route path="/about" element={<AboutPage />} />

                {/* Products Page */}
                <Route path="/products" element={<ProductPage />} />

                {/* Blog Page */}
                <Route path="/news" element={<BlogPage />} /> {/* <-- Fix here */}

                {/* Newsletter Page */}
                <Route path="/newsletter" element={<Newsletter />} />
                {/* Contact Page */}
                <Route path="/Contact-Us" element={<ContactPage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<App />);
