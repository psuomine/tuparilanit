import React from "react";
import { Box, Text, Image } from "@chakra-ui/core";
import { motion } from "framer-motion";

const MotionImage = motion.custom(Image);
const MotionText = motion.custom(Text);

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

interface StatsSectionHeaderProps {
  title: string;
  description: string;
}

const StatsSectionHeader = ({
  title,
  description,
}: StatsSectionHeaderProps) => {
  return (
    <>
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
        {title}
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
          {title}
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
          {description}
        </MotionText>
      </Box>
    </>
  );
};

export default StatsSectionHeader;
