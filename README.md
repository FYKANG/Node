# Node.js
## 目录
* [配置说明](#配置说明)
	- [系统](#系统)
	- [node.js版本](#node.js版本)
	- [nmp版本](#nmp版本)
* [测试代码示例](#http的测试代码)
	- [http的测试代码](#http的测试代码)
	- [https的测试代码](#https的测试代码)
* [基本概念](#基本概念)
	- [异步机制](#异步机制)
	- [轮询机制](#轮询机制)
* [GET和POST请求(HTTPS模式)](#GET和POST请求(HTTPS模式))
	- [GET请求](#GET请求)
## 配置说明：
### 系统
* LSB Version:	:core-4.1-amd64:core-4.1-noarch
* Distributor ID:	CentOS
* Description:	CentOS Linux release 7.2.1511 (Core) 
* Release:	7.2.1511
* Codename:	Core
### node.js版本
* v6.11.3
### nmp版本
* 3.10.10
## 测试代码示例
注意开放相关端口,可以用以下命令进行端口占用查询`netstat -ntlp`
### http的测试代码
```js
	const http = require('http');

	const hostname = '127.0.0.1';
	const port = 3000;

	const server = http.createServer((req, res) => {
		 res.statusCode = 200;
		 res.setHeader('Content-Type', 'text/plain');
		 res.end('Hello World\n');
	});

	server.listen(port, hostname, () => {
		 console.log(`Server running at http://${hostname}:${port}/`);
	});
```
### https的测试代码
```js
	// curl -k https://localhost:8000/
	const https = require('https');
	const fs = require('fs');

	const options = {
		 key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
		 cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
	};

	https.createServer(options, (req, res) => {
		 res.writeHead(200);
		 res.end('hello world\n');
	}).listen(8000);
```
## GET和POST请求(HTTPS模式)
### GET请求
```js
// curl -k https://localhost:8000/
var https = require('https');

const url = require('url');

const querystring = require('querystring');
var fs = require('fs');

var port='8000';

var hostname='127.0.0.1';

var options = {
  key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

var getUrl = function(req, res){
	uri = req.url;
	if (uri !== '/favicon.ico') {
		console.log(uri);
		// 获取get参数字符串
		str = url.parse(uri).query;
		console.log(str);
		// 将参数字符串转换为json对象
		json = querystring.parse(str);
		console.log(json);
		res.write('GET node.js !');
		res.end();
	}
}

var server=https.createServer(options,getUrl);
server.listen(8000);

console.log(`Server running at http://${hostname}:${port}/`);


```
