var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

var api = express.Router();
api.get('/ver', function(req, res, next) {
  res.json({ ver: '1.0' });
});

// tutorial8.js
var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment", yr: 2015},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment", yr: 2013}
];
api.get('/comments', function(req, res, next) {
  res.json(data);
});
api.post('/comments', function(req, res, next) {
  console.log(req.body);
  var comment = req.body;
  comment = comment || {};
  comment.id = _.maxBy(data, 'id').id + 1;
  data.push(comment);
  res.json(data);
});
api.get('/comments/:id', function(req, res, next) {
  var comment = data.find(function(d) {
    return d.id == req.params.id;
  });

  console.log('id', req.params.id, comment);
  res.json(comment);
});





app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
