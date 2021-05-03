const { createLeaderBoard, sendLeaderBoard } = require("./helpers");
const { DateTime } = require("luxon");
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
weekendWarriors();
