const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });

  res.end(`
    <h1>Welcome to Node.js</h1>
    <p>This is my first Node.js server.</p>
  `);
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});