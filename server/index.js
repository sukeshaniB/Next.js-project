const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
});

const PORT = 3001;

let posts = [
  { _id: '1', description: 'Beautiful sunset', imageUrl: 'sunset.jpg', likes: 0, comments: [] },
  // Add more dummy data as needed
];

app.get('/posts', (req, res) => {
  res.json(posts);
});

app.get('/posts/:postId', (req, res) => {
  const post = posts.find((p) => p._id === req.params.postId);
  res.json(post);
});

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for like events
  socket.on('like', (postId) => {
    const postIndex = posts.findIndex((p) => p._id === postId);
    if (postIndex !== -1) {
      posts[postIndex].likes += 1;
      io.emit('postUpdated', posts[postIndex]);
    }
  });

  // Listen for comment events
  socket.on('comment', ({ postId, comment }) => {
    const postIndex = posts.findIndex((p) => p._id === postId);
    if (postIndex !== -1) {
      posts[postIndex].comments.push(comment);
      io.emit('postUpdated', posts[postIndex]);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
