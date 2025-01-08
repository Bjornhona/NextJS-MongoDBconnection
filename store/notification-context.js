import { createContext, useState, useEffect } from 'react';

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData) => {},
  hideNotification: () => {},
});

export const NotificationContextProvider = (props) => {
  const [activeNotification, setActiveNotification] = useState();

  useEffect(() => {
    if (activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        setActiveNotification(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [activeNotification]);
  
  const handleShowNotification = (notificationData) => {
    setActiveNotification(notificationData);
  };

  const handleHideNotification = () => {
    setActiveNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: handleShowNotification,
    hideNotification: handleHideNotification
  }

  return <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
}

export default NotificationContext;
