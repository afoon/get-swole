if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path')
const Player = require('./db').Player
const {PORT} = process.env


///////////////////////////////////
/////////// middleware ////////////
///////////////////////////////////
app.use(cors());
app.use(bodyParser.json())

//////////////////////////////////
///////////// helper /////////////
//////////////////////////////////

const helper = require('./helpers')

///////////////////////////////////
/////////// endpoints /////////////
///////////////////////////////////

app.get('/', function (req, res) {
    Player.find({}, (err, players) => {
      res.send(players)
    })
  })


// app.put(`/api/workout/:username`, (res,req) {
//     const {username} = req.params;
//     const user = getUser(username);
//     console.log(`found ${user.name}`)
    

// })



var userRouter = require('./username')
app.use('/:username', userRouter)
const server = app.listen(PORT, () => {
    console.log(`Andre ${PORT}`)
});

