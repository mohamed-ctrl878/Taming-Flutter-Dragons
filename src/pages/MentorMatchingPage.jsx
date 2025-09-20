import React, { useState, useEffect, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import { useFadeInUp } from '../hooks/useAnimations';
import { useGlobalNotification } from '../contexts/NotificationContext';

const MentorMatchingPage = memo(({ siteData, mentorsData, studentData }) => {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
  const { showNotification } = useGlobalNotification();
  const heroAnimation = useFadeInUp();
  const statusAnimation = useFadeInUp();
      useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, []);
  
  // Memoize transformed mentor data to prevent re-processing
  const transformedMentorsData = useMemo(() => {
    return mentorsData?.map(mentor => ({
      ...mentor,
      available: mentor.availability === 'available',
      expertise: mentor.tags,
      bio: mentor.description,
      studentsCount: mentor.stats?.students || 0,
      rating: mentor.stats?.rating || 0
    })) || [];
  }, [mentorsData]);
  
  // Memoize current mentor data
  const currentMentor = useMemo(() => {
    return studentData?.currentMentor || {
      name: "Dr. Maria Rodriguez",
      title: "Senior Computer Science Professor",
      avatar: "Dr. M",
      matchScore: 95,
      tags: ["AI & Machine Learning", "Web Development", "Career Guidance"],
      status: "active"
    };
  }, [studentData?.currentMentor]);

  useEffect(() => {
    document.title = `Mentor Matching - ${siteData?.name || 'Happy Student Mentorship'}`;
    
    // Show welcome tip after delay
    setTimeout(() => {
      showNotification('💡 Tip: Use the search bar to find mentors by expertise or interests!', 'info');
    }, 3000);
  }, [siteData, showNotification]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };
  
  const goToDashboard = () => {
    showNotification('Redirecting to your dashboard...', 'info');
    setTimeout(() => {
      showNotification('Dashboard loaded! Here you can see all your mentor interactions.', 'success');
    }, 1500);
  };

  const contactMentor = () => {
    showNotification('Opening message composer...', 'info');
    setTimeout(() => {
      showNotification('Message sent to your mentor! They will respond within 24 hours.', 'success');
    }, 1500);
  };
  
  const viewMentorProfile = (mentor) => {
    setSelectedMentor(mentor);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedMentor(null);
  };
  
  const requestMentorMatch = (mentorId) => {
    const mentor = transformedMentorsData.find(m => m.id === mentorId);
    if (mentor) {
      showNotification(`Sending match request to ${mentor.name}...`, 'info');
      setTimeout(() => {
        showNotification(`Match request sent! We'll notify you when ${mentor.name} responds.`, 'success');
        closeModal();
      }, 1500);
    }
  };
  
  const filterMentors = () => {
    if (!searchQuery) return transformedMentorsData;
    
    return transformedMentorsData.filter(mentor => 
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.expertise?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  // if (loading) {
  //   return (
  //     <div className="loading-screen">
  //       <img 
  //         src="src/images/vecteezy_dragon-vector-icon-illustration_24375308.svg" 
  //         alt="Logo" 
  //         className="loading-logo"
  //       />
  //     </div>
  //   );
  // }

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Meet Your Perfect
              <span className="highlight">Mentor Match</span>
            </h1>
            <p className="hero-subtitle">
              Our smart matching system connects you with mentors who understand your goals, 
              share your interests, and are committed to your success.
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary"
                onClick={() => scrollToSection('matching-status')}
              >
                Check Matching Status
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => scrollToSection('how-it-works')}
              >
                How It Works
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-placeholder">
              <div className="floating-elements">
                <div className="floating-element">👩‍🏫</div>
                <div className="floating-element">👨‍💼</div>
                <div className="floating-element">👩‍🔬</div>
                <div className="floating-element">🤝</div>
                <div className="floating-element">💡</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Matching Status */}
      <section id="matching-status" className="about">
        <div className="container">
          <div className="section-header">
            <h2>Your Matching Status</h2>
            <p>Here's where you are in the mentor matching process</p>
          </div>
          <div className="status-card">
            <div className="status-header">
              <div className="status-icon success">✅</div>
              <div className="status-info">
                <h3>Match Found!</h3>
                <p>You've been successfully matched with a mentor</p>
              </div>
              <span className="status-badge success">Active</span>
            </div>
            <div className="current-match">
              <div className="mentor-card featured">
                <div className="mentor-avatar large">
                  <div className="avatar-circle">Dr. M</div>
                </div>
                <div className="mentor-info">
                  <h4>{currentMentor.name}</h4>
                  <p className="mentor-title">{currentMentor.title}</p>
                  <div className="mentor-tags">
                    {currentMentor.tags?.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="match-score">
                    <span className="score-label">Match Score:</span>
                    <div className="score-bar">
                      <div className="score-fill" style={{ width: `${currentMentor.matchScore || 95}%` }}></div>
                    </div>
                    <span className="score-value">{currentMentor.matchScore || 95}%</span>
                  </div>
                </div>
                <div className="mentor-actions">
                  <button className="btn btn-primary" onClick={goToDashboard}>
                    View in Dashboard
                  </button>
                  <button className="btn btn-secondary" onClick={contactMentor}>
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Matching Works */}
      <section id="how-it-works" className="program">
        <div className="container">
          <div className="section-header">
            <h2>How Our Matching System Works</h2>
            <p>We use advanced algorithms combined with human insight to find your perfect mentor</p>
          </div>
          <div className="program-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Analyze Your Profile</h3>
                <p>We review your academic interests, goals, learning style, and personality traits</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Smart Algorithm</h3>
                <p>Our AI matches you with mentors based on expertise, availability, and compatibility</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Human Review</h3>
                <p>Our team manually reviews each match to ensure the best possible pairing</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Perfect Match</h3>
                <p>You get connected with a mentor who's excited to help you succeed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Available Mentors */}
      <section className="trips">
        <div className="container">
          <div className="section-header">
            <h2>Meet Our Mentors</h2>
            <p>Get to know some of the amazing mentors in our community</p>
            
            {/* Search Bar */}
            <div className="mentor-search" style={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <div className="search-bar" style={{
                display: 'flex',
                gap: '1rem',
                maxWidth: '500px',
                width: '100%'
              }}>
                <input
                  type="text"
                  placeholder="Search mentors by name, expertise, or interests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.75rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer'
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
          <div className="mentors-grid">
            {filterMentors().map((mentor, index) => (
              <div 
                key={mentor.id || index} 
                className="mentor-card"
                onClick={() => viewMentorProfile(mentor)}
                style={{ cursor: 'pointer' }}
              >
                <div className="mentor-avatar">
                  <div className="avatar-circle">
                    {mentor.avatar || mentor.name?.charAt(0) || 'M'}
                  </div>
                  <div className={`availability ${mentor.available ? 'available' : 'busy'}`}>
                    {mentor.available ? 'Available' : 'Busy'}
                  </div>
                </div>
                <div className="mentor-details">
                  <h4>{mentor.name}</h4>
                  <p className="mentor-title">{mentor.title}</p>
                  <p className="mentor-experience">{mentor.experience} experience</p>
                  <div className="mentor-tags">
                    {mentor.expertise?.slice(0, 3).map((skill, skillIndex) => (
                      <span key={skillIndex} className="tag">{skill}</span>
                    ))}
                  </div>
                  <p className="mentor-description">{mentor.bio}</p>
                  <div className="match-score" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span className="score-label">Match:</span>
                    <div className="score-bar" style={{
                      flex: 1,
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div 
                        className="score-fill" 
                        style={{
                          width: `${mentor.matchScore}%`,
                          height: '100%',
                          background: mentor.matchScore > 90 ? '#10b981' : mentor.matchScore > 80 ? '#f59e0b' : '#ef4444',
                          transition: 'width 0.3s ease'
                        }}
                      ></div>
                    </div>
                    <span className="score-value">{mentor.matchScore}%</span>
                  </div>
                  <div className="mentor-stats">
                    <div className="stat-item">
                      <span className="stat-number">{mentor.studentsCount}</span>
                      <span className="stat-label">Students</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">{mentor.rating}</span>
                      <span className="stat-label">Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Mentor Profile Modal */}
      {modalOpen && selectedMentor && (
        <div className="mentor-modal" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'modalFadeIn 0.3s ease-out'
        }}>
          <div 
            className="modal-overlay" 
            onClick={closeModal}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)'
            }}
          ></div>
          <div className="modal-content" style={{
            background: 'white',
            borderRadius: '1rem',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative',
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
            animation: 'modalSlideIn 0.3s ease-out'
          }}>
            <div className="modal-header" style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '2rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <h2 style={{ margin: 0, color: '#111827' }}>{selectedMentor.name}</h2>
              <button 
                className="modal-close" 
                onClick={closeModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: 0,
                  width: '2rem',
                  height: '2rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%'
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body" style={{ padding: '2rem' }}>
              <div className="mentor-profile" style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'flex-start',
                marginBottom: '2rem'
              }}>
                <div className="mentor-avatar large">
                  <div className="avatar-circle" style={{
                    width: '80px',
                    height: '80px',
                    fontSize: '2rem'
                  }}>
                    {selectedMentor.avatar}
                  </div>
                  <div className={`availability ${selectedMentor.available ? 'available' : 'busy'}`}>
                    {selectedMentor.available ? 'Available' : 'Busy'}
                  </div>
                </div>
                <div className="mentor-info-detailed">
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#059669' }}>{selectedMentor.title}</h3>
                  <p className="mentor-experience" style={{ margin: '0 0 1rem 0', color: '#6b7280' }}>
                    {selectedMentor.experience} experience
                  </p>
                  <div className="match-score" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span className="score-label">Match Score:</span>
                    <div className="score-bar" style={{
                      flex: 1,
                      height: '12px',
                      background: '#e5e7eb',
                      borderRadius: '6px',
                      overflow: 'hidden'
                    }}>
                      <div 
                        className="score-fill" 
                        style={{
                          width: `${selectedMentor.matchScore}%`,
                          height: '100%',
                          background: selectedMentor.matchScore > 90 ? '#10b981' : selectedMentor.matchScore > 80 ? '#f59e0b' : '#ef4444'
                        }}
                      ></div>
                    </div>
                    <span className="score-value" style={{ fontWeight: 'bold' }}>
                      {selectedMentor.matchScore}%
                    </span>
                  </div>
                  <div className="mentor-tags" style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    marginBottom: '1rem'
                  }}>
                    {selectedMentor.expertise?.map((tag, index) => (
                      <span key={index} className="tag" style={{
                        background: '#ddd6fe',
                        color: '#5b21b6',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.875rem'
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="mentor-description" style={{ 
                    lineHeight: '1.6',
                    color: '#374151',
                    marginBottom: '1.5rem'
                  }}>
                    {selectedMentor.bio}
                  </p>
                  <div className="mentor-stats" style={{
                    display: 'flex',
                    gap: '2rem'
                  }}>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                      <span className="stat-number" style={{
                        display: 'block',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#059669'
                      }}>
                        {selectedMentor.studentsCount}
                      </span>
                      <span className="stat-label" style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Students Mentored
                      </span>
                    </div>
                    <div className="stat-item" style={{ textAlign: 'center' }}>
                      <span className="stat-number" style={{
                        display: 'block',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: '#059669'
                      }}>
                        {selectedMentor.rating}
                      </span>
                      <span className="stat-label" style={{
                        fontSize: '0.875rem',
                        color: '#6b7280'
                      }}>
                        Rating
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions" style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
                flexWrap: 'wrap'
              }}>
                <button 
                  className="btn btn-primary"
                  onClick={() => requestMentorMatch(selectedMentor.id)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Request Match
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    showNotification(`Learning more about ${selectedMentor.name}...`, 'info');
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});

export default MentorMatchingPage;