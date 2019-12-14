const PORT = 5002;
var express = require('express');
var path = require('path');
var app = express();
var server =require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);



app.use('/static', express.static(__dirname + '/static'));
app.use('/api', express.static(__dirname + '/api'));
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