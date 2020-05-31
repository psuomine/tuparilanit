import React from "react";
import {
  Grid,
  Box,
  Text,
  List,
  Flex,
  Divider,
  ListItem,
  Image,
} from "@chakra-ui/core";

const sections = [1, 2, 3, 4];

const Stats = () => {
  return (
    <Grid width="100%" templateColumns="repeat(2, 1fr)" color="white">
      {sections.map((item) => (
        <Box
          key={item}
          overflow="hidden"
          position="relative"
          as="article"
          borderTop="1px"
          borderRight={item % 2 !== 0 ? "1px" : 0}
          borderColor="brand.border"
          py="10"
          px="16"
        >
          <Image
            position="absolute"
            right="-150px"
            bottom="0"
            size="500px"
            objectFit="cover"
            src="./sunny.png"
            alt="Sunny"
            objectPosition="20% 40%"
            ignoreFallback
          />
          <Text
            position="absolute"
            fontWeight="bold"
            fontSize="10xl"
            left="-40px"
            top="-20px"
            color="brand.secondary"
            opacity={0.05}
          >
            Workhorse
          </Text>
          <Text as="h3" fontWeight="bold" fontSize="4xl">
            Workhorse
          </Text>
          <Text fontSize="xl" color="brand.primary">
            Most ADR
          </Text>

          <Box marginRight={200}>
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
            <Divider borderColor="brand.primary" mx="6" />

            <List spacing={3} mt="6">
              <ListItem mx="6">
                <Grid templateColumns="40px 1fr 100px" gap={6}>
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
              </ListItem>
              <ListItem mx="6">
                <Grid templateColumns="40px 1fr 100px" gap={6}>
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
              </ListItem>
              <ListItem mx="6">
                <Grid templateColumns="40px 1fr 100px" gap={6}>
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
              </ListItem>
              <ListItem mx="6">
                <Grid templateColumns="40px 1fr 100px" gap={6}>
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
              </ListItem>
            </List>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};

export default Stats;
