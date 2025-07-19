const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200,  {'content-type': 'text/plain'});
    res.end('Hello World');
}).listen(8080);