const express = require("express");
let cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { UserScores, UserData } = require('./schema.js');
var userscores = require('./Routes/userScores.js');
var userdata = require('./Routes/userData.js')

const PORT = process.env.PORT || 3001; 
const app = express();
app.use(cors())

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));

const CONNECTION_URL = 'mongodb+srv://Andrewk311:Andrewk311@cluster0.jh8oz.mongodb.net/DataBase?retryWrites=true&w=majority';

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

var db = mongoose.connection;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//adds gled and wpm to database
app.post('/UserScore/:gleId/:wpmId', (req, res) => {
    res.send('POST request')
    console.log('hello there')
    const user_data = new UserScores({gleId: req.params.gleId, wpm: req.params.wpmId});
    user_data.save(function(err){
    if (err) {
        console.log(err);
    }
});
})

// app.use('/:gleId/:wpmId', userscores);

//find username given gleId
app.get('/findUser/:gleId', (req,res) => {
    UserData.findOne({'gleId' : req.params.gleId}, 'username', function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});
//personal leaderboard
// app.get('/Profile/:gleId', (req, res) => {
//     UserScores.find({'gleId' : req.params.gleId}, 'wpm', function(err, result){
//         if (err) {
//             res.send(err);
//         } else {
//             res.send(result);
//         }
//     });
// });

//personal leaderboard
app.get('/Profile/:gleId', (req, res) => {
    var query = UserScores.find({'gleId' : req.params.gleId});
    query.select('wpm _id');
    query.limit(10);
    query.sort({ wpm: -1 });

    query.exec(function (err, result){
        if(err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
})

//Leaderboard for top scores
app.get('/Leaderboard', (req, res) => {
    var query = UserScores.find({});
    query.select('gleId wpm _id');
    query.limit(10);
    query.sort({ wpm : -1 });
    
    query.exec(function (err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    })
});

//gets gleid of a specific username
app.get('/UsernameCheck/:nameId', (req, res) => {
    UserData.find({'username' : req.params.nameId}, 'gleId', function(err, result){
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

//adds username and gleid to db 
app.post('/UserData/:nameId/:gleId', (req, res) => {
    console.log("IM HERE")
    res.send('POST request')
    const user = new UserData({username: req.params.nameId, gleId: req.params.gleId});
    user.save(function(err){
    if (err) return handleError(err);
});
})

// app.use('/:nameId/:gleId', userdata);
