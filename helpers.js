if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const Player = require('./db').Player
const axios = require('axios')
const {GM_DOMAIN, BOT_ID } = process.env

const getUser = (username) => {
  const playerInfo = Player.findOne({ username: username }, (err, player) => {
    if (err) throw err
    return player
  })
  return playerInfo
}

const getLeaders = (res) => {
  Player.find({}, (err, players) => {
    if (err) throw err;
    const hasFour = [];
    const needsFour = [];
    players.forEach(player => {
      const points = Math.floor(player.meals / 3) + (player.challenge && 3) + (player.workouts > 4 && (player.workouts - 4));
      const pointsResponse = `${player.name}: Pts = ${points} | workouts = ${player.workouts} \n`
      player.workouts >= 4 ? hasFour.push(pointsResponse) : needsFour.push(pointsResponse);
    })
    console.log(`Has Four: ${hasFour}`)
    console.log(`Needs Four: ${needsFour}`)
    const leaderText = `Here is the current leaderboard: ${hasFour} \n ${needsFour}`
    axios.post(`${GM_DOMAIN}`, { text: leaderText, bot_id: BOT_ID }) // eslint-disable-line camelcase
      .then(res => { console.log(res); })
      .catch(function (error) { console.log(error); });
    res.end();
  })
}

exports.getUser = getUser
exports.getLeaders = getLeaders
// exports.getTotalPoints = getTotalPoints
// exports.updateWorkout = updateWorkout
// exports.updateMeal = updateMeal
// exports.updateChallenge = updateChallenge
// exports.updateTotalPoints = updateTotalPoints
