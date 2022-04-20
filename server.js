//all the code to spin up node server
//we use 'require' as 'import' cause not supported by node
const http = require('http');
const app = require('./app');

//if not port provided by host then local host 3000
const port = process.env.PORT || 3000;

//create a server + a listener: fct that executed each time change is made
const server = http.createServer(app);

server.listen(port);