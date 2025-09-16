import React, { createContext, useContext, memo } from 'react';
import { useNotification } from '../hooks/useNotification';

const NotificationContext = createContext();

export const useGlobalNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useGlobalNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = memo(({ children }) => {
  const notificationService = useNotification();
  
  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
});
