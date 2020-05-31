import React from "react";
import { Routes, Route } from "react-router-dom";
import { Flex } from "@chakra-ui/core";

import Navigation from "./Navigation";
import Stats from "./Stats";

const App = () => {
  return (
    <Flex minHeight="100vh" flexDirection="column" bg="brand.bg">
      <Navigation />
      <Flex flexGrow={1}>
        <Routes>
          <Route path="/" element={<Stats />} />
        </Routes>
      </Flex>
    </Flex>
  );
};

export default App;
