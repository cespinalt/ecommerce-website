const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.json('Hello World');
});

app.post('/', function(req, res) {
  const name = req.body.name;
  res.json(`I know you ${name}`);
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
