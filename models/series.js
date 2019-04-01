const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  team1: {type: Object},
  team2: {type: Object},
  winner: {type: String},
  diff: {type: Number}
});

const Series = mongoose.model('series', userSchema);
module.exports = Series;
