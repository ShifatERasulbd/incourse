import React, { useState } from 'react';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState('');

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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* Top full width image */}
      <div style={{ width: '100%', marginBottom: '2rem', overflow: 'hidden', borderRadius: '12px' }}>
        <img
          src="/Frontend/slider/slider2.jpg" // replace with your desired image path
          alt="Contact Us Banner"
          style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }}
        />
      </div>

      {/* Content below image: two columns */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        padding: '2rem',
        borderRadius: '12px',
        // background removed here
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
          <h2 style={{ marginBottom: '1rem' }}>Get in Touch</h2>
          <p><strong>Address:</strong> 123 Power St, Energy City, Country</p>
          <p><strong>Phone:</strong> +880 1234 567890</p>
          <p><strong>Email:</strong> support@incourses.com</p>
          <p><strong>Working Hours:</strong> Mon - Fri, 9am - 6pm</p>
          <p>Feel free to reach out with any questions or requests. We're here to help!</p>
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
    </div>
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
