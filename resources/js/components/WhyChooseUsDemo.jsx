import React, { useState, useEffect } from 'react';
import { useWhyChooseUs } from '../hooks/useFrontendData';
import frontendService from '../services/frontendService';
import WhyChooseUs from './WhyChooseUs';

const WhyChooseUsDemo = () => {
  const [directApiData, setDirectApiData] = useState(null);
  const [directApiLoading, setDirectApiLoading] = useState(true);
  const [directApiError, setDirectApiError] = useState(null);

  // Method 1: Using the custom hook
  const { data: hookData, loading: hookLoading, error: hookError } = useWhyChooseUs();

  // Method 2: Direct API call
  useEffect(() => {
    const fetchDirectly = async () => {
      try {
        const result = await frontendService.getWhyChooseUs();
        if (result.success) {
          setDirectApiData(result.data);
        } else {
          setDirectApiError('API returned success: false');
        }
      } catch (err) {
        setDirectApiError(err.message);
      } finally {
        setDirectApiLoading(false);
      }
    };

    fetchDirectly();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Why Choose Us - Frontend Integration Demo</h1>
      <p>This page demonstrates different ways to fetch and display Why Choose Us data.</p>

      {/* Method 1: Using Custom Hook */}
      <section style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h2>Method 1: Using Custom Hook (useWhyChooseUs)</h2>
        <p><strong>Code:</strong> <code>const {`{ data, loading, error }`} = useWhyChooseUs();</code></p>
        
        {hookLoading && <p>Loading with hook...</p>}
        {hookError && <p style={{ color: 'red' }}>Hook Error: {hookError}</p>}
        {hookData && (
          <div>
            <p style={{ color: 'green' }}>✅ Successfully loaded {hookData.length} items with hook</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {hookData.slice(0, 3).map(item => (
                <div key={item.id} style={{ 
                  padding: '1rem', 
                  backgroundColor: 'white', 
                  borderRadius: '5px',
                  border: '1px solid #ddd'
                }}>
                  <h4>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Method 2: Direct API Call */}
      <section style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h2>Method 2: Direct API Call</h2>
        <p><strong>Code:</strong> <code>const result = await frontendService.getWhyChooseUs();</code></p>
        
        {directApiLoading && <p>Loading with direct API...</p>}
        {directApiError && <p style={{ color: 'red' }}>Direct API Error: {directApiError}</p>}
        {directApiData && (
          <div>
            <p style={{ color: 'green' }}>✅ Successfully loaded {directApiData.length} items with direct API</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
              {directApiData.slice(0, 3).map(item => (
                <div key={item.id} style={{ 
                  padding: '1rem', 
                  backgroundColor: 'white', 
                  borderRadius: '5px',
                  border: '1px solid #ddd'
                }}>
                  <h4>{item.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>{item.description.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Method 3: Using the WhyChooseUs Component */}
      <section style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#f3e5f5', borderRadius: '8px' }}>
        <h2>Method 3: Using WhyChooseUs Component</h2>
        <p><strong>Code:</strong> <code>{`<WhyChooseUs />`}</code></p>
        <p>This component automatically fetches and displays the data:</p>
        
        <div style={{ marginTop: '1rem' }}>
          <WhyChooseUs maxItems={4} />
        </div>
      </section>

      {/* Method 4: Using WhyChooseUs Component with Props */}
      <section style={{ marginBottom: '3rem', padding: '2rem', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
        <h2>Method 4: Using WhyChooseUs Component with Props</h2>
        <p><strong>Code:</strong> <code>{`<WhyChooseUs items={data} showTitle={false} maxItems={3} />`}</code></p>
        <p>Pass data as props to avoid duplicate API calls:</p>
        
        <div style={{ marginTop: '1rem' }}>
          {hookData && (
            <WhyChooseUs 
              items={hookData} 
              showTitle={false} 
              maxItems={3}
            />
          )}
        </div>
      </section>

      {/* API Endpoints Info */}
      <section style={{ padding: '2rem', backgroundColor: '#e8f5e8', borderRadius: '8px' }}>
        <h2>Available API Endpoints</h2>
        <ul>
          <li><strong>Public:</strong> <code>GET /api/why-choose-us/active</code> - Returns active items only</li>
          <li><strong>Frontend:</strong> <code>GET /api/frontend/why-choose-us</code> - Returns active items with success wrapper</li>
          <li><strong>Admin:</strong> <code>GET /api/admin/why-choose-us</code> - Returns all items (requires authentication)</li>
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
            onClick={() => {
              console.log('Hook Data:', hookData);
              console.log('Direct API Data:', directApiData);
            }}
            style={{
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Log Data to Console
          </button>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUsDemo;
