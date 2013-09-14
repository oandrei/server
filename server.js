#!usr/bin/env node

var http=require("http");
var url=require("url");

function start(route,handle) {
    function onRequest (request, response){
	var pathname=url.parse(request.url).pathname;
	console.log("Request for: " + pathname + " recieved");

	route(handle,pathname);

	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write("Hello world!");
	response.end();
    }
    http.createServer(onRequest).listen(8080);
    console.log("Server has started.");
}

exports.start=start;
