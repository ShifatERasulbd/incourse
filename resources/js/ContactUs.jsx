import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ContactUs() {

    const [contactInfo, setContactInfo] = useState({
      address: '',
      phone: '',
      email: '',
      map: '',
      workingHours: ''
    });
  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try{
      setLoading(true);
      // Fetch all settings from the public endpoint
      const response = await axios.get('/api/frontend/admin/settings/public');
       if (response.data.success) {
        const settings = response.data.data;
        
        // Extract contact information
        const contactData = {
          address: settings.find(s => s.key === 'contact_address')?.value || '',
          phone: settings.find(s => s.key === 'contact_phone')?.value || '',
          email: settings.find(s => s.key === 'contact_email')?.value || '',
          map: settings.find(s => s.key === 'contact_map')?.value || '',
          workingHours: settings.find(s => s.key === 'contact_working_hours')?.value || ''
        };
        
        setContactInfo(contactData);
      }
    }catch (error) {
      console.error('Error fetching contact information:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [settings, setSettings] = useState([]);
  const [status, setStatus] = useState('');

  
  const [loading, setLoading] = useState(true);



  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    setStatus('Sending...');

    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1rem' }}>Loading contact information...</div>
        <div style={{ fontSize: '0.9rem', color: '#999' }}>
          Fetching data from /api/contact
        </div>
      </div>
    );
  }

  if (!contactInfo) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '1.2rem',
        color: '#666',
        textAlign: 'center'
      }}>
        <div style={{ marginBottom: '1rem', color: '#c41c13' }}>
          Contact information not available.
        </div>
        <div style={{ fontSize: '0.9rem', color: '#999' }}>
          Status: {status} | Check console for details
        </div>
        <button
          onClick={fetchContactInfo}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#c41c13',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Retry Loading
        </button>
      </div>
    );
  }

  const getBannerImage = () => {
    if (contactInfo.banner_image) {
      // Check if it's a full URL or a relative path
      if (contactInfo.banner_image.startsWith('http')) {
        return contactInfo.banner_image;
      } else if (contactInfo.banner_image.startsWith('storage/')) {
        return `/${contactInfo.banner_image}`;
      } else {
        return `/${contactInfo.banner_image}`;
      }
    }
    return '/Frontend/slider/slider2.jpg'; // fallback
  };

  return (
    <>
      {/* Debug Panel - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          backgroundColor: '#f8f9fa',
          border: '1px solid #ddd',
          borderRadius: '5px',
          padding: '10px',
          fontSize: '12px',
          zIndex: 9999,
          maxWidth: '300px'
        }}>
          <strong>Contact Debug Info:</strong><br/>
          Status: {status}<br/>
          Loading: {loading ? 'Yes' : 'No'}<br/>
          Contact Info: {contactInfo ? 'Loaded' : 'Not loaded'}<br/>
          {contactInfo && (
            <>
              Title: {contactInfo.title}<br/>
              Email: {contactInfo.email}<br/>
              Active: {contactInfo.is_active ? 'Yes' : 'No'}
            </>
          )}
        </div>
      )}

      {/* Full width top image outside max-width container */}
      <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden', borderRadius: '0 0 12px 12px' }}>
        <img
          src={getBannerImage()}
          alt="Contact Us Banner"
          style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
          onError={(e) => {
            e.target.src = '/Frontend/slider/slider2.jpg'; // fallback image
          }}
        />
      </div>

      {/* Main container with max width and centered */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Content below image: two columns */}
        <div style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
        }}>
          {/* Left column - Contact Info */}
          <div style={{
            flex: '1 1 300px',
            color: '#272863',
            fontSize: '1.1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '1rem',
            paddingRight: '1rem',
            borderRight: '2px solid #ddd',
            minWidth: '280px',
          }}>
            <h2 style={{ marginBottom: '1rem' }}>{contactInfo.title}</h2>
            <p><strong>Address:</strong> {contactInfo.address}</p>
            <p><strong>Phone:</strong> {contactInfo.phone}</p>
            <p><strong>Email:</strong> {contactInfo.email}</p>
            <p><strong>Working Hours:</strong> {contactInfo.working_hours}</p>
            {contactInfo.description && (
              <div
                style={{
                  marginTop: '1rem',
                  lineHeight: '1.6',
                  color: '#555'
                }}
                dangerouslySetInnerHTML={{ __html: contactInfo.description }}
              />
            )}

            {/* Social Media Links */}
            {(contactInfo.facebook_url || contactInfo.twitter_url || contactInfo.linkedin_url || contactInfo.instagram_url) && (
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>Follow Us:</h3>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  {contactInfo.facebook_url && (
                    <a
                      href={contactInfo.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#1877f2',
                        textDecoration: 'none',
                        padding: '0.5rem',
                        border: '1px solid #1877f2',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#1877f2';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#1877f2';
                      }}
                    >
                      Facebook
                    </a>
                  )}
                  {contactInfo.twitter_url && (
                    <a
                      href={contactInfo.twitter_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#1da1f2',
                        textDecoration: 'none',
                        padding: '0.5rem',
                        border: '1px solid #1da1f2',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#1da1f2';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#1da1f2';
                      }}
                    >
                      Twitter
                    </a>
                  )}
                  {contactInfo.linkedin_url && (
                    <a
                      href={contactInfo.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#0077b5',
                        textDecoration: 'none',
                        padding: '0.5rem',
                        border: '1px solid #0077b5',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#0077b5';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#0077b5';
                      }}
                    >
                      LinkedIn
                    </a>
                  )}
                  {contactInfo.instagram_url && (
                    <a
                      href={contactInfo.instagram_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: '#e4405f',
                        textDecoration: 'none',
                        padding: '0.5rem',
                        border: '1px solid #e4405f',
                        borderRadius: '5px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#e4405f';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#e4405f';
                      }}
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right column - Contact Form */}
          <div style={{ flex: '1 1 400px', minWidth: '280px' }}>
            <h2 style={{ color: '#272863', marginBottom: '1.5rem' }}>Contact Us</h2>

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <label htmlFor="name" style={labelStyle}>Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Your full name"
              />

              <label htmlFor="email" style={labelStyle}>Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
                placeholder="your.email@example.com"
              />

              <label htmlFor="subject" style={labelStyle}>Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                value={formData.subject}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Subject of your message"
              />

              <label htmlFor="message" style={labelStyle}>Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                placeholder="Write your message here..."
              />

              <button
                type="submit"
                style={submitBtnStyle}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1f1f66')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#272863')}
              >
                Send Message
              </button>
            </form>

            {status && <p style={{ marginTop: '1rem', color: '#444', fontWeight: '600' }}>{status}</p>}
          </div>
        </div>

        {/* Map Section */}
        {contactInfo.map_url && (
          <div style={{
            marginTop: '3rem',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              color: '#272863',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              Find Us Here
            </h2>
            <div style={{
              position: 'relative',
              paddingBottom: '56.25%', // 16:9 aspect ratio
              height: 0,
              overflow: 'hidden'
            }}>
              <iframe
                src={contactInfo.map_url}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 0
                }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const labelStyle = {
  display: 'block',
  margin: '1rem 0 0.25rem',
  fontWeight: '600',
  color: '#272863'
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none',
  boxSizing: 'border-box',
};

const submitBtnStyle = {
  marginTop: '1.5rem',
  backgroundColor: '#272863',
  color: '#fff',
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  cursor: 'pointer',
  width: '100%',
  transition: 'background-color 0.3s',
};
