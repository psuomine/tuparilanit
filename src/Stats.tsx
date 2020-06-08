import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Text,
  List,
  Flex,
  Divider,
  Image,
  SimpleGrid,
} from "@chakra-ui/core";
import Loading from "./Loading";
import StatListItem from "./StatListItem";
import { motion } from "framer-motion";

const MotionImage = motion.custom(Image);
const MotionText = motion.custom(Text);
const MotionList = motion.custom(List);
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

interface LanStats {
  players: Player[];
  stats: StatSection[];
}

interface Player {
  imageSrc: string;
  name: string;
  playerId: string;
}

interface StatSection {
  title: string;
  description: string;
  stats: Stat[];
}

interface Stat {
  average: number;
  playerId: string;
}

enum Status {
  loading = "LOADING",
  success = "SUCCESS",
}

const Stats = () => {
  const [status, setStatus] = useState<Status>(Status.loading);
  const [playersById, setPlayersById] = useState<{ [key: string]: Player }>({});
  const [statsSections, setStatsSections] = useState<StatSection[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      const res = await fetch("/.netlify/functions/stats");
      const data = await res.json();

      setStatus(Status.success);

      const players = Object.fromEntries(
        data.players.map((item: Player) => [item.playerId, item])
      );

      setPlayersById(players);
      setStatsSections(data.stats);
    };

    if (status === Status.loading) {
      loadStats();
    }
  }, [status]);

  if (status === Status.loading) {
    return <Loading />;
  }

  return (
    <SimpleGrid width="100%" columns={{ sm: 1, xl: 2 }} color="white">
      {statsSections.map((item: StatSection, index: number) => {
        const [winner, ...rest] = item.stats;

        return (
          <Box
            key={item.title}
            overflow="hidden"
            position="relative"
            as="article"
            borderRight={index % 2 !== 0 ? "1px" : 0}
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
              {item.title}
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
                {item.title}
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
                {item.description}
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
                  <Text>{playersById[winner.playerId].name}</Text>
                </Flex>
                <Flex
                  fontSize="2xl"
                  fontWeight="bold"
                  alignItems="center"
                  justifyContent="flex-end"
                  color="brand.primary"
                >
                  <Text>{winner.average}</Text>
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
                {rest.map((item, index) => (
                  <StatListItem
                    key={item.playerId}
                    position={index + 2}
                    playerName={playersById[item.playerId].name}
                    value={item.average}
                  />
                ))}
              </MotionList>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default Stats;
