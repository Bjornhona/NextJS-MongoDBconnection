import classes from './comment-list.module.css';

function CommentList({comments}) {

  const commentItem = (item) => (
    <li key={item._id}>
      <p>{item.text}</p>
      <div>
        By <address>{item.name}</address>
      </div>
    </li>
  )

  return (
    <ul className={classes.comments}>
      {comments && comments.map(item => commentItem(item))}
    </ul>
  );
}

export default CommentList;
