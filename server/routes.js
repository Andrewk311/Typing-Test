// var express = require('express');
// var router = express.Router();
// const { UserScores, UserData } = require('./schema.js');

// router.post('/:gleId/:wpmId', (req, res) => {
//     res.send('POST request')
//     const user_data = new UserScores({gleId: req.params.gleId, wpm: req.params.wpmId});
//     user_data.save(function(err){
//     if (err) return handleError(err);
// });
// })

// router.post('/:nameId/:gleId', (req, res) => {
//     res.send('POST request')
//     const user = new UserData({username: req.params.nameId, gleId: req.params.gleId});
//     user.save(function(err){
//     if (err) return handleError(err);
// });
// })

// module.exports = router;