import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { formatDistance } from 'date-fns';
import {
  Pane,
  Text,
  toaster,
  Textarea,
  Button as Badge,
  TrashIcon,
  EditIcon,
} from 'evergreen-ui';
import Button from 'components/Button';
import Input from 'components/Input';
import { getPosts, createPost } from 'services/post';
import Delete from './delete';
import styles from './home.module.scss';
const Home = () => {
  const [post, setPost] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [isShown, setShown] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentPost, setCurrentPost] = useState('');
  const { isLoading, isError, data, error } = useQuery('Posts', getPosts);
  const handlePost = ({ target: { value, name } }) => {
    return setPost({ ...post, [name]: value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createPost(post);
      if (res) {
        setLoading(false);
        toaster.success('Create Post successful');
        setPost({ title: '', description: '' });
        return;
      } else {
        toaster.danger('Create Post failed');
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      toaster.danger('Create Post failed');
    }
  };

  if (isLoading || isError) {
    return (
      <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
        <Pane
          backgroundColor="white"
          elevation={0}
          height={240}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text>
            {isError && error.message}
            {isLoading && 'Loading Post'}{' '}
          </Text>
        </Pane>
      </Pane>
    );
  }
  return (
    <div className={styles.Home}>
      <div className={styles.HomeContent}>
        {data &&
          data.map((posts, sn) => (
            <div key={sn} className={styles.Posts}>
              <h3>{posts.title}</h3>
              <p className="textArea">{posts.description}</p>
              <div className={styles.PostsAction}>
                <p> {formatDistance(new Date(posts.updated_at), new Date())}</p>
                <div>
                  <Badge marginY={8} marginRight={12} iconBefore={EditIcon}>
                    Edit
                  </Badge>
                  <Badge
                    marginY={8}
                    marginRight={12}
                    iconBefore={TrashIcon}
                    intent="danger"
                    type="button"
                    onClick={() => {
                      setCurrentPost(posts.id)
                      setShown(true);
                      return
                    }}
                  >
                    Delete
                  </Badge>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.HomeEdit}>
        <div className={styles.Editor}>
          <form onSubmit={handleSubmit}>
            <div className={styles.EditorHeader}>
              <h3>Add new Post</h3>
            </div>
            <div className={styles.EditorCard}>
              <Input
                type="text"
                label="Title"
                name="title"
                value={post.title}
                onChange={(e) => handlePost(e)}
                error={errors.post}
              />
              <Textarea
                type="text"
                label=""
                placeholder="Enter here..."
                name="description"
                value={post.description}
                className={styles.description}
                onChange={(e) => handlePost(e)}
              ></Textarea>
              <div className={styles.submit}>
                <Button type="submit" isLoading={loading}>
                  Submit
                </Button>
              </div>
            </div>
          </form>
        </div>
        {isShown && <Delete isShown={isShown} setShown={setShown} currentPost={currentPost} />}
      </div>
    </div>
  );
};

export default Home;
