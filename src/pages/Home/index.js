import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Pane, Text, toaster, Textarea } from 'evergreen-ui';
import Button from 'components/Button';
import Input from 'components/Input';
import { getPosts, createPost } from 'services/post';
import styles from './home.module.scss';
const Home = () => {
  const [post, setPost] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
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
            {isLoading && 'Loading Devices'}{' '}
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
              <p>{posts.title}</p>
              <p className="textArea">{posts.description}</p>
            </div>
          ))}
      </div>
      <div className={styles.HomeEdit}>
        <div className={styles.Editor}>
          <form>
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
               <Button type="button" onClick={handleSubmit} isLoading={loading}>
                Submit
              </Button>
            </div>
           
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
