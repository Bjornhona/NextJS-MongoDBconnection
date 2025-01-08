import {useRef, useState, useContext} from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '../../store/notification-context';

function NewsletterRegistration() {
  const [message, setMessage] = useState('');
  const emailRef = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    
    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter',
      status: 'pending'
    });

    fetch('/api/newsletter', { 
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => {
      if (response.ok) {
        return response.json();
       }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!');
      });
    }).then(data => {
      setMessage(data.message);
      notificationCtx.showNotification({
        title: 'Newsletter Registration',
        message: `Thank you for signing up! You'll receive our newsletter in your inbox`,
        status: 'success'
      });
    }).catch(error => {
      notificationCtx.showNotification({
        title: 'Newsletter Registration failed',
        message: error.message || 'An error occurred during your registration! Please try again',
        status: 'error'
      });
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailRef}
          />
          <button type='submit'>Register</button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </section>
  );
}

export default NewsletterRegistration;
