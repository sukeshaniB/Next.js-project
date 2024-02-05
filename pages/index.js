import React, { useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { Container, Typography } from '@material-ui/core';
import PostList from '../components/PostList';

const socket = io('http://localhost:3001'); // Replace with your backend server URL

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/posts'); // Replace with your backend server URL
      setPosts(response.data);
    };

    fetchData();

    // Listen for real-time updates
    socket.on('postUpdated', (updatedPost) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === updatedPost._id ? updatedPost : post))
      );
    });

    return () => {
      socket.off('postUpdated');
    };
  }, []);

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Instagram Clone
      </Typography>
      <PostList posts={posts} />
    </Container>
  );
};

export default Home;
