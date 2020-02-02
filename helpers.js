const Player = require('./db').Player

  const getUser = (username) => {
      const playerInfo = Player.findOne({username: username}, (err, player) => {
          if (err) throw err;
          return player
      })
      return playerInfo
  };



exports.getUser = getUser
// exports.getAllUsers = getAllUsers
// exports.getTotalPoints = getTotalPoints
// exports.updateWorkout = updateWorkout
// exports.updateMeal = updateMeal
// exports.updateChallenge = updateChallenge
// exports.updateTotalPoints = updateTotalPoints

