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

const createLeaderBoard = async () => {
  let leaderText;
  await Player.find({}, (err, players) => {
    if (err) throw err;
    const hasFour = [];
    const needsFour = [];
    players.forEach((player) => {
      if (!player.skip) {
        const points =
        Math.floor(player.meals / 3) +
        (player.challenge && 3) +
        (player.workouts > 4 && player.workouts - 4);
        const pointsResponse = `${player.name}: Pts = ${points} | workouts = ${player.workouts} \n`;
        player.workouts >= 4
          ? hasFour.push(pointsResponse)
          : needsFour.push(pointsResponse);
      }
    });
    leaderText = { hasFour: hasFour, needsFour: needsFour };
  });
  return leaderText;
};

const sendLeaderBoard = (leadersBoard, beginningText) => {
  const { hasFour, needsFour } = leadersBoard;
  const text = `${beginningText}:\n ${hasFour} \n ${needsFour}`;
  axios
    .post(`${GM_DOMAIN}`, { text: text, bot_id: BOT_ID }) // eslint-disable-line camelcase
    .then((res) => res)
    .catch(function (error) {
      console.log(error);
    });
};

const getLeaders = async (res) => {
  const leadersBoard = await createLeaderBoard();
  sendLeaderBoard(leadersBoard, 'Here is the current Leaderboard');
  res.end();
};

const clearTheStats = () => {
  const reset = { workouts: 0, meals: 0, challenge: false, totalPoints: 0, skip: false };
  Player.updateMany({}, reset, { multi: true }, (err) => {
    if (err) throw err;
  });
};

exports.getUser = getUser;
exports.getLeaders = getLeaders;
exports.createLeaderBoard = createLeaderBoard;
exports.sendLeaderBoard = sendLeaderBoard;
exports.clearTheStats = clearTheStats
// exports.getTotalPoints = getTotalPoints
// exports.updateWorkout = updateWorkout
// exports.updateMeal = updateMeal
// exports.updateChallenge = updateChallenge
// exports.updateTotalPoints = updateTotalPoints
