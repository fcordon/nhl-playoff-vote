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
const Series = require('./models/series');
const VoteSeries = require('./models/voteseries');
const Vote = require('./models/vote');
const Classement = require('./models/classement');
const users = require('./routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'client/public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// API
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb+srv://Razza:CaptainElan2696@cluster0-zxexs.mongodb.net/nhl?retryWrites=true';

async function main() {
  const client = mongoose.connect(url, { useNewUrlParser: true });

  try {
    await client;
    console.log('Connection established to MongoDB !');
  } catch (err) {
    console.dir(err);
  }
}

main().catch(console.dir);

app.use(passport.initialize());
require('./passport')(passport);
app.use('/', users);

//---->>>> GET TEAMS <<<<----
app.get('/teams', function(req, res) {
  Teams.find({}, function(err, team) {
    const sortTeams = team.sort((a,b) => a.name < b.name)
    if(err) {
      throw err;
    }
    res.json(sortTeams);
  })
});

//---->>>> GET SERIES <<<<----
app.get('/series', function(req, res) {
  Series.find({}, function(err, serie) {
    if(err) {
      throw err;
    }
    res.json(serie);
  })
});

//---->>>> POST NHL SERIES <<<<----
app.post('/series', function(req, res) {
  let series = req.body;

  Series.create(series, function(err, serie) {
    if(err) {
      throw err;
    }
    res.json(serie);
  })
});

//---->>>> UPDATE SERIES <<<<----
app.put('/series/:_id', function(req, res) {
  let newData = req.body

  let update = {
    '$set': {
      team1: newData.team1,
      team2: newData.team2,
      winner: newData.winner,
      diff: newData.diff
    }
  };

  let options = {new: false};

  Series.updateOne({_id: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
});

//---->>>> GET ALL USER SERIES <<<<----
app.get('/voteseries', function(req, res) {
  VoteSeries.find({}, function(err, voteSerie) {
    if(err) {
      throw err;
    }
    res.json(voteSerie);
  })
});

//---->>>> POST SERIES VOTE <<<<----
app.post('/voteseries', function(req, res) {
  let vote = req.body;

  VoteSeries.create(vote, function(err, votes) {
    if(err) {
      throw err;
    }
    res.json(votes);
  })
});

//---->>>> GET USER SERIES VOTE <<<<----
app.get('/voteseries/:id', function(req, res) {
  let userID = req.params.id

  VoteSeries.find({userID: userID}, function(err, votes) {
    if(err) {
      throw err;
    }
    res.json(votes);
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

//---->>>> GET ALL VOTE <<<<----
app.get('/vote', function(req, res) {
  Vote.find({}, function(err, vote) {
    if(err) {
      throw err;
    }
    res.json(vote);
  })
});

//---->>>> GET VOTE BY USER <<<<----
app.get('/vote/:id', function(req, res) {
  let userID = req.params.id

  Vote.find({userID: userID}, function(err, votes) {
    if(err) {
      throw err;
    }
    res.json(votes);
  })
});

//---->>>> POST CLASSEMENT <<<<----
app.post('/classement', function(req, res) {
  let classement = req.body;

  Classement.create(classement, function(err, standing) {
    if(err) {
      throw err;
    }
    res.json(standing);
  })
});

//---->>>> GET CLASSEMENT <<<<----
app.get('/classement', function(req, res) {
  Classement.find({}, function(err, classement) {
    if(err) {
      throw err;
    }
    const newClassement = classement.sort((a,b) => a.provisoire < b.provisoire)
    res.json(newClassement);
  })
});

//---->>>> GET CLASSEMENT BY USER <<<<----
app.get('/classement/:id', function(req, res) {
  let userID = req.params.id

  Classement.find({userID: userID}, function(err, classement) {
    if(err) {
      throw err;
    }
    res.json(classement);
  })
});

//---->>>> UPDATE CLASSEMENT BY USER <<<<----
app.put('/classement/:_id', function(req, res) {
  let newData = req.body;

  let update = {
    '$set': {
      provisoire: newData.provisoire
    }
  };

  let options = {new: false};

  Classement.updateOne({userID: req.params._id}, update, options, function(err, data) {
    if(err) {
      throw err;
    }
    res.json(data);
  })
});

// END API

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

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

module.exports = app;
