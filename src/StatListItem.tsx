import React from "react";
import { Grid, Text, ListItem } from "@chakra-ui/core";
import { motion } from "framer-motion";

const MotionListItem = motion.custom(ListItem);

const listItemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

interface StatListItemProps {
  position: number;
  playerName: string;
  value: number;
}

const StatListItem = ({ position, playerName, value }: StatListItemProps) => {
  return (
    <MotionListItem variants={listItemVariants} mx="6">
      <Grid templateColumns="40px 1fr 100px">
        <Text color="brand.secondary" fontSize="xl" fontWeight="medium">
          {position}
        </Text>
        <Text color="brand.secondary" fontSize="xl" fontWeight="medium">
          {playerName}
        </Text>
        <Text
          color="brand.secondary"
          fontSize="xl"
          fontWeight="medium"
          textAlign="right"
        >
          {value}
        </Text>
      </Grid>
    </MotionListItem>
  );
};

export default StatListItem;
