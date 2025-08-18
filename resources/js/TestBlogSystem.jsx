import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestBlogSystem = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2c3e50', borderBottom: '3px solid #c41c13', paddingBottom: '1rem' }}>
        🗞️ Dynamic Blog System Test
      </h1>

      {/* Overview */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>🎯 System Overview</h2>
        <p>
          A complete blog management system with dynamic content fetching, detailed blog pages, 
          and seamless navigation. Perfect for showcasing articles, news, and company updates.
        </p>
      </section>

      {/* Features */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>✨ Key Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#c41c13' }}>📝 Blog Management</h3>
            <ul>
              <li>Complete CRUD operations</li>
              <li>Featured image support</li>
              <li>Rich text content</li>
              <li>Published/Draft status</li>
              <li>Featured blog highlighting</li>
            </ul>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#c41c13' }}>🎨 Dynamic Display</h3>
            <ul>
              <li>Responsive blog grid</li>
              <li>Clickable blog cards</li>
              <li>Hover effects</li>
              <li>Automatic image fallbacks</li>
              <li>Mobile-optimized layout</li>
            </ul>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#c41c13' }}>📖 Detail Pages</h3>
            <ul>
              <li>Full blog content display</li>
              <li>Related blogs sidebar</li>
              <li>Breadcrumb navigation</li>
              <li>Social sharing ready</li>
              <li>SEO-friendly URLs</li>
            </ul>
          </div>
          
          <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ color: '#c41c13' }}>🔗 Navigation</h3>
            <ul>
              <li>React Router integration</li>
              <li>Dynamic URL routing</li>
              <li>Back navigation</li>
              <li>404 error handling</li>
              <li>Loading states</li>
            </ul>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>🔗 API Endpoints</h2>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ color: '#c41c13' }}>Public Endpoints</h3>
          <div style={{ background: '#e8f5e8', padding: '1rem', borderRadius: '5px' }}>
            <ul style={{ margin: 0 }}>
              <li><code>GET /api/frontend/blogs</code> - Get published blogs</li>
              <li><code>GET /api/blogs/{id}</code> - Get single blog details</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c41c13' }}>Admin Endpoints (Protected)</h3>
          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '5px' }}>
            <ul style={{ margin: 0 }}>
              <li><code>GET /api/admin/blogs</code> - List all blogs</li>
              <li><code>POST /api/admin/blogs</code> - Create blog</li>
              <li><code>PUT /api/admin/blogs/{id}</code> - Update blog</li>
              <li><code>DELETE /api/admin/blogs/{id}</code> - Delete blog</li>
            </ul>
          </div>
        </div>
      </section>

      {/* URL Structure */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>🌐 URL Structure</h2>
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px' }}>
          <ul>
            <li><strong>/news</strong> - Blog listing page</li>
            <li><strong>/blog/{id}</strong> - Individual blog detail page</li>
            <li><strong>/admin/blogs</strong> - Admin blog management</li>
          </ul>
        </div>
      </section>

      {/* Testing URLs */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>🧪 Test the Blog System</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
          <div style={{ background: '#e3f2fd', padding: '1rem', borderRadius: '5px' }}>
            <h4>Blog Listing Page</h4>
            <p>View all published blogs in a responsive grid layout</p>
            <button
              onClick={() => navigate('/news')}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View Blog List
            </button>
          </div>
          
          <div style={{ background: '#e8f5e8', padding: '1rem', borderRadius: '5px' }}>
            <h4>Homepage Blog Section</h4>
            <p>See how blogs are displayed on the homepage</p>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View Homepage
            </button>
          </div>
          
          <div style={{ background: '#fff3e0', padding: '1rem', borderRadius: '5px' }}>
            <h4>Admin Management</h4>
            <p>Manage blogs in the admin panel</p>
            <button
              onClick={() => window.open('/admin/blogs', '_blank')}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Open Admin Panel
            </button>
          </div>
          
          <div style={{ background: '#ffebee', padding: '1rem', borderRadius: '5px' }}>
            <h4>API Testing</h4>
            <p>Test the blog API endpoints directly</p>
            <button
              onClick={() => {
                fetch('/api/frontend/blogs')
                  .then(response => response.json())
                  .then(data => {
                    console.log('Blog API Response:', data);
                    alert('Check the browser console (F12) to see the API response');
                  })
                  .catch(error => {
                    console.error('API Error:', error);
                    alert('API Error - check console for details');
                  });
              }}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Test API
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>⚙️ How It Works</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#c41c13' }}>1. Blog Listing</h3>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
            <p>The BlogSection component fetches published blogs from the API and displays them in a responsive grid. Each blog card shows:</p>
            <ul>
              <li>Featured image (with fallback)</li>
              <li>Title and excerpt</li>
              <li>Publication date</li>
              <li>Clickable "Read Full Article" button</li>
            </ul>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#c41c13' }}>2. Navigation</h3>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px', marginBottom: '1rem' }}>
            <p>When a user clicks on a blog card or "Read Full Article" button:</p>
            <ul>
              <li>React Router navigates to <code>/blog/{id}</code></li>
              <li>The BlogDetailPage component loads</li>
              <li>Blog details are fetched from <code>/api/blogs/{id}</code></li>
              <li>Related blogs are loaded for the sidebar</li>
            </ul>
          </div>
        </div>

        <div>
          <h3 style={{ color: '#c41c13' }}>3. Blog Detail Page</h3>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px' }}>
            <p>The detail page provides a complete reading experience with:</p>
            <ul>
              <li>Full blog content with rich formatting</li>
              <li>Featured image display</li>
              <li>Author and publication information</li>
              <li>Related blogs in the sidebar</li>
              <li>Breadcrumb navigation</li>
              <li>Back to blogs functionality</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Sample Blog Data */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ color: '#34495e' }}>📊 Sample Blog Structure</h2>
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '5px' }}>
          <h3>Blog Object Fields:</h3>
          <ul>
            <li><strong>id</strong> - Unique identifier</li>
            <li><strong>title</strong> - Blog title</li>
            <li><strong>content</strong> - Full blog content (HTML/Markdown)</li>
            <li><strong>excerpt</strong> - Short description</li>
            <li><strong>featured_image</strong> - Image path</li>
            <li><strong>author</strong> - Author name</li>
            <li><strong>published_date</strong> - Publication date</li>
            <li><strong>is_published</strong> - Published status</li>
            <li><strong>is_featured</strong> - Featured status</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <div style={{ 
        background: '#2c3e50', 
        color: 'white', 
        padding: '2rem', 
        borderRadius: '8px', 
        textAlign: 'center',
        marginTop: '3rem'
      }}>
        <h3>🚀 Blog System Ready!</h3>
        <p>Your dynamic blog system is fully implemented and ready for content.</p>
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => navigate('/news')}
            style={{
              backgroundColor: '#c41c13',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold',
              marginRight: '1rem'
            }}
          >
            View Blogs
          </button>
          <button
            onClick={() => window.open('/admin/blogs', '_blank')}
            style={{
              backgroundColor: '#34495e',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 'bold'
            }}
          >
            Manage Blogs
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestBlogSystem;
