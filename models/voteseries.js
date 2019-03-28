const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userID: {type: String},
  seriesId: {type: String},
  team1: {type: Object},
  team2: {type: Object},
  winner: {type: String},
  diff: {type: Number}
});

const VoteSeries = mongoose.model('voteseries', userSchema);
module.exports = VoteSeries;
