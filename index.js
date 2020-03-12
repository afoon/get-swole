if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');
const Player = require('./db').Player
const { respond } = require('./swole_bot')
const { rules } = require('./rules')
const { PORT, GM_DOMAIN, BOT_ID } = process.env
const { getLeaders } = require('./helpers')

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

app.put('/rules', (req, res) => {
  axios.post(`${GM_DOMAIN}`, { text: rules, bot_id: BOT_ID }) // eslint-disable-line camelcase
    .then(res => { console.log(res); })
    .catch(function (error) { console.log(error); });
  res.end();
})

app.put("/leaderBoard", function (req, res) {
  getLeaders(res)
});

const userRouter = require('./username')
app.use('/:userId', userRouter)
app.listen(PORT, () => {
  console.log(`Andre ${PORT}`)
});
