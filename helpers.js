const Player = require('./db').Player

const getUser = (username) => {
  const playerInfo = Player.findOne({ username: username }, (err, player) => {
    if (err) throw err
    return player
  })
  return playerInfo
}

// router.get("/challenge", function (req, res) {
//   const { userId } = req.params;
//   Player.findOne({ userId: userId }, (err, user) => {
//     console.error(err.stack);
//     res.send({ name: user.name, challenge: user.challenge });
//   });
// });

// router.put("/challenge", function (req, res) {
//   const { userId } = req.params;
//   Player.findOneAndUpdate(
//     { userId: userId },
//     { challenge: true },
//     (err, user) => {
//       console.error(err.stack);
//       res.end();
//     }
//   );
// });

// router.put("/meals", function (req, res) {
//   const { userId } = req.params;
//   Player.findOne({ userId: userId }, (err, player) => {
//     if (err) throw err;
//     const meals = ++player.meals;
//     Player.updateOne(
//       { userId: userId },
//       { meals: meals },
//       (error, updatedPlayer) => {
//         if (error) throw error;
//       }
//     );
//     res.end();
//   });
// });

exports.getUser = getUser
// exports.getAllUsers = getAllUsers
// exports.getTotalPoints = getTotalPoints
// exports.updateWorkout = updateWorkout
// exports.updateMeal = updateMeal
// exports.updateChallenge = updateChallenge
// exports.updateTotalPoints = updateTotalPoints
