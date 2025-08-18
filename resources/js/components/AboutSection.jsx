import React from 'react';

const AboutSection = ({ content }) => {
  if (!content) {
    return null;
  }

  return (
    <div className="about-section" style={{
      padding: '4rem 0',
      backgroundColor: '#f8f9fa'
    }}>
      <div className="container" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem'
      }}>
        <div className="row" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap'
        }}>
          {/* Text Content */}
          <div className="col-md-6" style={{
            flex: '1',
            minWidth: '300px'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '1.5rem'
            }}>
              {content.section_title || 'About Us'}
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.7',
              color: '#666',
              marginBottom: '2rem'
            }}>
              {content.main_text}
            </p>
            
            <button style={{
              backgroundColor: '#c41c13',
              color: 'white',
              border: 'none',
              padding: '1rem 2rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: '500',
              transition: 'background-color 0.3s ease'
            }}>
              Learn More
            </button>
          </div>
          
          {/* Image Content */}
          {content.main_image_path && (
            <div className="col-md-6" style={{
              flex: '1',
              minWidth: '300px'
            }}>
              <img
                src={`/${content.main_image_path}`}
                alt={content.section_title || 'About Us'}
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
                }}
                onError={(e) => {
                  e.target.src = '/Frontend/slider/slider1.jpg';
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
