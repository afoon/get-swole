const Player = require("./db").Player;
const { createLeaderBoard, sendLeaderBoard } = require("./helpers");
const { DateTime } = require("luxon");

const clearTheStats = () => {
  const local = DateTime.local();
  const rezone = local.setZone("America/New_York");
  if (rezone.weekday === (0 || 7)) {
    const reset = { workouts: 0, meals: 0, challenge: false, totalPoints: 0 };
    Player.find({}, reset, { multi: true }, (err) => {
      if (err) throw err;
    });
  }
};

const weeklyReset = async () => {
  const leaders = await createLeaderBoard();
  const { hasFour, needsFour } = leaders;
  await sendLeaderBoard(
    hasFour,
    needsFour,
    "Here are the end results for this week"
  );
  clearTheStats();
};

weeklyReset();
