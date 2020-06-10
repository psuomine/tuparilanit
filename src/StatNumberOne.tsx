import React from "react";
import { Grid, Text, Flex } from "@chakra-ui/core";

interface StatNumberOneProps {
  name: string;
  average: number;
}

const StatNumberOne = ({ name, average }: StatNumberOneProps) => {
  return (
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
        <Text>{name}</Text>
      </Flex>
      <Flex
        fontSize="2xl"
        fontWeight="bold"
        alignItems="center"
        justifyContent="flex-end"
        color="brand.primary"
      >
        <Text>{average}</Text>
      </Flex>
    </Grid>
  );
};

export default StatNumberOne;
