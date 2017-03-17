var express = require('express');
var app = express();
var path = require('path');
var port = 5000;

app.use(express.static('server/public'));


app.get('/',function(req,res) {
  res.sendFile(path.resolve('server/public/views/index.html'));
});

app.listen(port);
console.log('Listening on port: ', port);
