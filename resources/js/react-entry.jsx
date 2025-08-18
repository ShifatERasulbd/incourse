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
import WhyChooseUsPage from './pages/WhyChooseUsPage';
import WhyChooseUsTest from './components/WhyChooseUsTest';
import WhyChooseUsDemo from './components/WhyChooseUsDemo';
import WhyChooseUs from './WhyChooseUs';
import TestWhyChooseUs from './TestWhyChooseUs';
import TestCounterSection from './TestCounterSection';
import CounterShowcase from './CounterShowcase';
import CounterSystemDocumentation from './CounterSystemDocumentation';
import DynamicWhyChooseUsExample from './DynamicWhyChooseUsExample';
import BlogDetailPage from './BlogDetailPage';
import ProductDetailPage from './ProductDetailPage';
import TestBlogSystem from './TestBlogSystem';

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
                        <WhyChooseUs />
                        <CounterSection />
                        <ProductAutoSlider />
                        <BlogSection />
                    </>
                } />

                {/* About Page */}
                <Route path="/about" element={<AboutPage />} />

                {/* Products Page */}
                <Route path="/products" element={<ProductPage />} />
                {/* Product Detail Page */}
                <Route path="/products/:id" element={<ProductDetailPage />} />

                {/* Blog Page */}
                <Route path="/news" element={<BlogPage />} /> {/* <-- Fix here */}
                {/* Blog Detail Page */}
                <Route path="/blog/:id" element={<BlogDetailPage />} />

                {/* Newsletter Page */}
                <Route path="/newsletter" element={<Newsletter />} />
                {/* Contact Page */}
                <Route path="/Contact-Us" element={<ContactPage />} />
                {/* Why Choose Us Page */}
                <Route path="/why-choose-us" element={<WhyChooseUsPage />} />
                {/* Why Choose Us Test Page */}
                <Route path="/test-why-choose-us" element={<WhyChooseUsTest />} />
                {/* Why Choose Us Demo Page */}
                <Route path="/demo-why-choose-us" element={<WhyChooseUsDemo />} />
                {/* Test Dynamic WhyChooseUs Component */}
                <Route path="/test-dynamic-why-choose-us" element={<TestWhyChooseUs />} />
                {/* Test Dynamic CounterSection Component */}
                <Route path="/test-counter-section" element={<TestCounterSection />} />
                {/* Counter Components Showcase */}
                <Route path="/counter-showcase" element={<CounterShowcase />} />
                {/* Counter System Documentation */}
                <Route path="/counter-docs" element={<CounterSystemDocumentation />} />
                {/* Dynamic WhyChooseUs Example */}
                <Route path="/dynamic-why-choose-us-example" element={<DynamicWhyChooseUsExample />} />
                {/* Test Blog System */}
                <Route path="/test-blog-system" element={<TestBlogSystem />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

const root = createRoot(document.getElementById('react-root'));
root.render(<App />);
