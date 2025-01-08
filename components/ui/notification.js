import classes from './notification.module.css';
import { useContext } from 'react';
import NotificationContext from '../../store/notification-context';

function Notification(props) {
  const { title, message, status } = props;
  const notificationCtx = useContext(NotificationContext);

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  const handleConfirm = () => {
    notificationCtx.hideNotification();
  };

  return (
    <div className={activeClasses} onClick={handleConfirm}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
