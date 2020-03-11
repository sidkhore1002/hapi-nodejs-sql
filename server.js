'use strict';

const Hapi = require("@hapi/hapi");
const MySQL = require('mysql');

// Create a server with a host and port
const server = new Hapi.Server({ port: 3000, host: 'localhost' });

module.exports.connection = MySQL.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'iauro100',
     database: 'student'
});

  const Routes = require("./routes/students_routes");
  server.route(Routes);


server.start(() => {
  console.log('Server running at:');
});