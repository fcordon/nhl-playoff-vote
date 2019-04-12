const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userID: {type: String},
    userPseudo: {type: String},
    points: {type: Number},
    provisoire: {type: Number}
});

const Classement = mongoose.model('classement', userSchema);
module.exports = Classement;
