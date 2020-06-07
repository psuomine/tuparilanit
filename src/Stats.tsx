import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Text,
  List,
  Flex,
  Divider,
  ListItem,
  Image,
  SimpleGrid,
} from "@chakra-ui/core";
import { motion } from "framer-motion";

const loadingTexts = [
  '"Everyone Rush A", Goes B',
  'Hears a single footstep, "4 at A"',
];

const sections = [1, 2, 3, 4];

const MotionImage = motion.custom(Image);
const MotionText = motion.custom(Text);
const MotionList = motion.custom(List);
const MotionListItem = motion.custom(ListItem);
const MotionDivider = motion.custom(Divider);

const imageVariants = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const headlineVariants = {
  hidden: { opacity: 0, y: -45 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: -25 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.3,
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const dividerVariants = {
  hidden: { width: 0 },
  visible: {
    width: "auto",
    transition: {
      ease: "easeOut",
      duration: 0.4,
    },
  },
};

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "100%",
  },
};

const loadingCircleTransition = {
  duration: 0.4,
  yoyo: Infinity,
  ease: "easeInOut",
};

interface LanStats {
  players: [Player];
  stats: [StatSection];
}

interface Player {
  imageSrc: string;
  name: string;
  playerId: string;
}

interface StatSection {
  title: string;
  stats: [Stat];
}

interface Stat {
  average: number;
  playerId: string;
}

enum Status {
  loading = "LOADING",
  success = "SUCCESS",
}

const loadingText =
  loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

const Stats = () => {
  const [status, setStatus] = useState<Status>(Status.loading);
  const [playersById, setPlayersById] = useState<{ [key: string]: Player }>({});
  const [statsSection, setStatsSection] = useState<[StatSection] | []>([]);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetch("/.netlify/functions/stats");
      const data = await res.json();

      setStatus(Status.success);

      const players = Object.fromEntries(
        data.players.map((item: Player) => [item.playerId, item])
      );

      setPlayersById(players);
      setStatsSection(data.stats);
    };

    if (status === Status.loading) {
      loadStats();
    }
  }, [status]);

  if (status === Status.loading) {
    return (
      <Flex flex={1} alignItems="center" justifyContent="center" color="white">
        <Text fontWeight="semibold" fontSize="2xl" mr={1}>
          {loadingText}
        </Text>
        <motion.div
          style={{
            width: "2rem",
            height: "2rem",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
            style={{
              display: "block",
              width: "6px",
              height: "6px",
              backgroundColor: "white",
              borderRadius: "0.25rem",
            }}
          ></motion.span>
          <motion.span
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
            style={{
              display: "block",
              width: "6px",
              height: "6px",
              backgroundColor: "white",
              borderRadius: "0.25rem",
            }}
          ></motion.span>
          <motion.span
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
            style={{
              display: "block",
              width: "6px",
              height: "6px",
              backgroundColor: "white",
              borderRadius: "0.25rem",
            }}
          ></motion.span>
        </motion.div>
      </Flex>
    );
  }

  return (
    <SimpleGrid width="100%" columns={{ sm: 1, xl: 2 }} color="white">
      {sections.map((item) => (
        <Box
          key={item}
          overflow="hidden"
          position="relative"
          as="article"
          borderRight={item % 2 !== 0 ? "1px" : 0}
          borderColor="brand.border"
          py="10"
          px={[8, null, 16]}
        >
          <MotionImage
            display={{ base: "none", md: "block" }}
            position="absolute"
            right="-150px"
            bottom="0"
            size="400px"
            objectFit="cover"
            src="./sunny.png"
            alt="Sunny"
            objectPosition="0 -75px"
            ignoreFallback
            maxHeight="80%"
            initial="hidden"
            animate="visible"
            variants={imageVariants}
          />
          <MotionText
            position="absolute"
            fontWeight="bold"
            fontSize="10xl"
            left="-40px"
            top="-20px"
            color="brand.secondary"
            opacity={0.05}
          >
            Workhorse
          </MotionText>
          <Box overflow="hidden">
            <MotionText
              as="h3"
              fontWeight="bold"
              fontSize="4xl"
              initial="hidden"
              animate="visible"
              variants={headlineVariants}
            >
              Workhorse
            </MotionText>
          </Box>
          <Box overflow="hidden">
            <MotionText
              fontSize="xl"
              color="brand.primary"
              initial="hidden"
              animate="visible"
              variants={subtitleVariants}
            >
              Most ADR
            </MotionText>
          </Box>

          <Box marginRight={{ md: 200 }}>
            <Grid templateColumns="40px 1fr 100px" gap={6} mt="10" mb="6">
              <Flex
                height="40px"
                width="40px"
                border="2px"
                rounded="full"
                borderColor="brand.primary"
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="lg" fontWeight="bold">
                  1
                </Text>
              </Flex>
              <Flex fontSize="2xl" fontWeight="bold" alignItems="center">
                <Text>EaN</Text>
              </Flex>
              <Flex
                fontSize="2xl"
                fontWeight="bold"
                alignItems="center"
                justifyContent="flex-end"
                color="brand.primary"
              >
                <Text>102.4</Text>
              </Flex>
            </Grid>
            <MotionDivider
              variants={dividerVariants}
              initial="hidden"
              animate="visible"
              borderColor="brand.primary"
              mx="6"
            />

            <MotionList
              variants={listVariants}
              initial="hidden"
              animate="visible"
              spacing={3}
              mt="6"
            >
              <MotionListItem variants={listItemVariants} mx="6">
                <Grid templateColumns="40px 1fr 100px">
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    2
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    TOHTORI SAATANA
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                    textAlign="right"
                  >
                    99.3
                  </Text>
                </Grid>
              </MotionListItem>
              <MotionListItem variants={listItemVariants} mx="6">
                <Grid templateColumns="40px 1fr 100px">
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    3
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    Samkuo
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                    textAlign="right"
                  >
                    87.4
                  </Text>
                </Grid>
              </MotionListItem>
              <MotionListItem variants={listItemVariants} mx="6">
                <Grid templateColumns="40px 1fr 100px">
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    4
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    Peruna
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                    textAlign="right"
                  >
                    74.4
                  </Text>
                </Grid>
              </MotionListItem>
              <MotionListItem variants={listItemVariants} mx="6">
                <Grid templateColumns="40px 1fr 100px">
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    5
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                  >
                    Suokki
                  </Text>
                  <Text
                    color="brand.secondary"
                    fontSize="xl"
                    fontWeight="medium"
                    textAlign="right"
                  >
                    68.5
                  </Text>
                </Grid>
              </MotionListItem>
            </MotionList>
          </Box>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default Stats;
