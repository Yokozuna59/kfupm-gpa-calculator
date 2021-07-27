import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";

import theme from "./theme";
import Header from "./Header";
import Calculator from "./Calculator";
import Footer from "./Footer";

function App({ Component }) {
  return (
    <ChakraProvider theme={theme}>
      <Box className="App">
        <Flex minH="100vh" flexDir="column" justifyContent="space-between">
          <Box>
            <Header />
            <Calculator />
          </Box>
          <Footer />
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
