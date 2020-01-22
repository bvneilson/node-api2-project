const express = require('express');
const postRoutes = require('./api/postRoutes');

const server = express();
const port = 4001;

server.use(express.json());

server.use('/api/posts', postRoutes);

server.listen(port, () => console.log("Listening for changes on port " + port));
