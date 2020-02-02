  
const express = require('express')
const helpers = require('./helpers')

const Player = require('./db').Player

const router =  express.Router({
    mergeParams: true
  })

  router.use(function (req, res, next) {
    console.log(req.method, 'for', req.params.username, 'at', req.path)
    next()
  })

  router.get('/', function (req, res) {
    const {username} = req.params
    Player.findOne({username: username}, (err, player) => {
      console.log(player)
        if (err) throw err;
        res.send({name: player.name, workouts:player.workouts})
    })
  })
  
  router.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Uh oh spaghetti-os')
  })

  router.get('/challenge', function (req, res) {
    const {username} = req.params
    Player.findOne({username: username}, (err, user) => {
      res.send({name: user.name, challenge: user.challenge})
    })
  })
  
  router.put('/challenge', function (req, res) {
    const {username} = req.params
    Player.findOneAndUpdate({username: username}, {challenge: true}, (err, user) => {
      res.end()
    })
  })

  router.put('/workouts', function (req, res) {
    const {username} = req.params
    Player.findOne({username: username}, (err, player) => {
        if (err) throw err;
        const workouts = ++player.workouts
        Player.updateOne({username: username}, {workouts: workouts}, (error, updatedPlayer) => {
            if (error) throw error;
            console.log(updatedPlayer)
        })
      res.end()
    })
  })

  router.put('/meals', function (req, res) {
    const {username} = req.params
    Player.findOne({username: username}, (err, player) => {
        if (err) throw err;
        const meals = ++player.meals
        Player.updateOne({username: username}, {meals: meals}, (error, updatedPlayer) => {
            if (error) throw error;
        })
      res.end()
    })
  })

  module.exports = router