import React from 'react';
import { useHomepageData } from '../hooks/useFrontendData';
import { useFrontendDataContext } from '../contexts/FrontendDataContext';
import Slider from '../Slider';
import ProductSection from './ProductSection';
import BlogSection from '../BlogSection';
import AboutSection from './AboutSection';
import WhyChooseUs from './WhyChooseUs';

const HomePage = () => {
  // Option 1: Using the hook (simpler for single component)
  const { data: homepageData, loading, error } = useHomepageData();

  // Option 2: Using the context (better for app-wide state management)
  // const { data, loading, error, isDataLoaded } = useFrontendDataContext();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading homepage content...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '50vh',
        fontSize: '1.2rem',
        color: '#c41c13'
      }}>
        Error loading homepage: {error}
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Slider Section */}
      {homepageData?.sliders && homepageData.sliders.length > 0 && (
        <section className="hero-section">
          <Slider slides={homepageData.sliders} />
        </section>
      )}

      {/* About Us Section */}
      {homepageData?.aboutUs && (
        <section className="about-section">
          <AboutSection content={homepageData.aboutUs} />
        </section>
      )}

      {/* Why Choose Us Section */}
      {homepageData?.whyChooseUs && homepageData.whyChooseUs.length > 0 && (
        <section className="why-choose-us-section">
          <WhyChooseUs items={homepageData.whyChooseUs} />
        </section>
      )}

      {/* Featured Products Section */}
      {homepageData?.featuredProducts && homepageData.featuredProducts.length > 0 && (
        <section className="featured-products-section">
          <div className="container">
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: '2rem',
              fontSize: '2.5rem',
              color: '#333'
            }}>
              Featured Products
            </h2>
            <ProductSection products={homepageData.featuredProducts} />
          </div>
        </section>
      )}

      {/* Featured Blogs Section */}
      {homepageData?.featuredBlogs && homepageData.featuredBlogs.length > 0 && (
        <section className="featured-blogs-section">
          <div className="container">
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: '2rem',
              fontSize: '2.5rem',
              color: '#333'
            }}>
              Latest News & Articles
            </h2>
            <BlogSection blogs={homepageData.featuredBlogs} />
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="cta-section" style={{
        backgroundColor: '#c41c13',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Power Your Business?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
            Contact us today for customized power solutions that meet your specific needs.
          </p>
          <button style={{
            backgroundColor: 'white',
            color: '#c41c13',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
