import Axios from 'utils/axios';

export const createPost = (post) => Axios.post(`/posts`, post);
export const getPosts = async () => {
  try {
    const response = await Axios.get(`/posts`);
    return response && response.data && response.data.post;
  } catch (errors) {
    return errors;
  }
};

export const getPost = async (id) => {
    try {
      const response = await Axios.get(`/posts?id=${id}`);
      return response && response.data;
    } catch (errors) {
      return errors;
    }
  };
  
  export const editPost = (post) => Axios.patch(`/posts`, post);
  export const deletePost = (id) => Axios.delete(`/posts?id=${id}`);