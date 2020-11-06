import React from 'react';
import { useQuery } from 'react-query';
import { Pane, Text } from 'evergreen-ui';
import { getPosts } from 'services/post';
import styles from './home.module.scss';
const Home = () => {
  const { isLoading, isError, data, error } = useQuery('Posts', getPosts);

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
          
        </div>
      </div>
    </div>
  );
};

export default Home;
