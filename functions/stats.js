require("dotenv").config();
const SteinStore = require("stein-js-client");

const store = new SteinStore(process.env.STEIN_URL);

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
  {
    playerId: "73ab9cdd-d301-4567-8887-2819abb8a11e",
    name: "EaN",
    imageSrc: "sunny",
  },
  {
    playerId: "9ab3f4bb-4554-458c-906c-c9e3d30f9e4d",
    name: "Suokki",
    imageSrc: "kennys",
  },
  {
    playerId: "73eedbee-4042-4ab9-b7d8-4ac430358306",
    name: "Samkuo",
    imageSrc: "kennys",
  },
];

exports.handler = async (event, context, callback) => {
  // stats is sheet name in Google Drive
  const stats = await store.read("stats");

  const statsByPlayerId = stats.reduce(normalizeStatsReducer, {});

  const workhorse = {
    title: "Workhorse",
    description: "Most ADR avg.",
    stats: players
      .map(({ playerId }) => ({
        average: averageBasedOnProp(statsByPlayerId[playerId], "adr"),
        playerId,
      }))
      .sort((stat1, stat2) => {
        if (stat1.average < stat2.average) return -1;
        if (stat1.average < stat2.average) return 1;

        return 0;
      }),
  };

  const bullseye = {
    title: "Bullseye",
    description: "Highest headshot percentage",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "hsPercentage"),
      playerId,
    })),
  };

  const flash = {
    title: "Flash",
    description: "Most enemies flashed avg.",
    stats: players
      .map(({ playerId }) => ({
        average: averageBasedOnProp(
          statsByPlayerId[playerId],
          "flashedEnemies"
        ),
        playerId,
      }))
      .sort((stat1, stat2) => {
        if (stat1.average > stat2.average) return -1;
        if (stat1.average < stat2.average) return 1;

        return 0;
      }),
  };

  const tenderizer = {
    title: "Tenderizer",
    description: "Most assists avg.",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "assists"),
      playerId,
    })),
  };

  const fragger = {
    title: "Fragger",
    description: "Most kills avg.",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "kills"),
      playerId,
    })),
  };

  const fourWheelDrive = {
    title: "Four wheel drive",
    description: "Most quadro kills avg.",
    stats: players.map(({ playerId }) => ({
      average: averageBasedOnProp(statsByPlayerId[playerId], "quadro"),
      playerId,
    })),
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      players,
      stats: [fragger, workhorse, bullseye, flash, tenderizer, fourWheelDrive],
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
