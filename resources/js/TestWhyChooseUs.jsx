import React from 'react';
import WhyChooseUs from './WhyChooseUs';

const TestWhyChooseUs = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Testing Dynamic WhyChooseUs Component</h1>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginBottom: '2rem' 
      }}>
        <h3>🧪 Test 1: Default Usage (Fetches from API)</h3>
        <p>This will fetch data from the backend API automatically:</p>
        <code>&lt;WhyChooseUs /&gt;</code>
      </div>
      
      <WhyChooseUs />
      
      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginBottom: '2rem',
        marginTop: '3rem'
      }}>
        <h3>🧪 Test 2: Limited Items (Max 3)</h3>
        <p>This will show only the first 3 items:</p>
        <code>&lt;WhyChooseUs maxItems={3} /&gt;</code>
      </div>
      
      <WhyChooseUs maxItems={3} />
      
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginBottom: '2rem',
        marginTop: '3rem'
      }}>
        <h3>🧪 Test 3: No Title</h3>
        <p>This will hide the section title:</p>
        <code>&lt;WhyChooseUs showTitle={false} maxItems={2} /&gt;</code>
      </div>
      
      <WhyChooseUs showTitle={false} maxItems={2} />
      
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginTop: '3rem'
      }}>
        <h3>✅ Component Features</h3>
        <ul>
          <li><strong>Dynamic Data:</strong> Fetches from /api/why-choose-us/active</li>
          <li><strong>Fallback Data:</strong> Shows default items if API fails</li>
          <li><strong>Icon Support:</strong> CSS icons (Font Awesome) and uploaded images</li>
          <li><strong>Responsive:</strong> Auto-fit grid layout</li>
          <li><strong>Customizable:</strong> Props for title, item limits</li>
          <li><strong>Loading State:</strong> Shows loading indicator while fetching</li>
          <li><strong>Error Handling:</strong> Graceful fallback to default data</li>
        </ul>
      </div>
      
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
          Refresh Page
        </button>
        
        <button
          onClick={() => {
            console.log('Opening browser console...');
            alert('Check the browser console (F12) to see API calls and data loading logs');
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
          Check Console Logs
        </button>
      </div>
    </div>
  );
};

export default TestWhyChooseUs;
