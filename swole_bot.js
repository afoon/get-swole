if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const axios = require('axios')
const { DOMAIN } = process.env
const Player = require('./db').Player

const workoutResponse = (userId) => {
  axios.put(`${DOMAIN}/${userId}/workouts`).then(
    (res) => {
      console.log('Going to the db')
      res.end();
    }
  ).catch(function (error) {
    console.log(error)
  })
}

const mealResponse = (userId) => {
  axios.put(`${DOMAIN}/${userId}/meals`).then(
    (res) => {
      console.log('Going to the db')
      res.end();
    }
  ).catch(function (error) {
    console.log(error)
  })
}

const challengeResponse = (userId) => {
  axios.put(`${DOMAIN}/${userId}/challenge`).then(
    (res) => {
      console.log('Going to the db')
      res.end();
    }
  ).catch(function (error) {
    console.log(error)
  })
}

const pointsResponse = (userId) => {
  axios.put(`${DOMAIN}/${userId}/points`).then(
    (res) => {
      console.log('Going to the db')
      res.end();
    }
  ).catch(function (error) {
    console.log(error)
  })
}

const evaluateText = (text, userId, res) => {
  const workout = /^\/workout/
  const meal = /^\/meal/
  const challenge = /^\/challenge/
  const points = /^\/points/
  workout.test(text) && workoutResponse(userId, res)
  meal.test(text) && mealResponse(userId, res)
  challenge.test(text) && challengeResponse(userId, res)
  points.test(text) && pointsResponse(userId, res)
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
  res.end()
  // console.log('req', req.body)
  const { user_id: userId, text, name, sender_type: sender } = req.body
  if (sender === 'bot') { return }
  if (userId) {
    Player.findOne({ userId: userId }, (err, player) => {
      if (err) { throw err }
      !player ? createNewPlayer(userId, name, text) : evaluateText(text, userId)
    })
  }
}

exports.respond = respond
