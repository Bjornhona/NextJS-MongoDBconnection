import {useRef, useState} from 'react';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const [message, setMessage] = useState('');
  const emailRef = useRef();

  function registrationHandler(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    fetch('/api/newsletter', { 
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => setMessage(data.message));
    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
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
