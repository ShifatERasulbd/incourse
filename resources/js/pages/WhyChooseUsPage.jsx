import React from 'react';
import { useWhyChooseUs } from '../hooks/useFrontendData';
import WhyChooseUs from '../components/WhyChooseUs';

const WhyChooseUsPage = () => {
  const { data: whyChooseUsItems, loading, error } = useWhyChooseUs();

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
        Loading Why Choose Us content...
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
        Error loading content: {error}
      </div>
    );
  }

  return (
    <div className="why-choose-us-page">
      {/* Hero Section */}
      <section style={{
        backgroundColor: '#c41c13',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem'
          }}>
            Why Choose Us
          </h1>
          <p style={{
            fontSize: '1.3rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Discover the advantages that make us your ideal partner for power solutions
          </p>
        </div>
      </section>

      {/* Why Choose Us Content */}
      <WhyChooseUs 
        items={whyChooseUsItems} 
        showTitle={false} 
      />

      {/* Additional Info Section */}
      <section style={{
        padding: '4rem 0',
        backgroundColor: '#333',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem'
        }}>
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '2rem'
          }}>
            Ready to Experience the Difference?
          </h2>
          <p style={{
            fontSize: '1.2rem',
            marginBottom: '2rem',
            opacity: 0.9
          }}>
            Join thousands of satisfied customers who trust us for their power needs.
          </p>
          <button style={{
            backgroundColor: '#c41c13',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Debug Info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <section style={{
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderTop: '1px solid #ddd'
        }}>
          <div className="container" style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h3>Debug Info:</h3>
            <p>Items loaded: {whyChooseUsItems?.length || 0}</p>
            <details>
              <summary>Raw Data</summary>
              <pre style={{
                backgroundColor: '#fff',
                padding: '1rem',
                borderRadius: '5px',
                overflow: 'auto',
                fontSize: '0.9rem'
              }}>
                {JSON.stringify(whyChooseUsItems, null, 2)}
              </pre>
            </details>
          </div>
        </section>
      )}
    </div>
  );
};

export default WhyChooseUsPage;
