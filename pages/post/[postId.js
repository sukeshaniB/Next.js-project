import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import io from 'socket.io-client';
import { Container, Typography } from '@material-ui/core';

const socket = io('http://localhost:3001'); // Replace with your backend server URL

const PostDetail = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://localhost:3001/posts/${postId}`); // Replace with your backend server URL
      setPost(response.data);
    };

    fetchData();
    socket.on('postUpdated', (updatedPost) => {
      if (updatedPost._id === postId) {
        setPost(updatedPost);
      }
    });

    return () => {
      socket.off('postUpdated');
    };
  }, [postId]);

  return (
    <Container>
      {post ? (
        <>
          <Typography variant="h4" gutterBottom>
            {post.description}
          </Typography>
          <img src={post.imageUrl} alt={post.description} style={{ maxWidth: '100%' }} />
          <Typography variant="h6">Likes: {post.likes}</Typography>
          <Typography variant="h6">Comments: {post.comments.length}</Typography>
        </>
      ) : (
        <Typography variant="h5">Loading...</Typography>
      )}
    </Container>
  );
};

export default PostDetail;
