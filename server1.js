#!usr/bin/env node

var http=require("http");                                                      
var url=require("url");

var handle={};
handle["/"]=start;
handle["/start"]=start;
handle["/upload"]=upload;
                                                                          
function work(route,handle1) {                                                 
    function onRequest (request, response){                                    
        var pathname=url.parse(request.url).pathname;                          
        console.log("Request for: " + pathname + " recieved");                 
                       
        route(handle1, pathname, response);                                 
        
	response.writeHead(200, {"Content-Type": "text/plain"}); 
        response.write(content);                                               
        response.end();                                                        
    }                                                                          
    http.createServer(onRequest).listen(8080);                                 
    console.log("Server has started.");                                        
}                  

function route(handle1,pathname,response) {
    console.log("About to route a request for " + pathname);                   
    if (typeof handle1[pathname] === 'function') {                             
        handle1[pathname](response);                                           
   } else {                                                                    
       console.log("No request handler found for" + pathname);                 
       response.writeHead(200, {"Content-Type": "text/plain"});
       response.write("Not found");
       response.end();
   }
}          

function start(response) {
    console.log("Request handler 'start' was called");                         
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Start");
    response.end();                                           
}                                                                              
function upload(response) {
    console.log("Request handler 'upload' was called");                        
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello Upload");
    response.end();
}         
   
work(route,handle);
