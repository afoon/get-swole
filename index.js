const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path')
const connect = require('connect')
const vhost = require('vhost')
const {domain} = require('./config')
const HTTP = require('http');
const bot  = require('./swole_bot.js');
const port = 3000
const Player = require('./db').Player



///////////////////////////////////
/////////// middleware ////////////
///////////////////////////////////
app.use(cors());
app.use(bodyParser.json())

const server = HTTP.createServer(function (req, res) {
  req.chunks = [];
  req.on('data', function (chunk) {
    req.chunks.push(chunk.toString());
  });

  router.dispatch(req, res, function(err) {
    res.writeHead(err.status, {"Content-Type": "text/plain"});
    res.end(err.message);
  });
});


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
server.listen(port,  () => {
    console.log(`Andre ${port}`)
});

