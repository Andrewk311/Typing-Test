const express = require("express");
// const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001; 
const arr = [];
const app = express();

class UserData {
    constructor(username, wpm){
        this.username = username; 
        this.wpm = wpm;
    }
}


/*
arr = [UserData1, UserData2, ...]
out_arr = []
for (let user : arr) {
    out_arr.append(user.username + ", " + user.wpm + "<br>");
}
*/


app.get('/UserData', (req, res) => {

    res.send('The wpms are: ' + arr.map(user => user.username + ", " + user.wpm + "<br>"));
    
});

app.post('/username/:nameId/wpm/:numberId', (req, res) => {
    res.send('POST request')
    let user = new UserData(req.params.nameId, req.params.numberId);
    arr.push(user)
})

// app.use(express.urlencoded({extended:false}))
// app.use(express.json());
// app.get("/home", (req, res) => {
//     res.json({
//         nam: "Bill",
//         age: 99
//     })
// })


app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
})