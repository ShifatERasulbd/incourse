import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('Please enter a valid email address.');
      return;
    }

    setStatus('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <div
      style={{
        color: '#000', // fallback text color
        padding: '1.5rem 1rem',
        textAlign: 'center',
        width: '100vw',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      <style>{`
        .newsletter-form {
          display: flex;
          flex-direction: row;
          justify-content: center;
          max-width: 500px;
          margin: 0 auto;
          background: #fff;
          border-radius: 999px;
          overflow: hidden;
          flex-wrap: nowrap;
          padding: 0.2rem;
          box-sizing: border-box;
        }

        .newsletter-input {
          flex: 1 1 200px;
          min-width: 200px;
          padding: 0.8rem 1rem;
          border: 2px solid #1C1E5C;
          outline: none;
          font-size: 1rem;
          width: 100%;
          box-sizing: border-box;
          border-radius: 999px;
        }

        .newsletter-btn {
          background: #c41c13;
          color: #fff;
          border: none;
          padding: 0.8rem 1.5rem;
          cursor: pointer;
          font-weight: bold;
          font-size: 1rem;
          transition: background 0.3s ease;
          flex-shrink: 0;
          width: auto;
        }
        .newsletter-btn:hover {
          background: #a0140e;
        }

        @media (max-width: 600px) {
          .newsletter-form {
            flex-direction: column;
            border-radius: 18px;
            padding: 0.5rem;
            max-width: 90vw;
          }

          .newsletter-input {
            min-width: 100% !important;
            width: 100% !important;
            margin-bottom: 0.5rem;
            border-radius: 12px !important;
            border: 2px solid #1C1E5C !important;
          }

          .newsletter-btn {
            width: 100% !important;
            border-radius: 12px;
            padding: 0.8rem 0;
          }
        }
      `}</style>

      <h2
        style={{
          fontSize: 'clamp(1.5rem, 2vw, 2rem)',
          marginBottom: '0.5rem',
          color: '#1C1E5C', // dark blue title
        }}
      >
        Subscribe to Our Newsletter
      </h2>
      <p
        style={{
          fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
          marginBottom: '1.5rem',
          color: '#444', // dark gray text
        }}
      >
        Get the latest updates, tips, and news straight to your inbox.
      </p>

      <form onSubmit={handleSubscribe} className="newsletter-form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="newsletter-input"
        />
        <button
          type="submit"
          className="newsletter-btn"
          style={{
            background: '#c41c13',
            color: '#fff',
            border: 'none',
            padding: '0.8rem 1.5rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1rem',
            transition: 'background 0.3s ease',
            flexShrink: 0,
            width: '100%',
            minWidth: '120px',
            maxWidth: '200px',
            borderRadius: '12px',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#a0140e')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#c41c13')}
        >
          Subscribe
        </button>
      </form>

      {status && (
        <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#fbbf24' }}>
          {status}
        </p>
      )}
    </div>
  );
}
