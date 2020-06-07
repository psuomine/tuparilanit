import React from "react";
import { Heading, Flex } from "@chakra-ui/core";

const Navigation = () => {
  return (
    <Flex
      mr={5}
      color="white"
      p={4}
      borderBottom="1px"
      borderColor="brand.border"
    >
      <Heading as="h1" size="lg">
        Tuparilanit - v2
      </Heading>
    </Flex>
  );
};

export default Navigation;
