const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const app = express();

const Teams = require('./models/teams');
const Vote = require('./models/vote');
const users = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// API
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://Razza:CaptainElan2696@cluster0-zxexs.mongodb.net/nhl?retryWrites=true', { useNewUrlParser: true }).then(
  () => {
    console.log('Connection Established to MongoDB');

    app.use(passport.initialize());
    require('./passport')(passport);
    app.use('/', users);

    //---->>>> GET TEAMS <<<<----
    app.get('/teams', function(req, res) {
      Teams.find({}, function(err, team) {
        if(err) {
          throw err;
        }
        res.json(team);
      })
    });

    //---->>>> POST VOTE <<<<----
    app.post('/vote', function(req, res) {
      let vote = req.body;

      Vote.create(vote, function(err, votes) {
        if(err) {
          throw err;
        }
        res.json(votes);
      })
    });

    //---->>>> GET VOTE <<<<----
    app.get('/vote/:id', function(req, res) {
      let userID = req.params.id

      Vote.find({userID: userID}, function(err, votes) {
        if(err) {
          throw err;
        }
        res.json(votes);
      })
    });

    // END API

    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
  }
);

module.exports = app;
