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

weeklyReset();
