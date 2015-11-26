var socket = io( 'localhost:3000' );

socket.on( 'connect', function() { 
  console.log( 'connected to the server' );
});

socket.on( 'tweet', function(tweetText) {
  $('.container').prepend('<p>' + tweetText + '</p>');
});