const express = require("express");
const app = express();
const path = require("path");

//middleware
const createError = require("http-errors");
const helmet = require("helmet");

const debug = require("debug")("Break-It:server");
const http = require("http");

//get port from environment and store in Express
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//create HTTP server
const server = http.createServer(app);

//listen on provided port on all network interfaces
server.listen(port);
// server.on("error", onError);
server.on("listening", onListening);

//normalize port into a number, string, or false
function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    //named pipe
    return val;
  } else if (port >= 0) {
    //port number
    return port;
  } else {
    return false;
  }
}

//event listener for HTTP server
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind} ...`);
}

//secure HTTP headers
app.use(helmet());

//listen for HTTP server errors
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
  //handle listen errors with messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + "requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// app.use(express.static(path.join(__dirname, "src")));
app.use(express.static(path.join(__dirname, "dist")));
