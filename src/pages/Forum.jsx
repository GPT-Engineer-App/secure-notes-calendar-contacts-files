import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const Forum = () => {
  return (
    <Box p={4}>
      <Heading as="h1" size="xl" mb={6}>
        Forum
      </Heading>
      <Text>This is the forum section where community discussions will take place.</Text>
    </Box>
  );
};

export default Forum;
