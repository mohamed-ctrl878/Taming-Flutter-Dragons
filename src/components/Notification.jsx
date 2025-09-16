import React, { useEffect } from 'react';
import { useGlobalNotification } from '../contexts/NotificationContext';
import { getNotificationIcon } from '../hooks/useNotification';

const Notification = () => {
  const { notifications, removeNotification } = useGlobalNotification();
  
  // Add animation styles to the document head
  useEffect(() => {
    if (!document.querySelector('#notification-animations')) {
      const style = document.createElement('style');
      style.id = 'notification-animations';
      style.textContent = `
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="notifications-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            top: `${100 + (notifications.indexOf(notification) * 70)}px`,
            right: '20px',
            backgroundColor: notification.type === 'success' ? '#10b981' : 
                           notification.type === 'error' ? '#ef4444' : 
                           notification.type === 'warning' ? '#f59e0b' : '#059669',
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: '0.5rem',
            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            zIndex: '9999',
            maxWidth: '400px',
            animation: 'slideInRight 0.3s ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <span className="notification-icon">
            {getNotificationIcon(notification.type)}
          </span>
          <span className="notification-message">
            {notification.message}
          </span>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              marginLeft: 'auto',
              opacity: 0.8
            }}
            onMouseOver={(e) => e.target.style.opacity = '1'}
            onMouseOut={(e) => e.target.style.opacity = '0.8'}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;