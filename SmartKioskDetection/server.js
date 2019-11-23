const PORT = 5002;
var express = require('express');
var path = require('path');
var app = express();
var server =require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);



app.use('/assets', express.static(__dirname + '/assets'));
app.use('/src/css', express.static(__dirname + '/src/css'));
app.use('/src/js', express.static(__dirname + '/src/js'));
app.use('/src/model', express.static(__dirname + '/src/model'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});







server.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

io.on('connection', function(client) {
    console.log('Client connected...');
    
   
});