import React, { useState } from 'react';
import CounterSection from './CounterSection';
import EnhancedCounterSection from './components/EnhancedCounterSection';
import { 
  CompactCounterWidget, 
  CircularCounterWidget, 
  MinimalCounterWidget, 
  CardCounterWidget,
  CounterGridWidget 
} from './components/CounterWidgets';

const CounterShowcase = () => {
  const [selectedDemo, setSelectedDemo] = useState('original');

  const demos = [
    { id: 'original', name: 'Original Counter Section', component: 'CounterSection' },
    { id: 'enhanced-default', name: 'Enhanced - Default Style', component: 'EnhancedCounterSection' },
    { id: 'enhanced-gradient', name: 'Enhanced - Gradient Style', component: 'EnhancedCounterSection' },
    { id: 'enhanced-grid', name: 'Enhanced - Grid Layout', component: 'EnhancedCounterSection' },
    { id: 'widgets-compact', name: 'Compact Widgets', component: 'Widgets' },
    { id: 'widgets-circular', name: 'Circular Widgets', component: 'Widgets' },
    { id: 'widgets-cards', name: 'Card Widgets', component: 'Widgets' },
    { id: 'widgets-grid', name: 'Widget Grid', component: 'Widgets' },
  ];

  const renderDemo = () => {
    switch (selectedDemo) {
      case 'original':
        return <CounterSection />;
        
      case 'enhanced-default':
        return (
          <EnhancedCounterSection 
            title="Our Achievements"
            subtitle="Numbers that speak for our success and commitment to excellence"
            cardStyle="default"
            animationDuration={2000}
            animationStagger={300}
          />
        );
        
      case 'enhanced-gradient':
        return (
          <EnhancedCounterSection 
            title="Success Metrics"
            subtitle="Delivering excellence across all dimensions"
            cardStyle="gradient"
            animationDuration={1500}
            animationStagger={200}
            backgroundColor="#1a1a2e"
          />
        );
        
      case 'enhanced-grid':
        return (
          <EnhancedCounterSection 
            title="Performance Dashboard"
            subtitle="Key performance indicators at a glance"
            layout="grid"
            cardStyle="elevated"
            animationDuration={2500}
            animationStagger={150}
            maxCounters={6}
          />
        );
        
      case 'widgets-compact':
        return (
          <div style={{ padding: '3rem 2rem', backgroundColor: '#f8f9fa' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Compact Counter Widgets</h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '1rem', 
              justifyContent: 'center' 
            }}>
              <CompactCounterWidget counterId={1} size="small" />
              <CompactCounterWidget counterId={2} size="medium" />
              <CompactCounterWidget counterId={3} size="large" />
              <CompactCounterWidget counterId={4} size="medium" showIcon={false} />
            </div>
          </div>
        );
        
      case 'widgets-circular':
        return (
          <div style={{ padding: '3rem 2rem', backgroundColor: '#f0f2f5' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Circular Progress Widgets</h2>
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '2rem', 
              justifyContent: 'center' 
            }}>
              <CircularCounterWidget counterId={1} size={120} strokeWidth={8} />
              <CircularCounterWidget counterId={2} size={100} strokeWidth={6} />
              <CircularCounterWidget counterId={3} size={140} strokeWidth={10} />
              <CircularCounterWidget counterId={4} size={100} strokeWidth={8} />
            </div>
          </div>
        );
        
      case 'widgets-cards':
        return (
          <div style={{ padding: '3rem 2rem', backgroundColor: '#fafbfc' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Card Counter Widgets</h2>
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              <CardCounterWidget counterId={1} variant="default" />
              <CardCounterWidget counterId={2} variant="primary" />
              <CardCounterWidget counterId={3} variant="gradient" />
              <CardCounterWidget counterId={4} variant="default" />
            </div>
          </div>
        );
        
      case 'widgets-grid':
        return (
          <div style={{ padding: '3rem 2rem', backgroundColor: '#f5f7fa' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Counter Grid Layouts</h2>
            
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>2-Column Compact Grid</h3>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <CounterGridWidget columns={2} variant="compact" />
              </div>
            </div>
            
            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>3-Column Circular Grid</h3>
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <CounterGridWidget columns={3} variant="circular" counterIds={[1, 2, 3]} />
              </div>
            </div>
            
            <div>
              <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>4-Column Minimal Grid</h3>
              <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <CounterGridWidget columns={4} variant="minimal" />
              </div>
            </div>
          </div>
        );
        
      default:
        return <CounterSection />;
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
          Counter Components Showcase
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>
          Explore different counter styles and layouts for your website
        </p>
      </div>

      {/* Demo Selector */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem 2rem',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          justifyContent: 'center',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setSelectedDemo(demo.id)}
              style={{
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '20px',
                backgroundColor: selectedDemo === demo.id ? '#c41c13' : 'white',
                color: selectedDemo === demo.id ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {demo.name}
            </button>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div style={{ minHeight: '60vh' }}>
        {renderDemo()}
      </div>

      {/* Features Info */}
      <div style={{
        backgroundColor: '#34495e',
        color: 'white',
        padding: '3rem 2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Counter Component Features
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3>🎨 Multiple Styles</h3>
              <ul>
                <li>Default, Gradient, Minimal, Elevated</li>
                <li>Compact, Circular, Card widgets</li>
                <li>Customizable colors and themes</li>
              </ul>
            </div>
            
            <div>
              <h3>📱 Responsive Layouts</h3>
              <ul>
                <li>Horizontal, Grid, Vertical layouts</li>
                <li>Auto-responsive grid systems</li>
                <li>Mobile-optimized designs</li>
              </ul>
            </div>
            
            <div>
              <h3>⚡ Advanced Animations</h3>
              <ul>
                <li>Scroll-triggered animations</li>
                <li>Configurable easing functions</li>
                <li>Staggered animation delays</li>
              </ul>
            </div>
            
            <div>
              <h3>🛠️ Easy Integration</h3>
              <ul>
                <li>Dynamic data from database</li>
                <li>Admin panel management</li>
                <li>Fallback data support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Link */}
      <div style={{
        backgroundColor: '#c41c13',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3>Manage Your Counters</h3>
        <p>Add, edit, and customize your counters in the admin panel</p>
        <button
          onClick={() => window.open('/admin/counters', '_blank')}
          style={{
            backgroundColor: 'white',
            color: '#c41c13',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            marginTop: '1rem'
          }}
        >
          Open Admin Panel
        </button>
      </div>
    </div>
  );
};

export default CounterShowcase;
