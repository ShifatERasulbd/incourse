import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const products = [
  { image: '/Frontend/slider/slider1.jpg', name: 'Power Generator', desc: 'High-efficiency generator for industrial use.', category: 'Generators' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Solar Panel', desc: 'Eco-friendly solar panel for homes and businesses.', category: 'Solar' },
  { image: '/Frontend/slider/slider3.jpg', name: 'UPS System', desc: 'Reliable UPS for uninterrupted power supply.', category: 'UPS' },
  { image: '/Frontend/slider/slider1.jpg', name: 'Battery Pack', desc: 'Long-lasting battery pack for backup.', category: 'Batteries' },
  { image: '/Frontend/slider/slider2.jpg', name: 'Smart Inverter', desc: 'Efficient inverter for smart energy management.', category: 'Inverters' },
];

const categories = ['Generators', 'Solar', 'UPS', 'Batteries', 'Inverters'];

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ProductPage() {
  const query = useQuery();
  const navigate = useNavigate();

  const categoryFromQuery = query.get('category') || '';
  const [selectedCategory, setSelectedCategory] = useState(categoryFromQuery);

  useEffect(() => {
    setSelectedCategory(categoryFromQuery);
  }, [categoryFromQuery]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  // Handler to change category by updating URL query
  const handleFilterChange = (category) => {
    if (category === '') {
      navigate('/products');
    } else {
      navigate(`/products?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div
      style={{
        padding: '3rem 0',
        background: '#f8fafc',
        minHeight: '60vh',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          fontWeight: 'bold',
          color: '#272863',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Our Products
      </h2>

      <div
        className="layout"
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          flexWrap: 'wrap',
        }}
      >
        {/* Filter Section */}
        <div
          className="filter-area"
          style={{
            background: '#fff',
            padding: '1rem',
            borderRadius: '12px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
            width: '250px',
            flexShrink: 0,
          }}
        >
          <h3 style={{ marginBottom: '1rem', color: '#272863' }}>
            Filter by Category
          </h3>
          {categories.map((cat) => (
            <div key={cat} style={{ marginBottom: '0.5rem' }}>
              <label
                style={{
                  cursor: 'pointer',
                  fontSize: '0.95rem',
                  color: selectedCategory === cat ? '#272863' : '#333',
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                  userSelect: 'none',
                }}
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => handleFilterChange(cat)}
                  style={{ marginRight: '0.5rem' }}
                />
                {cat}
              </label>
            </div>
          ))}
          {selectedCategory && (
            <button
              onClick={() => handleFilterChange('')}
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                border: 'none',
                background: '#272863',
                color: '#fff',
                borderRadius: '6px',
                cursor: 'pointer',
              }}
            >
              Clear Filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            justifyContent: 'flex-start',
            flex: 1,
          }}
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, idx) => (
              <div
                key={idx}
                className="product-card"
                style={{
                  background: '#fff',
                  borderRadius: '18px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  overflow: 'hidden',
                  minWidth: '160px',
                  maxWidth: '180px',
                  flex: '1 1 160px',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '240px',
                    objectFit: 'cover',
                    borderRadius: 0,
                    display: 'block',
                  }}
                />
                <div style={{ padding: '1rem' }}>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      color: '#272863',
                      margin: '0.5rem 0',
                    }}
                  >
                    {product.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.95rem',
                      color: '#444',
                      margin: 0,
                    }}
                  >
                    {product.desc}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p style={{ color: '#666' }}>No products found in this category.</p>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .layout {
            flex-direction: column;
          }
          .filter-area {
            width: 100%;
            margin-bottom: 1rem;
          }
          .product-card {
            flex: 1 1 calc(50% - 1rem);
            max-width: calc(50% - 1rem);
          }
        }
      `}</style>
    </div>
  );
}
