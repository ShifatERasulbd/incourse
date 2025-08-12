import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        setLoading(true);
        console.log('Fetching blog details for ID:', id);
        
        // Fetch blog details
        const response = await axios.get(`/api/blogs/${id}`);
        console.log('Blog details response:', response.data);
        
        if (response.data.success) {
          setBlog(response.data.data);
          
          // Fetch related blogs (other published blogs)
          try {
            const relatedResponse = await axios.get('/api/frontend/blogs');
            if (relatedResponse.data.success) {
              // Filter out current blog and limit to 3 related blogs
              const related = relatedResponse.data.data
                .filter(b => b.id !== parseInt(id))
                .slice(0, 3);
              setRelatedBlogs(related);
            }
          } catch (relatedError) {
            console.warn('Failed to fetch related blogs:', relatedError);
          }
        } else {
          setError('Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog details:', err);
        setError('Failed to load blog details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleRelatedBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const handleBackToBlogs = () => {
    navigate('/blogs');
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#666'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #c41c13',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p>Loading blog details...</p>
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          color: '#666'
        }}>
          <h2 style={{ color: '#c41c13', marginBottom: '1rem' }}>
            {error || 'Blog not found'}
          </h2>
          <p style={{ marginBottom: '2rem' }}>
            The blog you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={handleBackToBlogs}
            style={{
              backgroundColor: '#c41c13',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Breadcrumb */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        marginBottom: '2rem'
      }}>
        <nav style={{
          fontSize: '0.9rem',
          color: '#666'
        }}>
          <span 
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer', color: '#c41c13' }}
          >
            Home
          </span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span 
            onClick={handleBackToBlogs}
            style={{ cursor: 'pointer', color: '#c41c13' }}
          >
            Blogs
          </span>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span>{blog.title}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div
        className="blog-detail-container"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '3rem'
        }}
      >
        {/* Blog Content */}
        <article>
          {/* Featured Image */}
          {(blog.featured_image || blog.image_path) && (
            <div style={{
              marginBottom: '2rem',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <img
                src={(blog.featured_image || blog.image_path).startsWith('http') ? (blog.featured_image || blog.image_path) : `/${blog.featured_image || blog.image_path}`}
                alt={blog.title}
                style={{
                  width: '100%',
                  height: '400px',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  console.error('Failed to load blog image:', blog.featured_image || blog.image_path);
                  e.target.style.display = 'none';
                  // Show a placeholder or fallback
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.style.cssText = `
                    width: 100%;
                    height: 400px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #666;
                    font-size: 1.2rem;
                    border-radius: 12px;
                  `;
                  fallbackDiv.innerHTML = '📷 Image not available';
                  e.target.parentNode.replaceChild(fallbackDiv, e.target);
                }}
                onLoad={() => {
                  console.log('✅ Blog image loaded successfully:', blog.featured_image || blog.image_path);
                }}
              />
            </div>
          )}



          {/* Blog Header */}
          <header style={{ marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {blog.title}
            </h1>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              color: '#666',
              fontSize: '0.9rem',
              marginBottom: '1rem'
            }}>
              <span>
                <strong>Published:</strong> {formatDate(blog.published_date || blog.created_at)}
              </span>
              {blog.author && (
                <span>
                  <strong>By:</strong> {blog.author}
                </span>
              )}
              {blog.is_featured && (
                <span style={{
                  backgroundColor: '#c41c13',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem'
                }}>
                  Featured
                </span>
              )}
            </div>

            {blog.excerpt && (
              <p style={{
                fontSize: '1.1rem',
                color: '#666',
                fontStyle: 'italic',
                lineHeight: '1.6',
                borderLeft: '4px solid #c41c13',
                paddingLeft: '1rem',
                margin: '1rem 0'
              }}>
                {blog.excerpt}
              </p>
            )}
          </header>

          {/* Blog Content */}
          <div style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: '#333'
          }}>
            {blog.content ? (
              <div 
                dangerouslySetInnerHTML={{ __html: blog.content }}
                style={{
                  '& p': { marginBottom: '1.5rem' },
                  '& h2': { fontSize: '1.8rem', marginTop: '2rem', marginBottom: '1rem', color: '#333' },
                  '& h3': { fontSize: '1.5rem', marginTop: '1.5rem', marginBottom: '0.75rem', color: '#333' },
                  '& ul, & ol': { marginBottom: '1.5rem', paddingLeft: '2rem' },
                  '& li': { marginBottom: '0.5rem' },
                  '& blockquote': { 
                    borderLeft: '4px solid #c41c13', 
                    paddingLeft: '1rem', 
                    fontStyle: 'italic',
                    margin: '1.5rem 0',
                    color: '#666'
                  }
                }}
              />
            ) : (
              <p>No content available for this blog post.</p>
            )}
          </div>

          {/* Back Button */}
          <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #eee' }}>
            <button
              onClick={handleBackToBlogs}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              ← Back to All Blogs
            </button>
          </div>
        </article>

        {/* Sidebar */}
        <aside>
          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div style={{
              backgroundColor: '#f8f9fa',
              padding: '1.5rem',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <h3 style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#333'
              }}>
                Related Blogs
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {relatedBlogs.map((relatedBlog) => (
                  <div
                    key={relatedBlog.id}
                    onClick={() => handleRelatedBlogClick(relatedBlog.id)}
                    style={{
                      cursor: 'pointer',
                      padding: '1rem',
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {(relatedBlog.featured_image || relatedBlog.image_path) && (
                      <img
                        src={`/${relatedBlog.featured_image || relatedBlog.image_path}`}
                        alt={relatedBlog.title}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          marginBottom: '0.75rem'
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#333',
                      lineHeight: '1.3'
                    }}>
                      {relatedBlog.title}
                    </h4>
                    <p style={{
                      fontSize: '0.85rem',
                      color: '#666',
                      marginBottom: '0.5rem'
                    }}>
                      {formatDate(relatedBlog.published_date || relatedBlog.created_at)}
                    </p>
                    {relatedBlog.excerpt && (
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#666',
                        lineHeight: '1.4'
                      }}>
                        {relatedBlog.excerpt.substring(0, 100)}...
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blog Info */}
          <div style={{
            backgroundColor: '#f8f9fa',
            padding: '1.5rem',
            borderRadius: '12px'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: 'bold',
              marginBottom: '1rem',
              color: '#333'
            }}>
              Blog Information
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <strong>Published:</strong><br />
                <span style={{ color: '#666' }}>
                  {formatDate(blog.published_date || blog.created_at)}
                </span>
              </div>
              
              {blog.author && (
                <div>
                  <strong>Author:</strong><br />
                  <span style={{ color: '#666' }}>{blog.author}</span>
                </div>
              )}
              
              <div>
                <strong>Status:</strong><br />
                <span style={{ 
                  color: blog.is_published ? '#28a745' : '#dc3545',
                  fontWeight: '500'
                }}>
                  {blog.is_published ? 'Published' : 'Draft'}
                </span>
              </div>
              
              {blog.is_featured && (
                <div>
                  <span style={{
                    backgroundColor: '#c41c13',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    ⭐ Featured Blog
                  </span>
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Mobile Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            .blog-detail-container {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default BlogDetailPage;
