const express = require('express');
const apiRoutes = require('./api/apiRoutes');

const server = express();
const port = 4001;

server.use(express.json());

server.use('/', 'Welcome to my API');
server.use('/api/posts', apiRoutes);

server.listen(port, () => console.log("Listening for changes on port " + port));
