var http = require('http'),
	express = require('express'),
	path = require('path'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.get('/heart', function(req, res){
	res.sendFile(__dirname + '/heart.html');
});

app.set('socket', io);

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'javascript')));

var myData = require('./question.json');

var Twit = require('twit');
var T = new Twit({
	consumer_key: 'zr3xNmMx3nLUiZMjYSAAkAsgP',
	consumer_secret: 'wwkhw9zq0XIk6Otd7lM80f37GpnGMN7Z2QfX6Ed9ObwRnhdu4e',
	access_token: '2610506562-EKYp2FhsaZxiIns2tP5Cj4FZNJ3AyWrx2vG198h',
	access_token_secret: 'NwqYR215dASP4EO9pc7b7lfuYGPYldnvfL9M8StrTmvou'
});

var stream = T.stream('statuses/filter', {track: 'music'});
var clients = {};

if(io.client) return;
io.sockets.on('connection', function (socket) {
	io.client = true;
	clients[socket.id] = socket;
	stream.on('tweet', function(tweet) {
		socket.emit('info', { tweet: tweet}, { info: myData});
	});

	socket.on('disconnect', function(){
		delete clients[socket.id];
	});
});

server.listen(4000);