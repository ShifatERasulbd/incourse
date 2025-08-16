import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductDetails();
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
      console.error('Error fetching product details:', error);
      setError('Failed to load product details');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock_quantity || 1)) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Loading product details...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#c41c13', marginBottom: '1rem' }}>Product Not Found</h2>
        <p>{error}</p>
        <button 
          onClick={() => navigate('/products')}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#c41c13',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Back to Products
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        fontSize: '1.2rem',
        color: '#666'
      }}>
        Product not available.
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '2rem',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Breadcrumb */}
      <nav style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#666' }}>
        <span 
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', color: '#c41c13' }}
        >
          Home
        </span>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span 
          onClick={() => navigate('/products')}
          style={{ cursor: 'pointer', color: '#c41c13' }}
        >
          Products
        </span>
        <span style={{ margin: '0 0.5rem' }}>/</span>
        <span>{product.name}</span>
      </nav>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '3rem',
        marginBottom: '3rem'
      }}>
        {/* Product Images */}
        <div>
          <div style={{ 
            marginBottom: '1rem',
            border: '1px solid #ddd',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <img
              src={`/${product.image_path}`}
              alt={product.name}
              style={{ 
                width: '100%', 
                height: '400px', 
                objectFit: 'cover',
                display: 'block'
              }}
              onError={(e) => {
                e.target.src = '/Frontend/slider/slider1.jpg'; // fallback image
              }}
            />
          </div>
          
          {/* Category Badge */}
          {product.category && (
            <div style={{ 
              display: 'inline-block',
              backgroundColor: '#c41c13',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              {product.category.name}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: '#272863',
            lineHeight: '1.2'
          }}>
            {product.name}
          </h1>

          {product.sku && (
            <p style={{ 
              color: '#666', 
              marginBottom: '1rem',
              fontSize: '0.9rem'
            }}>
              SKU: {product.sku}
            </p>
          )}

          {product.price && (
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#c41c13',
              marginBottom: '1.5rem'
            }}>
              {formatPrice(product.price)}
            </div>
          )}

          {product.short_description && (
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.6',
              color: '#555',
              marginBottom: '2rem'
            }}>
              {product.short_description}
            </p>
          )}

          {/* Stock Status */}
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              color: product.stock_quantity > 0 ? '#28a745' : '#dc3545',
              fontWeight: 'bold'
            }}>
              {product.stock_quantity > 0 
                ? `In Stock (${product.stock_quantity} available)` 
                : 'Out of Stock'
              }
            </span>
          </div>

          {/* Quantity Selector */}
          {product.stock_quantity > 0 && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              marginBottom: '2rem'
            }}>
              <span style={{ fontWeight: 'bold' }}>Quantity:</span>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: quantity > 1 ? 'pointer' : 'not-allowed',
                    fontSize: '1.2rem'
                  }}
                >
                  -
                </button>
                <span style={{ 
                  padding: '0.5rem 1rem',
                  borderLeft: '1px solid #ddd',
                  borderRight: '1px solid #ddd',
                  minWidth: '60px',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock_quantity}
                  style={{
                    padding: '0.5rem 0.75rem',
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: quantity < product.stock_quantity ? 'pointer' : 'not-allowed',
                    fontSize: '1.2rem'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            <button
              disabled={product.stock_quantity === 0}
              style={{
                flex: 1,
                padding: '1rem 2rem',
                backgroundColor: product.stock_quantity > 0 ? '#c41c13' : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: product.stock_quantity > 0 ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.3s'
              }}
              onMouseEnter={(e) => {
                if (product.stock_quantity > 0) {
                  e.target.style.backgroundColor = '#a01610';
                }
              }}
              onMouseLeave={(e) => {
                if (product.stock_quantity > 0) {
                  e.target.style.backgroundColor = '#c41c13';
                }
              }}
            >
              {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
            
            <button
              onClick={() => navigate('/products')}
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: '#c41c13',
                border: '2px solid #c41c13',
                borderRadius: '5px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#c41c13';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#c41c13';
              }}
            >
              Back to Products
            </button>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ 
                color: '#272863', 
                marginBottom: '1rem',
                fontSize: '1.3rem'
              }}>
                Key Features
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                margin: 0
              }}>
                {product.features.map((feature, index) => (
                  <li key={index} style={{ 
                    padding: '0.5rem 0',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <span style={{ 
                      color: '#c41c13', 
                      marginRight: '0.5rem',
                      fontSize: '1.2rem'
                    }}>
                      ✓
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Product Description */}
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        borderRadius: '8px',
        marginBottom: '3rem'
      }}>
        <h2 style={{
          color: '#272863',
          marginBottom: '1.5rem',
          fontSize: '2rem'
        }}>
          Product Description
        </h2>
        <div
          style={{
            lineHeight: '1.8',
            fontSize: '1rem',
            color: '#555'
          }}
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>

      {/* Specifications */}
      {product.specifications && Object.keys(product.specifications).length > 0 && (
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '2rem',
          marginBottom: '3rem'
        }}>
          <h2 style={{
            color: '#272863',
            marginBottom: '1.5rem',
            fontSize: '2rem'
          }}>
            Specifications
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
          }}>
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div key={index} style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '0.75rem',
                backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white',
                borderRadius: '5px'
              }}>
                <span style={{ fontWeight: 'bold', color: '#272863' }}>
                  {key}:
                </span>
                <span style={{ color: '#555' }}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products Section Placeholder */}
      <div style={{
        textAlign: 'center',
        padding: '3rem 0',
        borderTop: '1px solid #ddd'
      }}>
        <h2 style={{
          color: '#272863',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          Related Products
        </h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Discover more products in the {product.category?.name} category
        </p>
        <button
          onClick={() => navigate('/products')}
          style={{
            padding: '1rem 2rem',
            backgroundColor: '#c41c13',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#a01610';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#c41c13';
          }}
        >
          View All Products
        </button>
      </div>

      {/* Mobile Responsive Styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .product-detail-container {
            padding: 1rem !important;
          }
          .product-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .product-title {
            font-size: 2rem !important;
          }
          .product-price {
            font-size: 1.5rem !important;
          }
          .action-buttons {
            flex-direction: column !important;
          }
          .specifications-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
