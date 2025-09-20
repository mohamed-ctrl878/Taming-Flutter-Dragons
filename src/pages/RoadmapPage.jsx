import React, { useEffect } from "react";
import { useGlobalNotification } from "../contexts/NotificationContext";

const RoadmapPage = ({
  siteData,
  roadmapData,
  studentData,
  milestonesData,
  achievementsData,
}) => {
  const { showNotification } = useGlobalNotification();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  useEffect(() => {
    document.title = `${roadmapData?.title || "Learning Roadmap"} - ${
      siteData?.name || "Happy Student Mentorship"
    }`;
  }, [siteData, roadmapData]);

  const getPhaseStatusText = (status) => {
    switch (status) {
      case "completed":
        return "✅ Completed";
      case "current":
        return "🔄 In Progress";
      case "upcoming":
        return "⏳ Coming Soon";
      default:
        return status;
    }
  };

  const handleMilestoneClick = (milestone) => {
    if (milestone.completed) {
      showNotification(
        `✅ ${milestone.title} - Well done! ${milestone.description}`,
        "success"
      );
    } else {
      showNotification(
        `⏳ ${milestone.title} - ${milestone.description}. Keep working towards this milestone!`,
        "info"
      );
    }
  };

  const handlePhaseAction = (action) => {
    switch (action) {
      case "continue":
        showNotification("Opening current phase activities...", "info");
        break;
      case "schedule":
        showNotification("Scheduling mentor check-in...", "info");
        break;
      case "project":
        showNotification("🎯 Opening your project workspace...", "info");
        setTimeout(() => {
          showNotification(
            "Project workspace loaded! Your mentor has left you some starting tips.",
            "success"
          );
        }, 1500);
        break;
      case "study-group":
        showNotification("👥 Connecting you to study group...", "info");
        setTimeout(() => {
          showNotification(
            "Welcome to the Growth Phase study group! 3 other students are currently online.",
            "success"
          );
        }, 1500);
        break;
      default:
        showNotification("Action coming soon!", "info");
    }
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
      <section
        className="hero"
        style={{ padding: "6rem 0 3rem", minHeight: "auto" }}
      >
        <div className="container">
          <div style={{ textAlign: "center" }}>
            <h1
              className="hero-title"
              style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
            >
              Your Learning <span className="highlight">Roadmap</span>
            </h1>
            <p className="hero-subtitle" style={{ marginBottom: "2rem" }}>
              {roadmapData?.subtitle ||
                "Track your progress through our structured mentorship program"}
            </p>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      {/* <section style={{ padding: '3rem 0', background: 'var(--gray-50)' }}>
        <div className="container">
          <div className="progress-overview">
            <div className="overall-progress">
              <h3>Overall Progress</h3>
              <div className="progress-bar large">
                <div className="progress-fill" style={{ width: '60%' }}></div>
              </div>
              <p className="progress-text">60% Complete - You're in the Growth Phase!</p>
            </div>
            <div className="phase-stats">
              <div className="phase-stat completed">
                <div className="phase-icon">✅</div>
                <div className="phase-info">
                  <h4>Foundation</h4>
                  <p>Completed</p>
                </div>
              </div>
              <div className="phase-stat current">
                <div className="phase-icon">🔄</div>
                <div className="phase-info">
                  <h4>Growth</h4>
                  <p>In Progress</p>
                </div>
              </div>
              <div className="phase-stat upcoming">
                <div className="phase-icon">⏳</div>
                <div className="phase-info">
                  <h4>Mastery</h4>
                  <p>Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Roadmap Phases */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="roadmap-phases">
            {roadmapData?.phases?.map((phase, index) => (
              <div
                key={phase.id}
                className={`roadmap-phase ${phase.status} fade-in-up`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="phase-header">
                  <div className="phase-number">{phase.id}</div>
                  <div className="phase-info">
                    <h3>{phase.title}</h3>
                    <p className="phase-duration">{phase.duration}</p>
                    <p className="phase-description">{phase.description}</p>
                    <div className={`phase-status-badge ${phase.status}`}>
                      {getPhaseStatusText(phase.status)}
                    </div>
                  </div>
                </div>
                <div className="milestones-container">
                  <h4>Milestones</h4>
                  <div className="milestones-list">
                    {phase.milestones?.map((milestone) => (
                      <div
                        key={milestone.id}
                        className={`milestone-item ${
                          milestone.completed ? "completed" : "pending"
                        }`}
                        onClick={() => handleMilestoneClick(milestone)}
                        style={{ cursor: "pointer" }}
                      >
                        <div className="milestone-icon">
                          {milestone.completed ? "✅" : "⏳"}
                        </div>
                        <div className="milestone-content">
                          <h5>{milestone.title}</h5>
                          <p>{milestone.description}</p>
                        </div>
                        <div
                          className={`milestone-badge ${
                            milestone.completed ? "" : "pending"
                          }`}
                        >
                          {milestone.completed ? "Complete" : "Pending"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {phase.status === "current" && (
                  <div className="phase-actions">
                    <button
                      className="btn btn-primary"
                      onClick={() => handlePhaseAction("continue")}
                    >
                      Continue Learning
                    </button>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handlePhaseAction("schedule")}
                    >
                      Schedule Check-in
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section style={{ padding: "4rem 0", background: "var(--gray-50)" }}>
        <div className="container">
          <div className="section-header">
            <h2>What's Next?</h2>
            <p>Here are your immediate next steps to continue progressing</p>
          </div>
          <div className="next-steps-grid">
            <div className="next-step-card priority">
              <div className="step-icon">🎯</div>
              <h3>Complete First Project</h3>
              <p>Work on your guided project with mentor feedback</p>
              <div className="step-actions">
                <button
                  className="btn btn-primary"
                  onClick={() => handlePhaseAction("project")}
                >
                  Start Project
                </button>
              </div>
            </div>
            <div className="next-step-card">
              <div className="step-icon">👥</div>
              <h3>Join Study Group</h3>
              <p>Connect with other students in your learning phase</p>
              <div className="step-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePhaseAction("study-group")}
                >
                  Join Group
                </button>
              </div>
            </div>
            <div className="next-step-card">
              <div className="step-icon">📅</div>
              <h3>Schedule Check-in</h3>
              <p>Book your next mentoring session</p>
              <div className="step-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handlePhaseAction("schedule")}
                >
                  Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Gallery */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div className="section-header">
            <h2>Your Achievements</h2>
            <p>Celebrate your milestones and progress</p>
          </div>
          <div className="achievements-gallery">
            <div className="achievements-grid">
              {achievementsData?.map((achievement) => (
                <div
                  key={achievement.id}
                  className="achievement-card"
                  onClick={() =>
                    window.showNotification?.(
                      `🎉 ${achievement.title}: ${achievement.description}`,
                      "success"
                    )
                  }
                  style={{ cursor: "pointer" }}
                >
                  <div className="achievement-icon-large">
                    {achievement.icon}
                  </div>
                  <h4>{achievement.title}</h4>
                  <p>{achievement.description}</p>
                  <div className="achievement-date">
                    Earned {achievement.date}
                  </div>
                </div>
              ))}

              {/* Locked achievements */}
              <div className="achievement-card locked">
                <div className="achievement-icon-large">🔒</div>
                <h4>Project Master</h4>
                <p>Complete 3 projects with excellent grades</p>
                <div className="achievement-progress">
                  2/3 projects completed
                </div>
              </div>

              <div className="achievement-card locked">
                <div className="achievement-icon-large">🔒</div>
                <h4>Mentor Helper</h4>
                <p>Help 5 junior students with their questions</p>
                <div className="achievement-progress">Not yet started</div>
              </div>

              <div className="achievement-card locked">
                <div className="achievement-icon-large">🔒</div>
                <h4>Trip Explorer</h4>
                <p>Complete your first educational trip</p>
                <div className="achievement-progress">
                  Qualification in progress
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoadmapPage;
