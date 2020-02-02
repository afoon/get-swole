const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path')

const Player = require('./db').Player



///////////////////////////////////
/////////// middleware ////////////
///////////////////////////////////

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

const server = app.listen(3000, () => {
    console.log(`Andre ${server.address().port}`)
});

