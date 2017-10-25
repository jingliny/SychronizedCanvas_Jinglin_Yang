var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var PORT = process.env.PORT || 80;

app.use(express.static(__dirname + '/public'));

server.listen(PORT);

var sliderValueOnServer = 0;

io.on('connection',function(socket){
    console.log("client"+socket['id']+"connected");
    socket.emit('serverSendSliderDataToClients',sliderValueOnServer);
    
    socket.on('clientSendSliderDataToServer',function(data){
        console.log(data);
        sliderValueOnServer = data;
        socket.broadcast.emit('serverSendSliderDataToClients',data);
    });
});