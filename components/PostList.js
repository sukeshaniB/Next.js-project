import React from 'react';
import Link from 'next/link';
import { Card, CardActionArea, CardContent, Typography } from '@material-ui/core';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Link key={post._id} href={`/post/${post._id}`} passHref>
          <Card style={{ margin: '20px 0', cursor: 'pointer' }}>
            <CardActionArea>
              <img src={post.imageUrl} alt={post.description} style={{ maxWidth: '100%' }} />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default PostList;
