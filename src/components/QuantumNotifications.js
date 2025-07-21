import React, { useState, useEffect } from 'react';
import './QuantumNotifications.css';

const QuantumNotifications = ({ notifications = [], onDismiss }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const handleDismiss = (id) => {
    setVisibleNotifications(prev => prev.filter(notif => notif.id !== id));
    if (onDismiss) onDismiss(id);
  };

  const getNotificationIcon = (type) => {
    const icons = {
      success: '✓',
      error: '⚠',
      info: 'ℹ',
      warning: '⚡',
      blockchain: '⬢',
      ai: '🤖'
    };
    return icons[type] || 'ℹ';
  };

  const getNotificationClass = (type) => {
    return `quantum-notification ${type}`;
  };

  return (
    <div className="quantum-notifications-container">
      {visibleNotifications.map((notification, index) => (
        <div
          key={notification.id}
          className={getNotificationClass(notification.type)}
          style={{ '--notification-index': index }}
        >
          <div className="notification-border"></div>
          <div className="notification-content">
            <div className="notification-header">
              <div className="notification-icon">
                <div className="icon-core">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="icon-pulse"></div>
              </div>
              <div className="notification-info">
                <div className="notification-title">{notification.title}</div>
                <div className="notification-timestamp">
                  {notification.timestamp || new Date().toLocaleTimeString()}
                </div>
              </div>
              <button 
                className="dismiss-btn"
                onClick={() => handleDismiss(notification.id)}
              >
                ✕
              </button>
            </div>
            <div className="notification-message">
              {notification.message}
            </div>
            {notification.action && (
              <div className="notification-actions">
                <button 
                  className="action-btn primary"
                  onClick={notification.action.onClick}
                >
                  {notification.action.label}
                </button>
              </div>
            )}
          </div>
          <div className="notification-progress">
            <div className="progress-line"></div>
          </div>
          <div className="quantum-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// Hook for managing notifications
export const useQuantumNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      timestamp: new Date().toLocaleTimeString(),
      ...notification
    };
    
    setNotifications(prev => [...prev, newNotification]);

    // Auto-dismiss after 5 seconds unless it's an error
    if (notification.type !== 'error') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      }, notification.duration || 5000);
    }
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  // Predefined notification types
  const notify = {
    success: (message, title = 'Success') => addNotification({
      type: 'success',
      title,
      message
    }),
    error: (message, title = 'Error') => addNotification({
      type: 'error',
      title,
      message
    }),
    info: (message, title = 'Information') => addNotification({
      type: 'info',
      title,
      message
    }),
    warning: (message, title = 'Warning') => addNotification({
      type: 'warning',
      title,
      message
    }),
    blockchain: (message, title = 'Blockchain') => addNotification({
      type: 'blockchain',
      title,
      message
    }),
    ai: (message, title = 'AI Assistant') => addNotification({
      type: 'ai',
      title,
      message
    })
  };

  return {
    notifications,
    addNotification,
    dismissNotification,
    clearAll,
    notify
  };
};

export default QuantumNotifications;
