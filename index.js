var express = require ('express');
var app = express();
var server =require('http').createServer(app);
var io = require ('socket.io').listen(server);

server.listen(3000);
app.use(express.static(__dirname));
app.get('/', function(request,response) {
response.sendFile(__dirname + '/index.html');
});


users =[];
connections =[];

io.sockets.on('connection', function(socket) {
    console.log('Success connect');
 connections.push(socket);
 socket.on('disconnect', function(data){
     connections.splice(connections.indexOf(socket),1);
     console.log('Success disconnect');
 });
 socket.on('send mes', function(data){ 
io.sockets.emit('add mes' , {mess: data.mess, name: data.name, className: data.className});
 });
});
