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

    // Simple validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Reset status and simulate form submission
    setStatus('Sending...');

    // Simulate async submission (replace with real API call)
    setTimeout(() => {
      setStatus('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div style={{
      background: '#f8fafc',
      minHeight: '60vh',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '600px',
      margin: '0 auto',
      borderRadius: '12px',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{ color: '#272863', marginBottom: '1.5rem' }}>Contact Us</h2>

      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '600' }}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Your full name"
        />

        <label htmlFor="email" style={{ display: 'block', margin: '1rem 0 0.25rem', fontWeight: '600' }}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          style={inputStyle}
          placeholder="your.email@example.com"
        />

        <label htmlFor="subject" style={{ display: 'block', margin: '1rem 0 0.25rem', fontWeight: '600' }}>
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          style={inputStyle}
          placeholder="Subject of your message"
        />

        <label htmlFor="message" style={{ display: 'block', margin: '1rem 0 0.25rem', fontWeight: '600' }}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          style={{ 
            ...inputStyle, 
            resize: 'vertical', 
            minHeight: '100px' 
          }}
          placeholder="Write your message here..."
        />

        <button
          type="submit"
          style={{
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
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1f1f66')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#272863')}
        >
          Send Message
        </button>
      </form>

      {status && <p style={{ marginTop: '1rem', color: '#444', fontWeight: '600' }}>{status}</p>}
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '0.5rem 0.75rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  outline: 'none',
  boxSizing: 'border-box',
};
