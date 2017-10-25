var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var PORT = process.env.PORT || 80;

app.use(express.static(__dirname + '/public'));

server.listen(PORT);


var canvasOnServer = Math.floor(Math.random()*255);


io.sockets.on('connection',function(socket){
    console.log("client"+socket['id']+"connected");
    socket.emit('serverSendPictureToClients',canvasOnServer);
    
    socket.on('clientSendPictureToServer',function(picture){
        console.log(picture);
        canvasOnServer = picture;
        socket.broadcast.emit('serverSendPictureToClients',picture);
    });
});