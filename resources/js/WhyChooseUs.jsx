import React, { useState, useEffect } from 'react';
import frontendService from './services/frontendService';

// Default fallback data in case API fails
const defaultItems = [
  {
    id: 1,
    title: 'Expert Team',
    description: 'Our experienced professionals provide top-quality service and support for all your power needs.',
    icon: 'fas fa-users',
    icon_type: 'class',
    icon_color: '#c41c13',
    order: 1,
    is_active: true
  },
  {
    id: 2,
    title: '24/7 Support',
    description: 'Round-the-clock customer support ensures your power systems are always running smoothly.',
    icon: 'fas fa-clock',
    icon_type: 'class',
    icon_color: '#c41c13',
    order: 2,
    is_active: true
  },
  {
    id: 3,
    title: 'Quality Products',
    description: 'We offer only the highest quality power solutions from trusted manufacturers worldwide.',
    icon: 'fas fa-award',
    icon_type: 'class',
    icon_color: '#c41c13',
    order: 3,
    is_active: true
  },
  {
    id: 4,
    title: 'Competitive Pricing',
    description: 'Get the best value for your investment with our competitive pricing and flexible payment options.',
    icon: 'fas fa-dollar-sign',
    icon_type: 'class',
    icon_color: '#c41c13',
    order: 4,
    is_active: true
  }
];

const WhyChooseUs = ({ showTitle = true, maxItems = null, items: propItems }) => {
  const [items, setItems] = useState(propItems || defaultItems);
  const [loading, setLoading] = useState(!propItems);

  // Fetch data from API if not provided as props
  useEffect(() => {
    if (propItems) {
      // If items are provided as props, use them directly
      let finalItems = propItems;

      // Limit items if maxItems is specified
      if (maxItems && maxItems > 0) {
        finalItems = propItems.slice(0, maxItems);
      }

      setItems(finalItems);
      setLoading(false);
      return;
    }

    const fetchItems = async () => {
      try {
        console.log('Fetching Why Choose Us data from API...');
        const result = await frontendService.getWhyChooseUs();
        console.log('API Result:', result);

        if (result.success && result.data && result.data.length > 0) {
          let fetchedItems = result.data;

          // Limit items if maxItems is specified
          if (maxItems && maxItems > 0) {
            fetchedItems = fetchedItems.slice(0, maxItems);
          }

          setItems(fetchedItems);
          console.log('✅ Successfully loaded Why Choose Us items:', fetchedItems);
        } else {
          console.log('⚠️ API returned no data, using fallback items');
        }
      } catch (error) {
        console.error('❌ Failed to fetch why choose us items:', error);
        // Keep default items as fallback
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [maxItems, propItems]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        color: '#666'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <section className="why-choose-us" style={{
      padding: '4rem 0',
      backgroundColor: '#f8f9fa'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        {showTitle && (
          <div className="section-header" style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1rem'
            }}>
              Why Choose Us
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Discover what makes us the preferred choice for power solutions
            </p>
          </div>
        )}

        <div className="items-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'start'
        }}>
          {items.map((item) => (
            <div key={item.id} className="why-choose-item" style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              {/* Icon */}
              <div className="icon-container" style={{
                marginBottom: '1.5rem'
              }}>
                {item.icon_type === 'image' && item.icon ? (
                  <img
                    src={`/${item.icon}`}
                    alt={item.title}
                    style={{
                      width: '64px',
                      height: '64px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : item.icon ? (
                  <i
                    className={item.icon}
                    style={{
                      fontSize: '3rem',
                      color: item.icon_color || '#c41c13'
                    }}
                  />
                ) : (
                  <div style={{
                    width: '64px',
                    height: '64px',
                    backgroundColor: item.icon_color || '#c41c13',
                    borderRadius: '50%',
                    margin: '0 auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 'bold'
                  }}>
                    {item.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '1rem'
              }}>
                {item.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#666',
                margin: 0
              }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .why-choose-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;
