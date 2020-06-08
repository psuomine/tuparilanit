import React from "react";
import { Text, Flex } from "@chakra-ui/core";
import { motion } from "framer-motion";

const loadingTexts = [
  '"Everyone Rush A", Goes B',
  'Hears a single footstep, "4 at A"',
];

const loadingText =
  loadingTexts[Math.floor(Math.random() * loadingTexts.length)];

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

const Loading = () => {
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
};

export default Loading;
