import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = ({ siteData }) => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content" style={{ textAlign: 'center' }}>
          <h1 className="hero-title">
            <span className="highlight">404</span> - Page Not Found
          </h1>
          <p className="hero-subtitle">
            Sorry, the page you're looking for doesn't exist on {siteData?.name || 'Happy Student Mentorship'}. 
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
          <div className="hero-buttons">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/resources" className="btn btn-secondary">
              Browse Resources
            </Link>
          </div>
          <div className="hero-stats" style={{ marginTop: '3rem' }}>
            <div className="stat">
              <span className="stat-number">🏠</span>
              <span className="stat-label">Home Page</span>
            </div>
            <div className="stat">
              <span className="stat-number">🗺️</span>
              <span className="stat-label">Roadmap</span>
            </div>
            <div className="stat">
              <span className="stat-number">📚</span>
              <span className="stat-label">Resources</span>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <div className="floating-elements">
              <div className="floating-element">❓</div>
              <div className="floating-element">🔍</div>
              <div className="floating-element">🏠</div>
              <div className="floating-element">🔙</div>
              <div className="floating-element">📍</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;