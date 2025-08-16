
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ProductAutoSlider() { 

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const scrollSpeed = 0.5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/frontend/products');
        // The API returns paginated data: { success: true, data: { data: [products], ...pagination } }
        if (response.data.success && Array.isArray(response.data.data.data)) {
          setProducts(response.data.data.data);
        } else {
          setError('API returned invalid products data');
        }
      } catch (error) {
        setError('Failed to fetch products');
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationFrameId;

    const scrollStep = () => {
      if (!isDragging.current) {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
          slider.scrollLeft = 0;
        } else {
          slider.scrollLeft += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const onMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = 'grabbing';
  };

  const onMouseLeave = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const onMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onTouchStart = (e) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const onTouchEnd = () => {
    isDragging.current = false;
  };

  const onTouchMove = (e) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .product-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          text-align: center;
          min-width: 18%;
          max-width: 18%;
          flex: 0 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          transition: min-width 0.3s ease;
          padding: 1rem;
          box-sizing: border-box;
        }
        .product-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          border-radius: 10px 10px 0 0;
          margin: 0;
          padding: 0;
          display: block;
        }
        .view-details-btn {
          margin-top: auto;
          background-color: #1C1E5C;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 0.6rem 1.5rem;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.3s ease;
          display: inline-block;
          margin: 1rem auto 0 auto;
        }
        .view-details-btn:hover {
          background-color: #151742;
        }
        @media (max-width: 600px) {
          .product-card {
            min-width: 45% !important;
            max-width: 45% !important;
            padding: 0.75rem;
          }
          .product-card img {
            height: 320px;
          }
        }
      `}</style>

      <div
        style={{
          background: '#1F1F66',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 0',
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#fff', marginBottom: '2rem' }}>
          Our Products
        </h2>

        <div
          ref={sliderRef}
          className="hide-scrollbar"
          style={{
            width: '100%',
            maxWidth: '1200px',
            display: 'flex',
            gap: '0.6rem',
            overflowX: 'auto',
            scrollBehavior: 'smooth',
            cursor: 'grab',
            paddingBottom: '1rem',
            userSelect: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseLeave}
          onMouseUp={onMouseUp}
          onMouseMove={onMouseMove}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onTouchMove={onTouchMove}
        >
          {loading && <div style={{ color: '#fff', padding: '2rem' }}>Loading products...</div>}
          {error && <div style={{ color: 'red', padding: '2rem' }}>{error}</div>}
          {!loading && !error && products.length === 0 && (
            <div style={{ color: '#fff', padding: '2rem' }}>No products found.</div>
          )}
          {!loading && !error && products.map((product, idx) => (
            <div key={idx} className="product-card">
              <img
                src={product.image_path}
                alt={product.name}
              />
              <h3 style={{ fontSize: '1.1rem', color: '#272863', margin: '0.5rem 0' }}>{product.name}</h3>
              <p style={{ fontSize: '0.95rem', color: '#444', margin: '0 0 1rem 0' }}>{product.short_description || product.description}</p>
              <button
                className="view-details-btn"
                onClick={() => alert(`Viewing details for ${product.name}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
  