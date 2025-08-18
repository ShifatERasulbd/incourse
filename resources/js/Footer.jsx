import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Footer() {
 const [socialLinks, setSocialLinks] = useState({
  facebook: '',
  twitter: '',
  linkedin: '',
  instagram: '',
 })
 useEffect(() => {
  const fetchSocialLinks = async () => {
   try {
    const response = await axios.get('/api/frontend/admin/settings/public');
    if (response.data.success) {
     const settings = response.data.data;
     setSocialLinks({
      facebook: settings.find(s => s.key === 'facebook_url')?.value || '',
      twitter: settings.find(s => s.key === 'twitter_url')?.value || '',
      linkedin: settings.find(s => s.key === 'linkedin_url')?.value || '',
      instagram: settings.find(s => s.key === 'instagram_url')?.value || '',
     });
    }
   } catch (error) {
    console.error('Failed to fetch social links:', error);
   }
  };

  fetchSocialLinks(setSocialLinks);
 }, []);  
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
            <li><a href="/#!" style={styles.link}>Careers</a></li>
            <li><a href="/news" style={styles.link}>News</a></li>
            <li><a href="/Contact-Us" style={styles.link}>Contact</a></li>
          </ul>
        </div>

        {/* Column 2 */}
  <div className="footer-column" style={styles.column}>
          <h4 style={styles.heading}>Support</h4>
          <ul style={styles.list}>
            <li><a href="#!" style={styles.link}>Help Center</a></li>
            <li><a href="#!" style={styles.link}>FAQ</a></li>
            <li><a href="#!" style={styles.link}>Terms of Service</a></li>
            <li><a href="#!" style={styles.link}>Privacy Policy</a></li>
          </ul>
        </div>

        {/* Column 3 */}
  <div className="footer-column" style={styles.column}>
          <h4 style={styles.heading}>Follow Us</h4>
          <ul style={styles.list}>
            {socialLinks.facebook && (
              <li>
                <a href={socialLinks.facebook} style={styles.link} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            )}
           {socialLinks.twitter && (
            <li>
              <a href={socialLinks.twitter} style={styles.link} target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
          )}
            {socialLinks.instagram && (
                <li>
                  <a href={socialLinks.instagram} style={styles.link} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              )}
                        {socialLinks.linkedin && (
              <li>
                <a href={socialLinks.linkedin} style={styles.link} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
              </li>
            )}
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