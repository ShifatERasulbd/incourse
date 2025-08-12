import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FrontendDataProvider } from '../contexts/FrontendDataContext';
import HomePage from './HomePage';
import ProductPage from '../ProductPage';
import BlogSection from '../BlogSection';
import AboutUs from '../AboutUs';
import Navbar from '../Navbar';
import Footer from '../Footer';

// Example of how to wrap your app with the FrontendDataProvider
const AppWithFrontendData = () => {
  return (
    <FrontendDataProvider>
      <Router>
        <div className="app">
          <Navbar />
          
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/blogs" element={<BlogSection />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </FrontendDataProvider>
  );
};

// Example component showing how to use the frontend data context
const ExampleComponent = () => {
  const { 
    data, 
    loading, 
    error, 
    refreshData, 
    search, 
    getFilteredProducts,
    isDataLoaded,
    hasSliders,
    hasProducts 
  } = useFrontendDataContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Frontend Data Example</h1>
      
      {/* Display sliders */}
      {hasSliders && (
        <section>
          <h2>Sliders ({data.sliders.length})</h2>
          {data.sliders.map(slider => (
            <div key={slider.id}>
              <h3>{slider.title}</h3>
              <p>{slider.description}</p>
            </div>
          ))}
        </section>
      )}
      
      {/* Display products */}
      {hasProducts && (
        <section>
          <h2>Products ({data.products.length})</h2>
          {data.products.slice(0, 3).map(product => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.short_description}</p>
              <p>Category: {product.category?.name}</p>
              {product.price && <p>Price: ${product.price}</p>}
            </div>
          ))}
        </section>
      )}
      
      {/* Display featured products */}
      <section>
        <h2>Featured Products ({data.featuredProducts.length})</h2>
        {data.featuredProducts.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.short_description}</p>
          </div>
        ))}
      </section>
      
      {/* Display blogs */}
      <section>
        <h2>Latest Blogs ({data.blogs.length})</h2>
        {data.blogs.slice(0, 3).map(blog => (
          <div key={blog.id}>
            <h3>{blog.title}</h3>
            <p>{blog.excerpt}</p>
            <p>Published: {blog.published_date}</p>
          </div>
        ))}
      </section>
      
      {/* About Us */}
      {data.aboutUs && (
        <section>
          <h2>{data.aboutUs.section_title}</h2>
          <p>{data.aboutUs.main_text}</p>
        </section>
      )}
      
      {/* Action buttons */}
      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => refreshData('products')}>
          Refresh Products
        </button>
        <button onClick={() => refreshData('blogs')}>
          Refresh Blogs
        </button>
      </div>
    </div>
  );
};

export default AppWithFrontendData;
export { ExampleComponent };
