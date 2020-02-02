const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const path = require('path')
const connect = require('connect')
const vhost = require('vhost')
const {domain} = require('./config')
var http = require('http');
const port = 3000
const Player = require('./db').Player



///////////////////////////////////
/////////// middleware ////////////
///////////////////////////////////
app.use(cors());
app.use(bodyParser.json())


var appTest = connect()

app.use(vhost(domain, (req, res) => {
  // handle req + res belonging to mail.example.com
  res.setHeader('Content-Type', 'text/plain')
  res.end('Test test')
}))

// an external api server in any framework
var httpServer = http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('hello from the api!')
})

app.use(vhost('domain', function (req, res) {
  // handle req + res belonging to api.example.com
  // pass the request to a standard Node.js HTTP server
  httpServer.emit('request', req, res)
})) 


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
const server = app.listen(port, 'localhost',  () => {
    console.log(`Andre ${port}`)
});

