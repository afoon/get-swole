if (process.env.NODE_ENV !== "production") require("dotenv").config();
const Player = require("./db").Player;
const axios = require("axios");
const { GM_DOMAIN, BOT_ID } = process.env;

const getUser = (username) => {
  const playerInfo = Player.findOne({ username: username }, (err, player) => {
    if (err) throw err;
    return player;
  });
  return playerInfo;
};

const createLeaderBoard = () => {
  const leaderText = Player.find({}, (err, players) => {
    if (err) throw err;
    const hasFour = [];
    const needsFour = [];
    players.forEach((player) => {
      const points =
        Math.floor(player.meals / 3) +
        (player.challenge && 3) +
        (player.workouts > 4 && player.workouts - 4);
      const pointsResponse = `${player.name}: Pts = ${points} | workouts = ${player.workouts} \n`;
      player.workouts >= 4
        ? hasFour.push(pointsResponse)
        : needsFour.push(pointsResponse);
    });
    console.log(`Has Four: ${hasFour}`);
    console.log(`Needs Four: ${needsFour}`);
    return { hasFour: hasFour, needsFour: needsFour };
  });
  return leaderText;
};

const sendLeaderBoard = (leadersBoard, beginningText) => {
  console.log(leadersBoard);
  const { hasFour, needsFour } = leadersBoard;
  const text = `${beginningText}:\n ${hasFour} \n ${needsFour}`;
  axios
    .post(`${GM_DOMAIN}`, { text: text, bot_id: BOT_ID }) // eslint-disable-line camelcase
    .then((res) => res)
    .catch(function (error) {
      console.log(error);
    });
};

const getLeaders = (res) => {
  const leadersBoard = createLeaderBoard();
  sendLeaderBoard(leadersBoard, 'Here is the current Leaderboard');
  res.end();
};

exports.getUser = getUser;
exports.getLeaders = getLeaders;
exports.createLeaderBoard = createLeaderBoard;
exports.sendLeaderBoard = sendLeaderBoard;
// exports.getTotalPoints = getTotalPoints
// exports.updateWorkout = updateWorkout
// exports.updateMeal = updateMeal
// exports.updateChallenge = updateChallenge
// exports.updateTotalPoints = updateTotalPoints
