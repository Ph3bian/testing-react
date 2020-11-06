import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Pane, Text, toaster, Textarea } from 'evergreen-ui';
import Button from 'components/Button';
import Input from 'components/Input';
import Post from 'components/Post';
import { getPosts, createPost } from 'services/post';
import Delete from './delete';
import styles from './home.module.scss';
const Home = () => {
  const [post, setPost] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [isShown, setShown] = useState(false);
  // const [errors, setErrors] = useState({});
  const [currentPost, setCurrentPost] = useState('');
  const { isLoading, isError, data, error, refetch } = useQuery(
    'Posts',
    getPosts
  );
  const handlePost = ({ target: { value, name } }) => {
    return setPost({ ...post, [name]: value });
  };
  const handleDeletePost = (id) => {
    setCurrentPost(id);
    setShown(true);
    return;
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await createPost(post);
      if (res) {
        setLoading(false);
        toaster.success('Create Post successful');
        setPost({ title: '', description: '' });
        refetch();
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

  if (isError) {
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
      {isLoading || isError ? (
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
              {isLoading && 'Loading Post'}
            </Text>
          </Pane>
        </Pane>
      ) : (
        <div className={styles.HomeContent}>
          {data &&
            data.map((posts, sn) => (
              <Post posts={posts} key={sn} handleDeletePost={handleDeletePost} />
            ))}
        </div>
      )}
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
        {isShown && (
          <Delete
            isShown={isShown}
            setShown={setShown}
            currentPost={currentPost}
            refetch={refetch}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
