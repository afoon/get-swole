if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const Player = require('./db').Player
const { respond } = require('./swole_bot')
const { PORT } = process.env

// /////////////////////////////// //
// ///////// middleware ////////// //
// /////////////////////////////// //

app.use(cors());
app.use(bodyParser.json())

/// ////////////////////////////// //
// ///////// endpoints /////////// //
// /////////////////////////////// //

app.get('/', function (req, res) {
  Player.find({}, (err, players) => {
    if (err) throw err
    res.send(players)
  })
})

app.post('/api/bot', (req, res) => {
  respond(req, res);
})

var userRouter = require('./username')
app.use('/:username', userRouter)
app.listen(PORT, () => {
  console.log(`Andre ${PORT}`)
});
