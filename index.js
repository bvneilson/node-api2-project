const express = require('express');
const postRoutes = require('./api/postRoutes');

const server = express();
const port = process.env.PORT || 5008;

server.use(express.json());

server.use('/api/posts', postRoutes);

server.listen(port, () => console.log("Listening for changes on port " + port));

module.exports = server;
