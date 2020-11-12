import React from 'react';
import { formatDistance } from 'date-fns';
import { Button,  TrashIcon } from 'evergreen-ui';
import styles from './post.module.scss';
const Post = ({ posts, handleDeletePost }) => (
  <div className={styles.Posts}>
    <h3>{posts.title}</h3>
    <p className="textArea">{posts.description}</p>
    <div className={styles.PostsAction}>
      <p>{formatDistance(new Date(posts.updated_at), new Date())}</p>
      <div>
        {/* <Button marginY={8} marginRight={12} iconBefore={EditIcon}>
          Edit
        </Button> */}
        <Button
          marginY={8}
          marginRight={12}
          iconBefore={TrashIcon}
          intent="danger"
          type="button"
          onClick={()=>handleDeletePost(posts.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  </div>
);
export default Post;
