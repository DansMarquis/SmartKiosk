const PORT = 5002;
var express = require('express');
var path = require('path');
var app = express();
var server =require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);



app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/html', express.static(__dirname + '/html'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/events', (req, res) => {
    res.sendFile(__dirname + '/events.html');
});
app.get('/map', (req, res) => {
    res.sendFile(__dirname + '/map.html');
});
app.get('/weather', (req, res) => {
    res.sendFile(__dirname + '/weather.html');
});







server.listen(PORT, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Listening at http://%s:%s", host, port)
});

io.on('connection', function(client) {
    console.log('Client connected...');
    
   
});