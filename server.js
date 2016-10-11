const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const config = require('./config');

const dbUrl = `mongodb://${config.database.username}:${config.database.password}\
@ds029051.mlab.com:29051/${config.database.dbname}`;

mongoose.connect(dbUrl, function(err) {
  if(err) {
    console.log(err);
  }
  console.log('database connected');
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
  res.json('Hello World');
});

app.post('/', function(req, res) {
  const user = new User();

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  user.email = email;
  user.profile.name = name;
  user.password = password;
  user.save(function(err) {
    if(err) {
      return next();
    }

    console.log('User saved');
  });

  res.json(`I know you ${name}`);
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});
