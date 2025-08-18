import React from 'react';

const WhyChooseUsUsageGuide = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Why Choose Us - Frontend Usage Guide</h1>
      
      <section style={{ marginBottom: '2rem' }}>
        <h2>🎯 Overview</h2>
        <p>
          The Why Choose Us system allows you to manage and display compelling reasons 
          why customers should choose your company. This guide shows how to fetch and 
          display this data on the frontend.
        </p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>📋 Available API Endpoints</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
          <h3>Public Endpoints:</h3>
          <ul>
            <li><code>GET /api/why-choose-us/active</code> - Get active items only</li>
            <li><code>GET /api/frontend/why-choose-us</code> - Get active items with success wrapper</li>
          </ul>
          <h3>Admin Endpoints (Protected):</h3>
          <ul>
            <li><code>GET /api/admin/why-choose-us</code> - Get all items</li>
            <li><code>POST /api/admin/why-choose-us</code> - Create new item</li>
            <li><code>PUT /api/admin/why-choose-us/{`{id}`}</code> - Update item</li>
            <li><code>DELETE /api/admin/why-choose-us/{`{id}`}</code> - Delete item</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🔧 Usage Methods</h2>
        
        <h3>Method 1: Using Custom Hook (Recommended)</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import { useWhyChooseUs } from './hooks/useFrontendData';

const MyComponent = () => {
  const { data, loading, error } = useWhyChooseUs();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};`}
        </pre>

        <h3>Method 2: Direct API Call</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import frontendService from './services/frontendService';

const MyComponent = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await frontendService.getWhyChooseUs();
      if (result.success) {
        setData(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};`}
        </pre>

        <h3>Method 3: Using Pre-built Component</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', overflow: 'auto' }}>
{`import WhyChooseUs from './components/WhyChooseUs';

// Basic usage (fetches data automatically)
<WhyChooseUs />

// With props
<WhyChooseUs 
  showTitle={false}
  maxItems={4}
/>

// With pre-fetched data (avoids duplicate API calls)
<WhyChooseUs 
  items={myData}
  showTitle={true}
  maxItems={6}
/>`}
        </pre>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>📊 Data Structure</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
          <h3>Each Why Choose Us item contains:</h3>
          <ul>
            <li><strong>id</strong>: Unique identifier</li>
            <li><strong>title</strong>: Item title (e.g., "Expert Team")</li>
            <li><strong>description</strong>: Detailed description</li>
            <li><strong>icon</strong>: Icon class name or image path</li>
            <li><strong>icon_type</strong>: "class" for CSS icons or "image" for uploaded images</li>
            <li><strong>icon_color</strong>: Color for CSS icons (hex code)</li>
            <li><strong>order</strong>: Display order</li>
            <li><strong>is_active</strong>: Whether the item is active</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🎨 Component Props</h2>
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px' }}>
          <h3>WhyChooseUs Component Props:</h3>
          <ul>
            <li><strong>items</strong> (array): Pre-fetched data to display</li>
            <li><strong>showTitle</strong> (boolean): Show/hide section title (default: true)</li>
            <li><strong>maxItems</strong> (number): Limit number of items displayed</li>
          </ul>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>🔍 Testing & Debugging</h2>
        <div style={{ marginTop: '1rem' }}>
          <h3>Test Pages Available:</h3>
          <ul>
            <li><strong>/test-why-choose-us.html</strong> - Direct API testing (no React)</li>
            <li><strong>/test-why-choose-us</strong> - React component testing</li>
            <li><strong>/demo-why-choose-us</strong> - Complete integration demo</li>
            <li><strong>/why-choose-us</strong> - Full page implementation</li>
          </ul>
          
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => window.open('/test-why-choose-us.html', '_blank')}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '1rem'
              }}
            >
              Test API Directly
            </button>
            
            <button
              onClick={() => window.location.href = '/demo-why-choose-us'}
              style={{
                backgroundColor: '#666',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              View Integration Demo
            </button>
          </div>
        </div>
      </section>

      <section>
        <h2>✅ Integration Checklist</h2>
        <ul>
          <li>✅ Database migrated with Why Choose Us table</li>
          <li>✅ Sample data seeded</li>
          <li>✅ API endpoints working</li>
          <li>✅ Frontend service configured</li>
          <li>✅ React hooks available</li>
          <li>✅ Pre-built components ready</li>
          <li>✅ Admin panel for management</li>
          <li>✅ Test pages for debugging</li>
        </ul>
      </section>
    </div>
  );
};

export default WhyChooseUsUsageGuide;
