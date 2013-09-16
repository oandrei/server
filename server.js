#!usr/bin/env node

var http=require("http");
var url=require("url");

function start(route,handle) {
    function onRequest (request, response){
	var pathname=url.parse(request.url).pathname;
	console.log("Request for: " + pathname + " recieved");
	
	request.setEncoding("utf8");
	var postData = "";
	request.addListener("data", function (postDataChunk){
	    postData += postDataChunk;
	    console.log("Received Post data chunk '" + postDataChunk + "'.");
        });

	request.addListener("end", function() {
	    route(handle, pathname, response,postData);
       });
    }
    http.createServer(onRequest).listen(8080);
    console.log("Server has started.");
}

exports.start=start;
