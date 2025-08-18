import React, { useState, useEffect } from 'react';
import frontendService from '../services/frontendService';

const WhyChooseUsTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testFetch = async () => {
      console.log('Testing Why Choose Us API...');
      
      try {
        // Test direct API call
        const result = await frontendService.getWhyChooseUs();
        console.log('API Result:', result);
        
        if (result.success) {
          setData(result.data);
          console.log('✅ Successfully fetched Why Choose Us data:', result.data);
        } else {
          setError('API returned success: false');
          console.error('❌ API returned success: false');
        }
      } catch (err) {
        setError(err.message);
        console.error('❌ Error fetching Why Choose Us data:', err);
      } finally {
        setLoading(false);
      }
    };

    testFetch();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Testing Why Choose Us API...</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Why Choose Us - API Test</h1>
      
      {error ? (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '1rem',
          borderRadius: '5px',
          marginBottom: '2rem'
        }}>
          <h3>❌ Error:</h3>
          <p>{error}</p>
          <p><strong>Check:</strong></p>
          <ul>
            <li>Is the Laravel server running?</li>
            <li>Is the database migrated?</li>
            <li>Are there any console errors?</li>
          </ul>
        </div>
      ) : (
        <div style={{
          backgroundColor: '#e8f5e8',
          color: '#2e7d32',
          padding: '1rem',
          borderRadius: '5px',
          marginBottom: '2rem'
        }}>
          <h3>✅ Success!</h3>
          <p>Successfully fetched {data?.length || 0} Why Choose Us items</p>
        </div>
      )}

      {/* Display the data */}
      {data && data.length > 0 && (
        <div>
          <h2>Fetched Data:</h2>
          <div style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'
          }}>
            {data.map((item) => (
              <div key={item.id} style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: '#f9f9f9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                  {item.icon_type === 'image' && item.icon ? (
                    <img
                      src={`/${item.icon}`}
                      alt={item.title}
                      style={{
                        width: '40px',
                        height: '40px',
                        objectFit: 'contain',
                        marginRight: '1rem'
                      }}
                    />
                  ) : item.icon ? (
                    <i 
                      className={item.icon}
                      style={{
                        fontSize: '2rem',
                        color: item.icon_color || '#c41c13',
                        marginRight: '1rem'
                      }}
                    />
                  ) : (
                    <div style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: item.icon_color || '#c41c13',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      marginRight: '1rem'
                    }}>
                      {item.title.charAt(0)}
                    </div>
                  )}
                  <h3 style={{ margin: 0, color: '#333' }}>{item.title}</h3>
                </div>
                <p style={{ color: '#666', lineHeight: '1.5' }}>{item.description}</p>
                <div style={{ fontSize: '0.9rem', color: '#999', marginTop: '0.5rem' }}>
                  Order: {item.order} | Status: {item.is_active ? 'Active' : 'Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Raw JSON for debugging */}
      <details style={{ marginTop: '2rem' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
          View Raw JSON Data
        </summary>
        <pre style={{
          backgroundColor: '#f5f5f5',
          padding: '1rem',
          borderRadius: '5px',
          overflow: 'auto',
          fontSize: '0.9rem',
          marginTop: '1rem'
        }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>

      {/* API Test Buttons */}
      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        <button
          onClick={() => window.location.reload()}
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
          Refresh Data
        </button>
        
        <button
          onClick={() => {
            console.log('Current data:', data);
            alert(`Loaded ${data?.length || 0} items. Check console for details.`);
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
          Log to Console
        </button>
      </div>
    </div>
  );
};

export default WhyChooseUsTest;
