import React, { useState, useEffect } from 'react';
import { useGlobalNotification } from '../contexts/NotificationContext';

const ResourcesPage = ({ siteData, resourcesData }) => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { showNotification } = useGlobalNotification();
  
  useEffect(() => {
    document.title = `${resourcesData?.title || 'Resources'} - ${siteData?.name || 'Happy Student Mentorship'}`;
  }, [siteData, resourcesData]);

  const getIconForType = (type) => {
    switch (type) {
      case 'external': return 'fas fa-external-link-alt';
      case 'download': return 'fas fa-download';
      case 'internal': return 'fas fa-link';
      default: return 'fas fa-file';
    }
  };

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
  
  const switchTab = (filter) => {
    setCurrentFilter(filter);
    showNotification(`Showing ${filter === 'all' ? 'all' : filter} resources`, 'info');
  };

  const handleResourceClick = (resource) => {
    showNotification(`Opening ${resource.title}...`, 'info');
  };

  const addToBookmarks = (title) => {
    showNotification(`📖 ${title} added to bookmarks!`, 'success');
  };

  // Get all resources from categories
  const getAllResources = () => {
    if (!resourcesData?.categories) return [];
    
    return resourcesData.categories.flatMap(category => 
      category.items.map(item => ({
        ...item,
        category: category.title,
        icon: getIconForType(item.type),
        difficulty: 'beginner',
        tags: [category.id, item.type],
        featured: false
      }))
    );
  };

  const filteredResources = getAllResources().filter(resource => {
    if (currentFilter === 'all') return true;
    return resource.tags.includes(currentFilter) || 
           resource.category.toLowerCase().includes(currentFilter);
  });

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
      <section className="hero resources-hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Learning <span className="highlight">Resources</span></h1>
            <p className="hero-subtitle">
              {resourcesData?.subtitle || 'Essential tools, repositories, and materials to support your learning journey'}
            </p>
            <div className="hero-buttons">
              <button 
                className="btn btn-primary" 
                onClick={() => scrollToSection('repos')}
              >
                <i className="fas fa-book"></i> Browse Resources
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => scrollToSection('tools')}
              >
                <i className="fas fa-tools"></i> View Tools
              </button>
            </div>
          </div>
          <div className="recourses-image-placeholder">
            {/* <div className="floating-elements">
              <div className="floating-element">📚</div>
              <div className="floating-element">💻</div>
              <div className="floating-element">🚀</div>
              <div className="floating-element">⭐</div>
              <div className="floating-element">🎯</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="section quick-links">
        <div className="container">
          <div className="section-header">
            <h2>Quick Access</h2>
            <p>Frequently used resources and tools</p>
          </div>
          <div className="quick-links-grid">
            <a href="https://github.com/student-username" className="quick-link-card github" target="_blank" rel="noopener noreferrer">
              <div className="quick-link-icon">
                <i className="fab fa-github"></i>
              </div>
              <div className="quick-link-content">
                <h4>GitHub Profile</h4>
                <p>My coding repositories</p>
              </div>
              <div className="quick-link-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </a>
            <div className="quick-link-card primary">
              <div className="quick-link-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <div className="quick-link-content">
                <h4>Course Materials</h4>
                <p>Current semester resources</p>
              </div>
              <div className="quick-link-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
            <div className="quick-link-card warning">
              <div className="quick-link-icon">
                <i className="fas fa-code"></i>
              </div>
              <div className="quick-link-content">
                <h4>Practice Problems</h4>
                <p>Coding challenges and exercises</p>
              </div>
              <div className="quick-link-arrow">
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="section" id="repos">
        <div className="container">
          <div className="section-header">
            <h2>Learning Materials</h2>
            <p>Curated repositories and resources for your studies</p>
          </div>
          <div className="resources-tabs">
            <button 
              className={`tab-button ${currentFilter === 'all' ? 'active' : ''}`} 
              onClick={() => switchTab('all')}
            >
              All Resources
            </button>
            <button 
              className={`tab-button ${currentFilter === 'learning' ? 'active' : ''}`} 
              onClick={() => switchTab('learning')}
            >
              Learning Materials
            </button>
            <button 
              className={`tab-button ${currentFilter === 'tools' ? 'active' : ''}`} 
              onClick={() => switchTab('tools')}
            >
              Tools
            </button>
            <button 
              className={`tab-button ${currentFilter === 'community' ? 'active' : ''}`} 
              onClick={() => switchTab('community')}
            >
              Community
            </button>
            <button 
              className={`tab-button ${currentFilter === 'documentation' ? 'active' : ''}`} 
              onClick={() => switchTab('documentation')}
            >
              Documentation
            </button>
          </div>
          <div className="resources-grid">
            {filteredResources.map((resource, index) => (
              <div key={index} className="resource-card" data-type={resource.tags.join(' ')}>
                <div className="resource-header">
                  <div className="resource-icon">
                    <i className={resource.icon}></i>
                  </div>
                  <div className="resource-meta">
                    <span className="resource-type">{resource.type}</span>
                    <span className="resource-difficulty beginner">beginner</span>
                  </div>
                </div>
                <div className="resource-content">
                  <h3>{resource.title}</h3>
                  <p>{resource.description}</p>
                  <div className="resource-tags">
                    {resource.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="resource-actions">
                  <a 
                    href={resource.url} 
                    className="btn btn-primary btn-sm" 
                    target={resource.type === 'external' ? '_blank' : '_self'}
                    rel={resource.type === 'external' ? 'noopener noreferrer' : ''}
                    onClick={() => handleResourceClick(resource)}
                  >
                    <i className="fas fa-external-link-alt"></i>
                    {resource.type === 'external' ? 'Open Resource' : 
                     resource.type === 'download' ? 'Download' : 'View'}
                  </a>
                  <button 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => addToBookmarks(resource.title)}
                  >
                    <i className="fas fa-bookmark"></i>
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="section bg-light" id="tools">
        <div className="container">
          <div className="section-header">
            <h2>Development Tools</h2>
            <p>Essential tools for coding and collaboration</p>
          </div>
          <div className="tools-grid">
            {[
              { name: 'Visual Studio Code', description: 'Powerful code editor with extensions', icon: 'fas fa-code', url: 'https://code.visualstudio.com/', category: 'Editor', installed: true },
              { name: 'Git', description: 'Version control system', icon: 'fab fa-git-alt', url: 'https://git-scm.com/', category: 'Version Control', installed: true },
              { name: 'Node.js', description: 'JavaScript runtime environment', icon: 'fab fa-node-js', url: 'https://nodejs.org/', category: 'Runtime', installed: false },
              { name: 'Figma', description: 'Design and prototyping tool', icon: 'fab fa-figma', url: 'https://figma.com/', category: 'Design', installed: false }
            ].map((tool, index) => (
              <div key={index} className={`tool-card ${tool.installed ? 'installed' : 'not-installed'}`}>
                <div className="tool-header">
                  <div className="tool-icon">
                    <i className={tool.icon}></i>
                  </div>
                  <div className="tool-status">
                    <span className={`status-badge ${tool.installed ? 'installed' : 'not-installed'}`}>
                      <i className={`fas ${tool.installed ? 'fa-check' : 'fa-download'}`}></i>
                      {tool.installed ? ' Installed' : ' Not Installed'}
                    </span>
                  </div>
                </div>
                <div className="tool-content">
                  <h4>{tool.name}</h4>
                  <p>{tool.description}</p>
                  <span className="tool-category">{tool.category}</span>
                </div>
                <div className="tool-actions">
                  <a 
                    href={tool.url} 
                    className={`btn ${tool.installed ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <i className={`fas ${tool.installed ? 'fa-external-link-alt' : 'fa-download'}`}></i>
                    {tool.installed ? 'Learn More' : 'Download'}
                  </a>
                  <button 
                    className="btn btn-outline btn-sm"
                    onClick={() => window.showNotification?.(`🔧 ${tool.name}: ${tool.description}`, 'info')}
                  >
                    <i className="fas fa-info"></i>
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ResourcesPage;