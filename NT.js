// curl -k https://localhost:8000/
var https = require('https');
var fs = require('fs');
var port='8000';
var hostname='127.0.0.1';
var options = {
  key: fs.readFileSync('/etc/httpd/cert/214210558530585.key'),
  cert: fs.readFileSync('/etc/httpd/cert/214210558530585.pem')
};

var server=https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
});
server.listen(8000);

console.log(`Server running at http://${hostname}:${port}/`);
