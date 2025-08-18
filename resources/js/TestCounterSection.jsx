import React from 'react';
import CounterSection from './CounterSection';

const TestCounterSection = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Testing Dynamic CounterSection Component</h1>
      
      <div style={{ 
        backgroundColor: '#e3f2fd', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginBottom: '2rem' 
      }}>
        <h3>🧪 Dynamic Counter Section</h3>
        <p>This component now fetches counter data from the backend API automatically:</p>
        <code>&lt;CounterSection /&gt;</code>
        <p><strong>Features:</strong></p>
        <ul>
          <li>Fetches data from <code>/api/counters/active</code></li>
          <li>Shows icons (Font Awesome or uploaded images)</li>
          <li>Animated counting effect</li>
          <li>Fallback to default data if API fails</li>
          <li>Console logging for debugging</li>
        </ul>
      </div>
      
      <CounterSection />
      
      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginTop: '3rem'
      }}>
        <h3>✅ Component Features</h3>
        <ul>
          <li><strong>Dynamic Data:</strong> Fetches from database via API</li>
          <li><strong>Icon Support:</strong> CSS icons (Font Awesome) and uploaded images</li>
          <li><strong>Animated Counters:</strong> Numbers count up from 0 to target value</li>
          <li><strong>Responsive Design:</strong> Flexbox layout that wraps on smaller screens</li>
          <li><strong>Fallback Data:</strong> Shows default counters if API fails</li>
          <li><strong>Loading State:</strong> Shows loading indicator while fetching</li>
          <li><strong>Error Handling:</strong> Graceful fallback to default data</li>
          <li><strong>Admin Management:</strong> Full CRUD in admin panel</li>
        </ul>
      </div>
      
      <div style={{ 
        backgroundColor: '#fff3e0', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginTop: '2rem'
      }}>
        <h3>🛠️ Admin Management</h3>
        <p>Manage counters in the admin panel:</p>
        <ul>
          <li>Add/Edit/Delete counters</li>
          <li>Set custom icons (CSS classes or upload images)</li>
          <li>Configure values, labels, and suffixes</li>
          <li>Reorder counters</li>
          <li>Toggle active/inactive status</li>
        </ul>
        
        <div style={{ marginTop: '1rem' }}>
          <button
            onClick={() => window.open('/admin/counters', '_blank')}
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
            Open Admin Panel
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
      
      <div style={{ 
        backgroundColor: '#f3e5f5', 
        padding: '1rem', 
        borderRadius: '5px', 
        marginTop: '2rem'
      }}>
        <h3>📊 Sample Counter Data</h3>
        <p>The component includes these default counters if no data is found:</p>
        <ul>
          <li><strong>Products Sold / Month:</strong> 1200+ (Shopping Cart icon)</li>
          <li><strong>Happy Seniors:</strong> 350+ (Smile icon)</li>
          <li><strong>Years of Experience:</strong> 15 (Calendar icon)</li>
          <li><strong>Total Staffs:</strong> 80+ (Users icon)</li>
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
          onClick={() => window.location.href = '/'}
          style={{
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          View on Homepage
        </button>
      </div>
    </div>
  );
};

export default TestCounterSection;
