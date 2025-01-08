import { useState, useEffect, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;
  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch(`/api/comments/${eventId}`)
      .then(response => response.json())
      .then(data => {
        setComments(data.comments);
        setIsLoading(false);
      }).catch(error => setIsLoading(false));
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Saving data...',
      message: 'Wait while we save your comment in our database',
      status: 'pending'
    });

    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!');
      });
    }).then((data) => {
      setMessage(data.message);
      data.comment && setComments(prev => [...prev, data.comment]);
      notificationCtx.showNotification({
        title: 'Comment added',
        message: 'Your comment was added successfully',
        status: 'success'
      });
    }).catch((error) => {
      notificationCtx.showNotification({
        title: 'An error occured!',
        message: error.message || 'Your comment could not be added',
        status: 'error'
      });
    });
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} message={message} />}
      {showComments && !isLoading && <CommentList comments={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
}

export default Comments;
