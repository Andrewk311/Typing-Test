var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserScoresSchema = new Schema({
    gleId: String, 
    wpm: {
        type: Number, 
    }
});

var UserDataSchema = new Schema({
    username: String,
    gleId: String
});

var UserScores = mongoose.model('UserScores', UserScoresSchema, 'UserScores');

var UserData = mongoose.model('UserData', UserDataSchema, 'UserData');

module.exports={

    UserScores, UserData

};