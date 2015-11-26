var express = require('express');
var routes = require('./routes');
var http = require('http');
var linkify = require('html-linkify');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

// Term to track
var term = 'lettering';
 
var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

  // configure express app
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.static(__dirname + '/public'));
 
app.get('/', require('./routes/index'));

io.on('connection', function(socket){
  console.log('a client has connected');

  var cfg = require('./config.json');
  var tw = require('node-tweet-stream')(cfg);
  tw.track(term);
  tw.on('tweet', function(tweet){
    var tweetText = entities.decode(linkify(tweet.text));
    console.log(tweetText);
    io.emit('tweet', tweetText);
  })

})
 
 
console.log("Express server listening on port 3000");
