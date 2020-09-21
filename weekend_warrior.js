const { createLeaderBoard, sendLeaderBoard } = require("./helpers");
const weekendWarriors = async () => {
  const leaders = await createLeaderBoard();
  const { hasFour, needsFour } = leaders;
  await sendLeaderBoard(
    hasFour,
    needsFour,
    "Hello Weekend Warriors! You have today and tomorrow to pull through! Here is the leaderboard going into the weekend"
  );
};
weekendWarriors();
