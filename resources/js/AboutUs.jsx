import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import frontendService from './services/frontendService';

// Default fallback content
const defaultContent = {
  section_title: 'About Us',
  main_text: 'Incourses is dedicated to providing innovative power solutions and global support for businesses of all sizes. Our mission is to deliver reliable energy and cutting-edge technology, ensuring our clients thrive in a rapidly changing world.',
  banner_image_path: 'Frontend/slider/slider2.jpg',
  main_image_path: 'Frontend/slider/slider1.jpg',
  show_banner: true,
  is_active: true,
};

export default function AboutUs() {
  const location = useLocation();
  const [content, setContent] = useState(defaultContent);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const result = await frontendService.getAboutUs();
        if (result.success && result.data) {
          setContent(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch about us content:', error);
        // Keep default content
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
      {/* Conditionally render banner image only on /about */}
      {location.pathname === '/about' && content.show_banner && content.banner_image_path && (
        <div style={{ width: '100%', overflow: 'hidden', borderRadius: 0 }}>
          <img
            src={`/${content.banner_image_path}`}
            alt="About Us Banner"
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              display: 'block',
              background: '#eee',
            }}
            onError={e => { e.target.style.background = '#c41c13'; e.target.alt = 'Image not found'; }}
          />
        </div>
      )}

      {/* Original about us section */}
      <div className="aboutus-section" style={{ background: '#e6f0fa', padding: 0, minHeight: '400px', width: '100%' }}>
        <style>{`
          .aboutus-section {
            width: 100vw !important;
            margin-left: calc(-50vw + 50%);
          }
          .aboutus-row {
            display: flex;
            flex-direction: row;
            align-items: stretch;
            justify-content: center;
            flex-wrap: wrap;
            width: 100%;
          }
          .aboutus-text, .aboutus-image {
            flex: 1 1 0;
            min-width: 260px;
            max-width: 50%;
            width: 50%;
            box-sizing: border-box;
          }
          .aboutus-text {
            background: #1C1E5C;
            padding: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .aboutus-text p {
            color: #fff;
          }
          .aboutus-image {
            background: #eaf3fb;
            padding: 2.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .aboutus-image img {
            width: 100%;
            max-width: 400px;
            height: 400px;
            border-radius: 18px;
            box-shadow: 0 4px 24px rgba(0,0,0,0.12);
            object-fit: cover;
            object-position: center;
            background: #eee;
            display: block;
          }
          @media (max-width: 900px) {
            .aboutus-row {
              flex-direction: column !important;
              align-items: stretch !important;
            }
            .aboutus-text, .aboutus-image {
              max-width: 100% !important;
              width: 100% !important;
              padding: 1.5rem !important;
            }
            .aboutus-image img {
              max-width: 100% !important;
              width: 100% !important;
              height: 300px !important;
            }
          }
        `}</style>
        <div className="aboutus-row">
          <div className="aboutus-text">
            <div style={{ width: '100%' }}>
              <p style={{ fontSize: '1.15rem', lineHeight: '1.7', textAlign: 'center', margin: 0 }}>
                {content.main_text}
              </p>
            </div>
          </div>
          <div className="aboutus-image">
            <img
              src={content.main_image_path ?
                `/${content.main_image_path}` :
                "/Frontend/slider/slider1.jpg"
              }
              alt="About Us"
              onError={e => { e.target.style.background = '#c41c13'; e.target.alt = 'Image not found'; }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
