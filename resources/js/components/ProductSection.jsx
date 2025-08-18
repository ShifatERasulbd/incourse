import React from 'react';

const ProductSection = ({ products = [] }) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="products-grid" style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      padding: '2rem 0'
    }}>
      {products.map((product) => (
        <div key={product.id} className="product-card" style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          cursor: 'pointer'
        }}>
          <div className="product-image" style={{
            width: '100%',
            height: '200px',
            overflow: 'hidden'
          }}>
            <img
              src={product.image_path ? `/${product.image_path}` : '/Frontend/slider/slider1.jpg'}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
              onError={(e) => {
                e.target.src = '/Frontend/slider/slider1.jpg';
              }}
            />
          </div>
          
          <div className="product-content" style={{
            padding: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '0.5rem'
            }}>
              {product.name}
            </h3>
            
            {product.category && (
              <div style={{
                fontSize: '0.9rem',
                color: '#c41c13',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                {product.category.name}
              </div>
            )}
            
            <p style={{
              fontSize: '0.95rem',
              color: '#666',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              {product.short_description || product.description}
            </p>
            
            {product.price && (
              <div style={{
                fontSize: '1.2rem',
                fontWeight: 'bold',
                color: '#c41c13',
                marginBottom: '1rem'
              }}>
                ${product.price}
              </div>
            )}
            
            <button style={{
              backgroundColor: '#c41c13',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease',
              width: '100%'
            }}>
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductSection;
