#!usr/bin/env node

var server=require("./server");
var router=require("./router");
var requestHandlers=require("./requestHandlers1");

var handle={};
handle["/"]=requestHandlers.start;
handle["/start"]=requestHandlers.start; 
handle["/upload"]=requestHandlers.upload; 
handle["/show"]=requestHandlers.show;

server.start(router.route,handle);
