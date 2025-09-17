import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Footer = memo(({ siteData, contactData }) => {

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/dragon-icon.svg" alt="Dragons Growth Journey" className="footer-logo-icon" />
              <span>{siteData?.name || 'Dragons Growth Journey'}</span>
            </div>
            <p>{siteData?.description || 'Empowering students through personalized mentorship and curated learning resources.'}</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/roadmap">Roadmap</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/mentor-matching">Mentors</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Student Resources</h4>
            <ul>
              <li><Link to="/roadmap">Learning Roadmap</Link></li>
              <li><Link to="/resources">Resources</Link></li>
              <li><Link to="/mentor-matching">Find Mentors</Link></li>
              <li><Link to="/#trips">Trip Rewards</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="footer-contact">
              <p>📧 {contactData?.email || 'apply@happystudentmentorship.org'}</p>
              <p>📱 {contactData?.phone || '+1 (555) 123-MENTOR'}</p>
              <div className="footer-social">
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '1rem' }}>
                  Follow our journey on social media for updates and success stories!
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {siteData?.name || 'Dragons Growth Journey'}. All rights reserved. Made with ❤️ for students.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
