import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./styles/main.css";

import HomePage from "./pages/HomePage";
import MentorMatchingPage from "./pages/MentorMatchingPage";
import RoadmapPage from "./pages/RoadmapPage";
import ResourcesPage from "./pages/ResourcesPage";
import NotFoundPage from "./pages/NotFoundPage";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import LoadingScreen from "./components/LoadingScreen";
import { NotificationProvider } from "./contexts/NotificationContext";
import constantsData from "./config/constants.json";

function App() {
  const [appData, setAppData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load data directly from imported JSON
    try {
      console.log("App data loaded:", constantsData);
      setAppData(constantsData);
      document.title = `${constantsData.site?.name ?? "Site"} - ${constantsData.site?.description ?? ""}`;
      setLoading(false);
    } catch (err) {
      console.error("Error loading app data:", err);
      setError("Failed to load application data");
      setLoading(false);
    }
  }, []);

  const navigationProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      navigationData: appData?.navigation ?? [],
    }),
    [appData]
  );

  const footerProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      contactData: appData?.contact ?? {},
    }),
    [appData]
  );

  const homePageProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      studentData: appData?.student ?? [],
      tripsData: appData?.trips ?? [],
      testimonialsData: appData?.testimonials ?? [],
      contactData: appData?.contact ?? {},
      formOptions: appData?.formOptions ?? {},
    }),
    [appData]
  );

  const mentorPageProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      mentorsData: appData?.mentors ?? [],
      studentData: appData?.student ?? [],
    }),
    [appData]
  );

  const roadmapPageProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      roadmapData: appData?.roadmap ?? [],
      studentData: appData?.student ?? [],
      milestonesData: appData?.milestones ?? [],
      achievementsData: appData?.achievements ?? [],
    }),
    [appData]
  );

  const resourcesPageProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
      resourcesData: appData?.resources ?? [],
    }),
    [appData]
  );

  const notFoundPageProps = useMemo(
    () => ({
      siteData: appData?.site ?? {},
    }),
    [appData]
  );

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ color: "#ef4444", marginBottom: "1rem" }}>Oops! Something went wrong</h1>
        <p style={{ color: "#6b7280", marginBottom: "2rem" }}>{error}</p>
        <button onClick={() => window.location.reload()} style={{ padding: "0.75rem 1.5rem", backgroundColor: "#059669", color: "white", border: "none", borderRadius: "0.5rem", cursor: "pointer", fontSize: "1rem" }}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <NotificationProvider>
      <Router>
        <div className="app">
          <Navigation {...navigationProps} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage {...homePageProps} />} />
              <Route path="/mentor-matching" element={<MentorMatchingPage {...mentorPageProps} />} />
              <Route path="/roadmap" element={<RoadmapPage {...roadmapPageProps} />} />
              <Route path="/resources" element={<ResourcesPage {...resourcesPageProps} />} />
              <Route path="/repos" element={<ResourcesPage {...resourcesPageProps} />} />
              <Route path="*" element={<NotFoundPage {...notFoundPageProps} />} />
            </Routes>
          </main>
          <Footer {...footerProps} />
          <Notification />
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
