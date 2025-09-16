import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="loading-screen" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ffffff',
      zIndex: 9999
    }}>
      <div className="loading-logo" style={{
        animation: 'pulse 2s infinite',
        marginBottom: '2rem'
      }}>
        <img 
          src="/src/images/vecteezy_dragon-vector-icon-illustration_24375308.svg"
          alt="Loading..."
          style={{
            width: '120px',
            height: '120px',
            filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))'
          }}
        />
      </div>
      
      <div className="loading-text" style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#059669',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        Happy Student Mentorship
      </div>
      
      <div className="loading-subtitle" style={{
        fontSize: '1rem',
        color: '#6b7280',
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        Loading your mentorship journey...
      </div>
      
      <div className="loading-spinner" style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #059669',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;