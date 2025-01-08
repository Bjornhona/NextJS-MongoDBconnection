import { useState, useEffect } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (showComments) {
    fetch(`/api/comments/${eventId}`)
     .then(response => response.json())
     .then(data => setComments(data.comments));
    }
  }, [showComments, eventId]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.json())
    .then((data) => {
      setMessage(data.message);
      setComments(prev => [...prev, data.comment]);
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} message={message} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
