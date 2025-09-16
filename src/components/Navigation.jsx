import React, { useState, useMemo, memo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useMobileNavigation, useScrollEffect } from "../hooks/useAnimations";
import { HashLink } from "react-router-hash-link";


const Navigation = memo(({ siteData, navigationData }) => {
  const [navBackground, setNavBackground] = useState(false);
  const location = useLocation();
  const { isOpen, toggle, close } = useMobileNavigation();

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('nav-open');
    } else {
      document.body.classList.remove('nav-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('nav-open');
    };
  }, [isOpen]);

  // Memoize navigation data transformation to prevent re-processing
  const cleanNavigation = useMemo(() => {
    const transformedNavigation = navigationData?.items?.map((item) => ({
      id: item.id,
      text: item.label,
      href: item.href.replace(".html", "").replace("index", "/"),
      icon: item.icon,
    })) || [
      { id: "home", text: "Home", href: "/", icon: "🏠" },
      { id: "roadmap", text: "Roadmap", href: "/roadmap", icon: "🗺️" },
      { id: "mentors", text: "Mentors", href: "/mentor-matching", icon: "👥" },
      { id: "resources", text: "Resources", href: "/resources", icon: "📚" },
    ];

    return transformedNavigation.map((item) => ({
      ...item,
      href: item.href
        .replace("mentor-matching.html", "/mentor-matching")
        .replace("roadmap.html", "/roadmap")
        .replace("repos.html", "/resources")
        .replace("#trips", "#trips")
        .replace("#testimonials", "#testimonials"),
    }));
  }, [navigationData]);

  // Handle scroll effect for navbar background - memoized to prevent re-renders
  const handleScroll = useMemo(() => {
    return () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
      } else {
        setNavBackground(false);
      }
    };
  }, []);

  useScrollEffect(handleScroll, []);

  // Determine if a navigation item is active
  const isActive = (href) => {
    return location.pathname === href;
  };

  return (
    <nav
      className="navbar"
      style={{
        backgroundColor: navBackground
          ? "rgba(255, 255, 255, 0.95)"
          : "rgba(255, 255, 255, 1)",
        backdropFilter: "blur(10px)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="nav-container">
        <div className="nav-logo">
          <Link to="/" onClick={close}>
            <img
              src="/dragon-icon.svg"
              alt="Dragons Growth Journey"
              className="nav-logo-icon"
            />
          </Link>
        </div>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          {cleanNavigation.map((item) => {
            const isHash = item.href.includes("#");

            return isHash ? (
              <HashLink
                key={item.id}
                smooth
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                onClick={close}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.text}
              </HashLink>
            ) : (
              <Link
                key={item.id}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? "active" : ""}`}
                onClick={close}
              >
                <span className="nav-icon">{item.icon}</span>
                {item.text}
              </Link>
            );
          })}
        </div>

        <div
          className={`nav-toggle hamburger ${isOpen ? "active" : ""}`}
          onClick={toggle}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
});

export default Navigation;
