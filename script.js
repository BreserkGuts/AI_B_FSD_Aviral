// Import the built-in http module
const http = require('http');

// Define the host and port for the server
const host = 'localhost';
const port = 3000;

// Create a request listener function to handle incoming requests
const requestListener = function (req, res) {
  // Set the response status code and content type header
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  // Send the response body and close the connection
  res.end('Hello, World!\n');
};

// Create the server instance with the request listener
const server = http.createServer(requestListener);

// Start the server and listen on the specified port and host
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}/`);
});
