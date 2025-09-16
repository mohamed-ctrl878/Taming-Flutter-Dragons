import React, { useEffect, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { useFadeInUp, useCounter } from "../hooks/useAnimations";
import { useGlobalNotification } from "../contexts/NotificationContext";

const HomePage = memo(
  ({
    siteData,
    studentData,
    tripsData,
    testimonialsData,
    contactData,
    formOptions,
  }) => {
    const { showNotification } = useGlobalNotification();

    // Animation hooks for various elements
    const heroAnimation = useFadeInUp();
    const aboutAnimation = useFadeInUp();

    // Step animations - create once and store in ref to prevent recreation
    const stepAnimation1 = useFadeInUp();
    const stepAnimation2 = useFadeInUp();
    const stepAnimation3 = useFadeInUp();
    const stepAnimation4 = useFadeInUp();

    // Memoize step animations array to prevent recreating on each render
    const stepAnimations = useMemo(
      () => [stepAnimation1, stepAnimation2, stepAnimation3, stepAnimation4],
      [stepAnimation1, stepAnimation2, stepAnimation3, stepAnimation4]
    );

    // Counter hooks for stats
    const studentsCounter = useCounter("500+", 2000);
    const tripsCounter = useCounter("50+", 2000);
    const freeCounter = useCounter("100%", 2000);

    // Memoize welcome message to prevent recreation
    const welcomeMessage = useMemo(() => {
      return studentData?.name
        ? `Welcome back, ${studentData.name}! 🌟 Ready to continue your mentorship journey?`
        : "💡 Tip: Explore all sections to make the most of your mentorship journey!";
    }, [studentData?.name]);

    useEffect(() => {
      // Start counter animations after a delay - run once on mount
      const animationTimer = setTimeout(() => {
        studentsCounter.startAnimation();
        tripsCounter.startAnimation();
        freeCounter.startAnimation();
      }, 1000);

      // Show welcome notification - run once on mount
      const notificationTimer = setTimeout(() => {
        const message = studentData?.name
          ? `Welcome back, ${studentData.name}! 🌟 Ready to continue your mentorship journey?`
          : "💡 Tip: Explore all sections to make the most of your mentorship journey!";
        showNotification(message, "info");
      }, 3000);

      // Cleanup timeouts
      return () => {
        clearTimeout(animationTimer);
        clearTimeout(notificationTimer);
      };
      // Run only once on mount, not on every prop change
    }, []); // Empty dependency array

    // Memoize scroll function
    const scrollToSection = useCallback((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offsetTop = element.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    }, []);

    // Memoize messages array and click handler
    const encouragementMessages = useMemo(
      () => [
        "Keep learning! 📚",
        "You're amazing! ⭐",
        "Dream big! 🚀",
        "Stay curious! 🔍",
        "You got this! 💪",
      ],
      []
    );

    const handleFloatingElementClick = useCallback(() => {
      const randomMessage =
        encouragementMessages[
          Math.floor(Math.random() * encouragementMessages.length)
        ];
      showNotification(randomMessage, "success");
    }, [encouragementMessages, showNotification]);

    // Memoize hero subtitle to prevent recalculation
    const heroSubtitle = useMemo(() => {
      return studentData?.name
        ? `Great to see you again! You've completed ${
            studentData.sessions || 0
          } sessions and achieved ${studentData.progress || 0}% of your goals.`
        : "You're already part of our amazing community! Continue your path to success with personalized mentorship and get ready for your educational trip rewards.";
    }, [studentData?.name, studentData?.sessions, studentData?.progress]);

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
        <section id="home" className="hero">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                {studentData?.name ? (
                  <>
                    Welcome Back,{" "}
                    <span className="highlight">{studentData.name}!</span>
                  </>
                ) : (
                  <>
                    Welcome Back to Your{" "}
                    <span className="highlight">Mentorship Journey</span>
                  </>
                )}
              </h1>
              <p className="hero-subtitle">{heroSubtitle}</p>
              <div className="hero-buttons">
                <Link to="/roadmap" className="btn btn-primary">
                  View My Progress
                </Link>
                <button
                  className="btn btn-secondary"
                  onClick={() => scrollToSection("next-steps")}
                >
                  What's Next?
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">{studentsCounter.count}</span>
                  <span className="stat-label">Students Mentored</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{tripsCounter.count}</span>
                  <span className="stat-label">Educational Trips</span>
                </div>
                <div className="stat">
                  <span className="stat-number">{freeCounter.count}</span>
                  <span className="stat-label">Free Program</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-image-placeholder">
                <div className="floating-elements">
                  <div
                    className="floating-element"
                    onClick={handleFloatingElementClick}
                  >
                    📚
                  </div>
                  <div
                    className="floating-element"
                    onClick={handleFloatingElementClick}
                  >
                    🎓
                  </div>
                  <div
                    className="floating-element"
                    onClick={handleFloatingElementClick}
                  >
                    ✈️
                  </div>
                  <div
                    className="floating-element"
                    onClick={handleFloatingElementClick}
                  >
                    🌟
                  </div>
                  <div
                    className="floating-element"
                    onClick={handleFloatingElementClick}
                  >
                    🎯
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className={`about ${aboutAnimation.className}`}
          ref={aboutAnimation.ref}
        >
          <div className="container">
            <div className="section-header">
              <h2>Making Dreams Come True</h2>
              <p>
                {siteData?.description ||
                  "We believe that every hard-working student deserves recognition and support"}
              </p>
            </div>
            <div className="about-content">
              <div className="about-text">
                <h3>Our Mission</h3>
                <p>
                  {siteData?.name || "Happy Student Mentorship"} is dedicated to
                  recognizing and rewarding students who demonstrate exceptional
                  dedication to their studies. We provide completely free
                  mentorship services and organize educational trips as a way to
                  celebrate academic achievements and foster personal growth.
                </p>
                <div className="mission-points">
                  <div className="mission-point">
                    <span className="icon">🎯</span>
                    <div>
                      <h4>Personalized Mentorship</h4>
                      <p>
                        One-on-one guidance tailored to your academic and career
                        goals
                      </p>
                    </div>
                  </div>
                  <div className="mission-point">
                    <span className="icon">🌍</span>
                    <div>
                      <h4>Educational Adventures</h4>
                      <p>
                        Reward trips that combine learning with unforgettable
                        experiences
                      </p>
                    </div>
                  </div>
                  <div className="mission-point">
                    <span className="icon">💝</span>
                    <div>
                      <h4>Completely Free</h4>
                      <p>
                        No hidden costs - our program is 100% free for
                        qualifying students
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="about-image">
                <div className="about-image-placeholder">
                  <p>Happy students on an educational trip</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Program Section */}
        <section id="program" className="program">
          <div className="container">
            <div className="section-header" id="next-steps">
              <h2>Your Next Steps</h2>
              <p>Here's what to do now that you're subscribed</p>
            </div>
            <div className="program-steps">
              <div
                className={`step ${stepAnimations[0].className}`}
                ref={stepAnimations[0].ref}
              >
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Check Progress</h3>
                  <p>
                    View your progress, mentor assignment status, and upcoming
                    milestones
                  </p>
                  <Link to="/roadmap" className="btn btn-outline">
                    View Roadmap
                  </Link>
                </div>
              </div>
              <div
                className={`step ${stepAnimations[1].className}`}
                ref={stepAnimations[1].ref}
              >
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Meet Your Mentor</h3>
                  <p>
                    Schedule your first meeting with your assigned mentor and
                    set goals
                  </p>
                  <Link to="/mentor-matching" className="btn btn-outline">
                    Find Mentor
                  </Link>
                </div>
              </div>
              <div
                className={`step ${stepAnimations[2].className}`}
                ref={stepAnimations[2].ref}
              >
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Start Learning</h3>
                  <p>
                    Begin your personalized learning journey and track your
                    achievements
                  </p>
                  <Link to="/resources" className="btn btn-outline">
                    Browse Resources
                  </Link>
                </div>
              </div>
              <div
                className={`step ${stepAnimations[3].className}`}
                ref={stepAnimations[3].ref}
              >
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Earn Your Trip</h3>
                  <p>
                    Complete milestones to qualify for your educational trip
                    reward
                  </p>
                  <button
                    className="btn btn-outline"
                    onClick={() => scrollToSection("trips")}
                  >
                    View Trips
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trips Section */}
        <section id="trips" className="trips">
          <div className="container">
            <div className="section-header">
              <h2>Educational Trip Rewards</h2>
              <p>
                Celebrate your hard work with amazing educational adventures
              </p>
            </div>
            <div className="trips-grid">
              {tripsData?.map((trip) => (
                <div key={trip.id} className="trip-card">
                  <div className="trip-image">
                    <div className="trip-image-placeholder">{trip.icon}</div>
                  </div>
                  <div className="trip-content">
                    <h3>{trip.title}</h3>
                    <p>{trip.description}</p>
                    <div className="trip-features">
                      {trip.features?.map((feature, index) => (
                        <span key={index} className="feature">
                          {feature.icon} {feature.text}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="testimonials">
          <div className="container">
            <div className="section-header">
              <h2>Student Success Stories</h2>
              <p>
                Hear from students who've transformed their lives through our
                program
              </p>
            </div>
            <div className="testimonials-grid">
              {testimonialsData?.map((testimonial) => (
                <div key={testimonial.id} className="testimonial-card">
                  <div className="testimonial-content">
                    <p>"{testimonial.content}"</p>
                  </div>
                  <div className="testimonial-author">
                    <div className="author-avatar">
                      {testimonial.author.avatar}
                    </div>
                    <div className="author-info">
                      <h4>{testimonial.author.name}</h4>
                      <span>{testimonial.author.title}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  },
  (prevProps, nextProps) => {
    // Custom comparator to prevent unnecessary re-renders
    return (
      prevProps.siteData?.name === nextProps.siteData?.name &&
      prevProps.studentData?.name === nextProps.studentData?.name &&
      prevProps.studentData?.sessions === nextProps.studentData?.sessions &&
      prevProps.studentData?.progress === nextProps.studentData?.progress &&
      prevProps.tripsData?.length === nextProps.tripsData?.length &&
      prevProps.testimonialsData?.length === nextProps.testimonialsData?.length
    );
  }
);

export default HomePage;
