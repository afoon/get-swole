const { createLeaderBoard, sendLeaderBoard, clearTheStats } = require("./helpers");
const { DateTime } = require("luxon");

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
const weekendWarriors = async () => {
  const local = DateTime.local();
  const rezone = local.setZone("America/New_York");
  if (rezone.weekday === 6) {
    const leaders = await createLeaderBoard();
    await sendLeaderBoard(leaders,
      "Hello Weekend Warriors! You have today and tomorrow to pull through! Here is the leaderboard going into the weekend"
    );
  }
};
const schedule = async () => {
  await weeklyReset();
  await weekendWarriors();
}

schedule();
