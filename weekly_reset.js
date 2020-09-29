const Player = require("./db").Player;
const { createLeaderBoard, sendLeaderBoard } = require("./helpers");
const { DateTime } = require("luxon");

const clearTheStats = () => {
  const reset = { workouts: 0, meals: 0, challenge: false, totalPoints: 0 };
  Player.update({}, reset, { multi: true }, (err) => {
    if (err) throw err;
  });
};

const resetText = `And the week is over! \n Here are the end results`
const weeklyReset = async () => {
  const local = DateTime.local();
  const rezone = local.setZone("America/New_York");
  if (rezone.weekday === 1) {
    const leaders = await createLeaderBoard();
    await sendLeaderBoard(leaders, resetText);
    clearTheStats();
  }
};

weeklyReset();
