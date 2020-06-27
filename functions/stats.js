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
    imageSrc: "dupreeh",
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
    imageSrc: "xseven",
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
        average: averageBasedOnProp(statsByPlayerId[playerId], "adr").toFixed(
          2
        ),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const bullseye = {
    title: "Bullseye",
    description: "Highest headshot percentage",
    stats: players
      .map(({ playerId }) => ({
        average: averageBasedOnProp(
          statsByPlayerId[playerId],
          "hsPercentage"
        ).toFixed(2),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const flash = {
    title: "Flash",
    description: "Most enemies flashed avg.",
    stats: players
      .map(({ playerId }) => ({
        average: averageBasedOnProp(
          statsByPlayerId[playerId],
          "flashedEnemies"
        ).toFixed(2),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const tenderizer = {
    title: "Tenderizer",
    description: "Most assists",
    stats: players
      .map(({ playerId }) => ({
        average: sumBasedOnProp(statsByPlayerId[playerId], "assists"),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const fragger = {
    title: "Fragger",
    description: "Most kills",
    stats: players
      .map(({ playerId }) => ({
        average: sumBasedOnProp(statsByPlayerId[playerId], "kills"),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const fourWheelDrive = {
    title: "Four wheel drive",
    description: "Most quadro kills",
    stats: players
      .map(({ playerId }) => ({
        average: sumBasedOnProp(statsByPlayerId[playerId], "quadro"),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const rip = {
    title: "RIP",
    description: "Most deaths",
    stats: players
      .map(({ playerId }) => ({
        average: sumBasedOnProp(statsByPlayerId[playerId], "deaths"),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  const aces = {
    title: "Ace Of Spades",
    description: "Most aces",
    stats: players
      .map(({ playerId }) => ({
        average: sumBasedOnProp(statsByPlayerId[playerId], "aces"),
        playerId,
      }))
      .sort(sortStatsDesc),
  };

  return {
    statusCode: 200,
    body: JSON.stringify({
      players,
      stats: [
        fragger,
        rip,
        workhorse,
        bullseye,
        tenderizer,
        flash,
        fourWheelDrive,
        aces,
      ],
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

const sumBasedOnProp = (playerStats, propName) => {
  const sum = playerStats.reduce(
    (acc, currentStat) => acc + Number(currentStat[propName]),
    0
  );

  return sum;
};

const normalizeStatsReducer = (acc, currentStat) => ({
  ...acc,
  [currentStat.playerId]: [...(acc[currentStat.playerId] || []), currentStat],
});

const sortStatsDesc = (stat1, stat2) => {
  if (Number(stat1.average) > Number(stat2.average)) return -1;
  if (Number(stat1.average) < Number(stat2.average)) return 1;

  return 0;
};
