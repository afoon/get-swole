if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require("express");
const axios = require("axios");
const Player = require("./db").Player;
const { BOT_ID, GM_DOMAIN } = process.env;

const router = express.Router({
  mergeParams: true
});

router.use(function (req, res, next) {
  console.log(req.method, "for", req.params.userId, "at", req.path);
  next();
});

router.get('/', function (req, res) {
  const { userId } = req.params;
  Player.findOne({ userId: userId }, (err, player) => {
    console.log(player);
    if (err) throw err;
    res.send({ name: player.name, workouts: player.workouts });
  });
});

router.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Uh oh spaghetti-os");
});

router.get("/challenge", function (req, res) {
  const { userId } = req.params;
  Player.findOne({ userId: userId }, (err, user) => {
    console.error(err.stack);
    res.send({ name: user.name, challenge: user.challenge });
  });
});

router.put("/challenge", function (req, res) {
  const { userId } = req.params;
  Player.findOneAndUpdate(
    { userId: userId },
    { challenge: true },
    (err, user) => {
      console.error(err.stack);
      res.end();
    }
  );
});

router.put("/workouts", function (req, res) {
  const { userId } = req.params;
  Player.findOne({ userId: userId }, (err, player) => {
    if (err) throw err;
    const workouts = ++player.workouts;
    Player.updateOne(
      { userId: userId },
      { workouts: workouts },
      (error, updatedPlayer) => {
        if (error) throw error;
        console.log(updatedPlayer);
      }
    );
    let workoutResponse;
    switch (workouts) {
      case 1:
        workoutResponse = `First workout of the week, ${player.name}!`;
        break;
      case 2:
        workoutResponse = `2/4 halfway there, ${player.name}!`;
        break;
      case 3:
        workoutResponse = `Just one more workout left, ${player.name}!`;
        break;
      case 4:
        workoutResponse = `Congrats on (4/4), ${player.name}. You're officialy in the running to be winner.`;
        break;
      default:
        workoutResponse = `This is your ${workouts}th workout this week, ${player.name}`;
    }
    axios
      .post(`${GM_DOMAIN}`, { text: workoutResponse, bot_id: BOT_ID }) // eslint-disable-line camelcase
      .then(res => {
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    res.end();
  });
});

router.put("/meals", function (req, res) {
  const { userId } = req.params;
  Player.findOne({ userId: userId }, (err, player) => {
    if (err) throw err;
    const meals = ++player.meals;
    Player.updateOne(
      { userId: userId },
      { meals: meals },
      (error, updatedPlayer) => {
        if (error) throw error;
      }
    );
    res.end();
  });
});

module.exports = router;
