const CronJob = require("cron").CronJob;
const Player = require("./db").Player;
const { createLeaderBoard, sendLeaderBoard } = require("./helpers");
const clearTheStats = () => {
  const reset = { workouts: 0, meals: 0, challenge: false, totalPoints: 0 };
  Player.find({}, reset, { multi: true }, (err) => {
    if (err) throw err;
  });
};

const weeklyReset = new CronJob(
  "0 20 1 * * 0",
  async function () {
    console.log('cron here');
    const leaders = await createLeaderBoard();
    const { hasFour, needsFour } = leaders;
    await sendLeaderBoard(
      hasFour,
      needsFour,
      "Here are the end results for this week"
    );
    clearTheStats();
  },
  null,
  true,
  "America/New_York"
);

const weekendWarriors = new CronJob(
  "0 10 * * * 6",
  async function () {
    const leaders = await createLeaderBoard();
    const { hasFour, needsFour } = leaders;
    await sendLeaderBoard(
      hasFour,
      needsFour,
      "Hello Weekend Warriors! You have today and tomorrow to pull through! Here is the leaderboard going into the weekend"
    );
  },
  null,
  true,
  "America/New_York"
);
weeklyReset.start()
weekendWarriors.start()
