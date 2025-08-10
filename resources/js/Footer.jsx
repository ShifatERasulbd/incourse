import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <style>{`
        @media (max-width: 900px) {
          .footer-container {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 0 1rem !important;
          }
          .footer-column {
            margin: 10px 0 !important;
            min-width: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>
      <div className="footer-container" style={styles.container}>
        {/* Column 1 */}
  <div className="footer-column" style={styles.column}>
          <h4 style={styles.heading}>Company</h4>
          <ul style={styles.list}>
            <li><a href="/about" style={styles.link}>About Us</a></li>
            <li><a href="/careers" style={styles.link}>Careers</a></li>
            <li><a href="/blog" style={styles.link}>Blog</a></li>
            <li><a href="/contact" style={styles.link}>Contact</a></li>
          </ul>
        </div>

        {/* Column 2 */}
  <div className="footer-column" style={styles.column}>
          <h4 style={styles.heading}>Support</h4>
          <ul style={styles.list}>
            <li><a href="/help-center" style={styles.link}>Help Center</a></li>
            <li><a href="/faq" style={styles.link}>FAQ</a></li>
            <li><a href="/terms" style={styles.link}>Terms of Service</a></li>
            <li><a href="/privacy" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3 */}
  <div className="footer-column" style={styles.column}>
          <h4 style={styles.heading}>Follow Us</h4>
          <ul style={styles.list}>
            <li><a href="https://facebook.com" style={styles.link} target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" style={styles.link} target="_blank" rel="noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" style={styles.link} target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://linkedin.com" style={styles.link} target="_blank" rel="noreferrer">LinkedIn</a></li>
          </ul>
        </div>
      </div>
      <div style={styles.copyright}>
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    width: '100%',             // full width of viewport
    backgroundColor: '#1C1E5C',
    color: '#eee',
    padding: '40px 0 20px', // removed left-side padding
    fontFamily: 'Arial, sans-serif',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    paddingLeft: 0,
    paddingRight: 0,
  },
  column: {
    flex: '1 1 200px',
    margin: '10px',
    minWidth: '150px',
  },
  heading: {
    fontSize: '18px',
    marginBottom: '12px',
    borderBottom: '2px solid #555',
    paddingBottom: '6px',
  },
  list: {
    listStyle: 'none',
    paddingLeft: 0,
  },
  link: {
    color: '#ccc',
    textDecoration: 'none',
    display: 'block',
    marginBottom: '8px',
    transition: 'color 0.3s',
  },
  copyright: {
    textAlign: 'center',
    marginTop: '30px',
    fontSize: '14px',
    color: '#bbb',
  },
};
