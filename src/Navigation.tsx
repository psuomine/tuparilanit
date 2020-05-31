import React from "react";
import { Heading, Flex, Text, Grid } from "@chakra-ui/core";

const Navigation = () => {
  return (
    <Grid as="nav" templateColumns="repeat(3, 1fr)" color="white" p={4}>
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          Tuparilanit - v2
        </Heading>
      </Flex>

      <Flex alignItems="center" justifyContent="center">
        <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          Statistics
        </Text>
        <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
          Players
        </Text>
      </Flex>
    </Grid>
  );
};

export default Navigation;
