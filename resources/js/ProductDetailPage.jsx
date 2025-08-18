
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line
  }, [id]);

  const fetchProductDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${id}`);
      const result = await response.json();
      if (result.success) {
        setProduct(result.data);
      } else {
        setError(result.message || 'Product not found');
      }
    } catch (error) {
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="product-detail-loading">Loading product details...</div>;
  if (error) return (
    <div className="product-detail-error">
      <h2>Product Not Found</h2>
      <p>{error}</p>
      <button onClick={() => navigate('/products')}>Back to Products</button>
    </div>
  );
  if (!product) return null;

  return (
    <div className="product-detail-main">
      <div className="product-detail-grid">
        {/* Left: Product Image */}
        <div className="product-detail-image">
          <img
            src={`/${product.image_path}`}
            alt={product.name}
            onError={e => { e.target.src = '/Frontend/slider/slider1.jpg'; }}
          />
          {product.category && (
            <span className="product-detail-category">{product.category.name}</span>
          )}
        </div>
        {/* Right: Product Details */}
        <div className="product-detail-info">
          <h1>{product.name}</h1>
            {/* Description and Specs */}
      <div className="product-detail-extra">
      
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <>
          
         
          </>
        )}
      </div>
          
          <div className="product-detail-actions">
            <button onClick={() => navigate('/products')} className="secondary">
              Back to Products
            </button>
          </div>
          {product.features && product.features.length > 0 && (
            <ul className="product-detail-features">
              {product.features.map((f, i) => <li key={i}>✓ {f}</li>)}
            </ul>
          )}
        </div>
      </div>
    
      <style>{`
        .product-detail-main {
          max-width: 1100px;
          margin: 2rem auto;
          padding: 2rem 1rem;
          font-family: Arial, sans-serif;
        }
        .product-detail-grid {
          display: flex;
          gap: 2.5rem;
          margin-bottom: 2.5rem;
          flex-wrap: wrap;
        }
        .product-detail-image {
          flex: 1 1 350px;
          max-width: 420px;
          position: relative;
        }
        .product-detail-image img {
          width: 100%;
          height: 400px;
          object-fit: cover;
          border-radius: 12px;
          border: 1px solid #eee;
        }
        .product-detail-category {
          position: absolute;
          left: 1rem;
          bottom: 1rem;
          background: #c41c13;
          color: #fff;
          padding: 0.4rem 1.2rem;
          border-radius: 20px;
          font-size: 1rem;
        }
        .product-detail-info {
          flex: 2 1 400px;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .product-detail-info h1 {
          font-size: 2.2rem;
          color: #272863;
          margin-bottom: 0.5rem;
        }
        .product-detail-sku {
          color: #888;
          font-size: 0.95rem;
        }
        .product-detail-price {
          font-size: 2rem;
          color: #c41c13;
          font-weight: bold;
        }
        .product-detail-stock .in-stock {
          color: #28a745;
          font-weight: bold;
        }
        .product-detail-stock .out-stock {
          color: #dc3545;
          font-weight: bold;
        }
        .product-detail-short {
          font-size: 1.1rem;
          color: #555;
        }
        .product-detail-actions {
          display: flex;
          gap: 1rem;
          margin: 1.5rem 0;
        }
        .product-detail-actions button {
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          border: none;
          border-radius: 5px;
          background: #c41c13;
          color: #fff;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }
        .product-detail-actions button.secondary {
          background: #fff;
          color: #c41c13;
          border: 2px solid #c41c13;
        }
        .product-detail-actions button:disabled {
          background: #ccc;
          color: #fff;
          cursor: not-allowed;
        }
        .product-detail-features {
          margin-top: 1.5rem;
          padding-left: 1.2rem;
        }
        .product-detail-features li {
          margin-bottom: 0.5rem;
          color: #272863;
        }
        .product-detail-extra {
          background: #f8f9fa;
          border-radius: 8px;
          padding: 2rem;
        }
        @media (max-width: 900px) {
          .product-detail-grid {
            flex-direction: column;
            gap: 2rem;
          }
          .product-detail-image img {
            height: 300px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
