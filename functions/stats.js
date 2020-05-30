const SteinStore = require("stein-js-client");

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/5ed1087683c30d0425e2c416"
);

const players = [
  {
    playerId: "fef56871-40b7-4b9f-91a9-a9baa5d392d6",
    name: "TOHTORI SAATANA",
    imageSrc: "olof",
  },
  {
    playerId: "7dfdaac8-2f0a-47c1-a199-18317410a0da",
    name: "Peruna",
    imageSrc: "peruna",
  },
];

exports.handler = async (event, context, callback) => {
  // stats is sheet name in Google Drive
  const stats = await store.read("stats");

  const statsByPlayerId = stats.reduce(normalizeStatsReducer, {});

  const workhorse = {
    title: "Workhorse",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "adr"),
      playerId,
    })),
  };

  const bullseye = {
    title: "Bullseye",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "hsPercentage"),
      playerId,
    })),
  };

  const flash = {
    title: "Flash",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "flashedEnemies"),
      playerId,
    })),
  };

  const tenderizer = {
    title: "Tenderizer",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "assists"),
      playerId,
    })),
  };

  const fragger = {
    title: "Fragger",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "kills"),
      playerId,
    })),
  };

  const fourWheelDrive = {
    title: "Four wheel drive",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "quadro"),
      playerId,
    })),
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      players,
      stats: [workhorse, bullseye, flash, tenderizer, fragger, fourWheelDrive],
    }),
  };
};

const averageBasedOnProp = (playerStats, propName) => {
  const sum = playerStats.reduce(
    (acc, currentStat) => acc + Number(currentStat[propName]),
    0
  );

  return sum / playerStats.length;
};

const normalizeStatsReducer = (acc, currentStat) => ({
  ...acc,
  [currentStat.playerId]: [...(acc[currentStat.playerId] || []), currentStat],
});
