import React from 'react';
import WhyChooseUs from './WhyChooseUs';

const DynamicWhyChooseUsExample = () => {
  return (
    <div>
      <div style={{ 
        backgroundColor: '#c41c13', 
        color: 'white', 
        padding: '2rem', 
        textAlign: 'center' 
      }}>
        <h1>Dynamic WhyChooseUs Component</h1>
        <p>This component now fetches data from your database!</p>
      </div>

      {/* Example 1: Full component with title */}
      <section style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Example 1: Full Component
          </h2>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '5px', 
            marginBottom: '2rem' 
          }}>
            <code>&lt;WhyChooseUs /&gt;</code>
          </div>
          <WhyChooseUs />
        </div>
      </section>

      {/* Example 2: Limited items without title */}
      <section style={{ padding: '2rem 0', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Example 2: Limited Items (3) Without Title
          </h2>
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '1rem', 
            borderRadius: '5px', 
            marginBottom: '2rem' 
          }}>
            <code>&lt;WhyChooseUs showTitle={false} maxItems={3} /&gt;</code>
          </div>
          <WhyChooseUs showTitle={false} maxItems={3} />
        </div>
      </section>

      {/* Example 3: Compact version */}
      <section style={{ padding: '2rem 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Example 3: Compact Version (2 items)
          </h2>
          <div style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '1rem', 
            borderRadius: '5px', 
            marginBottom: '2rem' 
          }}>
            <code>&lt;WhyChooseUs maxItems={2} /&gt;</code>
          </div>
          <WhyChooseUs maxItems={2} />
        </div>
      </section>

      {/* Instructions */}
      <section style={{ 
        padding: '3rem 0', 
        backgroundColor: '#333', 
        color: 'white' 
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            How to Use This Dynamic Component
          </h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem' 
          }}>
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '1.5rem', 
              borderRadius: '8px' 
            }}>
              <h3>📊 Manage Content</h3>
              <p>Go to Admin Panel → Why Choose Us to:</p>
              <ul>
                <li>Add new items</li>
                <li>Edit existing content</li>
                <li>Upload custom icons</li>
                <li>Reorder items</li>
                <li>Toggle active/inactive</li>
              </ul>
            </div>
            
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '1.5rem', 
              borderRadius: '8px' 
            }}>
              <h3>🎨 Customize Display</h3>
              <p>Use props to customize:</p>
              <ul>
                <li><code>showTitle={false}</code> - Hide title</li>
                <li><code>maxItems={3}</code> - Limit items</li>
                <li><code>items={data}</code> - Pass custom data</li>
              </ul>
            </div>
            
            <div style={{ 
              backgroundColor: 'rgba(255,255,255,0.1)', 
              padding: '1.5rem', 
              borderRadius: '8px' 
            }}>
              <h3>🔧 Integration</h3>
              <p>Add to any page:</p>
              <ul>
                <li>Import the component</li>
                <li>Add to your JSX</li>
                <li>Data loads automatically</li>
                <li>Fallback data if API fails</li>
              </ul>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              onClick={() => window.open('/admin/why-choose-us', '_blank')}
              style={{
                backgroundColor: '#c41c13',
                color: 'white',
                border: 'none',
                padding: '1rem 2rem',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Open Admin Panel
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DynamicWhyChooseUsExample;
