import React from "react";
import { Box, List, Divider, SimpleGrid } from "@chakra-ui/core";
import Loading from "./Loading";
import StatsSectionHeader from "./StatsSectionHeader";
import StatListItem from "./StatListItem";
import StatNumberOne from "./StatNumberOne";
import { useStats } from "./useStats";
import { motion } from "framer-motion";
import { FetchStatusEnum } from "./fetchStatusEnum";
import { StatSection } from "./models/StatSection";

const MotionList = motion.custom(List);
const MotionDivider = motion.custom(Divider);

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

const Stats = () => {
  const {
    models: { status, playersById, statsSections },
  } = useStats();

  if (status === FetchStatusEnum.loading) {
    return <Loading />;
  }

  return (
    <SimpleGrid width="100%" columns={{ sm: 1, xl: 2 }} color="white">
      {statsSections.map((item: StatSection, index: number) => {
        const [numberOne, ...rest] = item.stats;

        return (
          <Box
            key={item.title}
            overflow="hidden"
            position="relative"
            as="article"
            borderRight={index % 2 === 0 ? "1px" : 0}
            borderBottom="1px"
            borderColor="brand.border"
            py="10"
            px={[8, null, 16]}
          >
            <StatsSectionHeader
              title={item.title}
              description={item.description}
              imageSrc={playersById[numberOne.playerId].imageSrc}
            />

            <Box marginRight={{ md: 200 }}>
              <StatNumberOne
                name={playersById[numberOne.playerId].name}
                average={numberOne.average}
              />
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
