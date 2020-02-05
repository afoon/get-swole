if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const axios = require('axios')
const { DOMAIN } = process.env
const Player = require('./db').Player

const workoutResponse = (userId) => {
  axios.put(`${DOMAIN}/${userId}/workouts`).then(
    () => console.log('Going to the db')
  ).catch(function (error) {
    console.log(error)
  })
}

const evaluateText = (text, userId) => {
  const botRegex = /^\/workout/
  if (botRegex.test(text)) {
    workoutResponse(userId)
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
    evaluateText(text, player.userId);
  })
}

const respond = (req, res) => {
  console.log('req', req.body)
  const { user_id: userId, text, name } = req.body
  if (userId) {
    Player.findOne({ userId: userId }, (err, player) => {
      if (err) { throw err }
      !player ? createNewPlayer(userId, name, text) : evaluateText(text, userId)
    })
  }
}

exports.respond = respond
