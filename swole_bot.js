if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const axios = require('axios')
const { DOMAIN } = process.env
const Player = require('./db').Player

const workoutResponse = (name) => {
  axios.put(`${DOMAIN}/${name}/workouts`).then(
    (res) => { console.log(res) }
  ).catch(function (error) {
    console.log(error)
  })
}

const evaluateText = (text, name) => {
  const botRegex = /^\/workout/
  if (botRegex.test(text)) {
    workoutResponse(name)
    this.res.end()
  }
}

const createNewPlayer = (userId, name, text) => {
  Player.create({
    userId: userId,
    name: name,
    wins: 0,
    workouts: 0,
    meals: 0,
    challenge: false,
    totalPoints: 0
  }, (err, player) => {
    if (err) { throw new Error('Cannot create new player', err) }
    console.log('NEW PLAYER ADDED')
    evaluateText(text, name);
  })
}

const respond = (req, res) => {
  console.log('req', req.body)
  const { user_id: userId, text, name } = req.body
  if (userId) {
    Player.findOne({ userId: userId }, (err, player) => {
      if (err) { throw err }
      !player ? createNewPlayer(userId, name, text) : evaluateText(text, name)
    })
  }
}

exports.respond = respond
