import http from 'http';

const port = 8000;
const host = '127.0.0.1';
const server = http.createServer((req, res) => {
  if (req.url === "/ping") {
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;
    res.end('Pong!')
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    data: 'Hello World!',
  }));
});

server.listen(port, host, () => console.log(`SERVER STARTED on host:${host} port:${port}`));