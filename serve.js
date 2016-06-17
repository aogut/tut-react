var express = require('express');
var morgan = require('morgan');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});



var api = express.Router();
api.get('/ver', function(req, res, next) {
  res.json({ ver: '1.0' });
});
api.get('/comments', function(req, res, next) {
  // tutorial8.js
  var data = [
    {id: 1, author: "Pete Hunt", text: "This is one comment", yr: 2015},
    {id: 2, author: "Jordan Walke", text: "This is *another* comment", yr: 2013}
  ];
  res.json(data);
});


app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
