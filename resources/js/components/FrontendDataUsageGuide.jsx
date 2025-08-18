import React from 'react';

/**
 * Frontend Data Usage Guide Component
 * 
 * This component demonstrates how to use the Frontend Data Controller system
 * to fetch and render data from the backend to frontend.
 */

const FrontendDataUsageGuide = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Frontend Data Controller Usage Guide</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>🎯 Overview</h2>
        <p>
          The Frontend Data Controller system provides a centralized way to fetch and manage 
          data from your Laravel backend to React frontend components.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>📋 Available API Endpoints</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
          <h3>Frontend Controller Routes:</h3>
          <ul>
            <li><code>GET /api/frontend/all-data</code> - Get all frontend data in one request</li>
            <li><code>GET /api/frontend/homepage</code> - Get homepage specific data</li>
            <li><code>GET /api/frontend/sliders</code> - Get active sliders</li>
            <li><code>GET /api/frontend/about-us</code> - Get about us content</li>
            <li><code>GET /api/frontend/products</code> - Get products (with filters)</li>
            <li><code>GET /api/frontend/categories</code> - Get active categories</li>
            <li><code>GET /api/frontend/blogs</code> - Get published blogs (with filters)</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🔧 Usage Methods</h2>
        
        <h3>Method 1: Using Frontend Service Directly</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import frontendService from './services/frontendService';

// In your component
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    const result = await frontendService.getSliders();
    if (result.success) {
      setData(result.data);
    }
  };
  fetchData();
}, []);`}
        </pre>

        <h3>Method 2: Using Custom Hooks</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import { useSliders, useProducts, useBlogs } from './hooks/useFrontendData';

// In your component
const { data: sliders, loading, error } = useSliders();
const { data: products } = useProducts({ category: 'Solar' });
const { data: blogs } = useBlogs({ limit: 5 });`}
        </pre>

        <h3>Method 3: Using Context Provider (Recommended for App-wide State)</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import { FrontendDataProvider, useFrontendDataContext } from './contexts/FrontendDataContext';

// Wrap your app
<FrontendDataProvider>
  <App />
</FrontendDataProvider>

// In any component
const { data, loading, refreshData } = useFrontendDataContext();`}
        </pre>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>📊 Data Structure</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
          <h3>Available Data:</h3>
          <ul>
            <li><strong>sliders</strong>: Array of active slider objects</li>
            <li><strong>aboutUs</strong>: About us content object</li>
            <li><strong>categories</strong>: Array of active product categories</li>
            <li><strong>products</strong>: Array of active products with category relations</li>
            <li><strong>blogs</strong>: Array of published blog posts</li>
            <li><strong>featuredProducts</strong>: Filtered array of featured products</li>
            <li><strong>featuredBlogs</strong>: Filtered array of featured blogs</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🔍 Search & Filtering</h2>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`// Search across products and blogs
const searchResults = await frontendService.search('solar', 'all');

// Filter products by category
const solarProducts = await frontendService.getProducts({ category: 'Solar' });

// Get featured blogs only
const featuredBlogs = await frontendService.getBlogs({ featured: true });

// Paginated products
const paginatedProducts = await frontendService.getProducts({ 
  per_page: 12, 
  page: 1 
});`}
        </pre>
      </section>

      <section>
        <h2>✅ Benefits</h2>
        <ul>
          <li><strong>Centralized Data Management</strong>: Single source of truth for frontend data</li>
          <li><strong>Optimized API Calls</strong>: Reduced number of API requests</li>
          <li><strong>Error Handling</strong>: Built-in error handling and fallbacks</li>
          <li><strong>Caching</strong>: Context provider caches data across components</li>
          <li><strong>Search & Filtering</strong>: Built-in search and filtering capabilities</li>
          <li><strong>Type Safety</strong>: Consistent data structure across the app</li>
        </ul>
      </section>
    </div>
  );
};

export default FrontendDataUsageGuide;
