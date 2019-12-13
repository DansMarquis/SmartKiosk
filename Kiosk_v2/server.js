const { parse } = require('querystring');

const PORT = 5002;
var express = require('express');
var path = require('path');
var app = express();
var server =require('http').createServer(app);
var fs = require('fs');
var io = require('socket.io')(server);

var events= (require('./json/events.json'));
var bus= (require('./json/bus.json'));
var dest, tickets;

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use('/img', express.static(__dirname + '/img'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/html', express.static(__dirname + '/html'));
app.get('/', (req, res) => {
    tickets= bus[0];
    res.sendFile(__dirname + '/html/index.html');
});
app.get('/events', (req, res) => {
    res.sendFile(__dirname + '/html/events.html');
});
app.get('/map', (req, res) => {
    res.sendFile(__dirname + '/html/map.html');
});
app.get('/weather', (req, res) => {
    res.sendFile(__dirname + '/html/weather.html');
});
app.get('/tickets', (req, res) => {
    res.sendFile(__dirname + '/html/tickets.html');
});
app.get('/getEventsList', (req, res) => {
    res.send(events);
});
app.get('/getDirections', (req, res) => {
    res.send(dest);
});
app.get('/getTickets', (req, res) => {
    res.send(tickets);
});
app.post('/setDirections', function(req, res) {
    dest = req.body.dest;
    res.end();
})
app.post('/setTickets', function(req, res) {
    tickets = req.body;
    res.end();
})
app.post('/buyTickets', function(req, res) {
    var newTickets = req.body.tickets;
    var name= req.body.name;
    if (name==="Bus Tickets"){
        var keys= Object.keys(tickets.tickets);
        var len= bus.length;
        for (var i= 0; i<len; i++){
            for (var j= 0; j< keys.length; j++){
                bus[i].tickets[keys[j]]= newTickets[j];
                tickets.tickets[keys[j]]= newTickets[j];
            }
        }
        var fs = require('fs');
        fs.writeFile ("./json/bus.json", JSON.stringify(bus),'utf8' ,function(err) {
                if (err) throw err;
            }
        );
    } else {
        var keys= Object.keys(tickets.tickets);
        var len= events.length;
        for (var i= 0; i<len; i++){
            if(events[i].name===name){
                for (var j= 0; j< keys.length; j++){
                    events[i].tickets[keys[j]]= newTickets[j];
                    tickets.tickets[keys[j]]= newTickets[j];
                }
            }
        }
        var fs = require('fs');
        fs.writeFile ("./json/bus.json", JSON.stringify(events),'utf8' ,function(err) {
                if (err) throw err;
            }
        );
    }
    res.end();
})
server.listen(PORT, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Listening at http://%s:%s", host, port);
});
io.on('connection', function(client) {
    console.log('Client connected...'); 
});