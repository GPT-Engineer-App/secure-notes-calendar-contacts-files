import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const EntryDisplay = ({ type, data }) => (
  <VStack align="stretch" mt={4}>
    {data && data.length > 0 ? (
      data.map((entry, index) => (
        <Box key={index} p={5} shadow="md" borderWidth="1px" mb={2}>
          {type === "notizen" && <Text>{entry}</Text>}
          {type === "kalender" && (
            <>
              <Text fontWeight="bold">{entry.name}</Text>
              <Text>{entry.date}</Text>
              <Text>{entry.details}</Text>
            </>
          )}
          {type === "kontakte" && (
            <>
              <Text fontWeight="bold">{entry.name}</Text>
              <Text>Email: {entry.email}</Text>
              <Text>Phone: {entry.phone}</Text>
            </>
          )}
          {type === "dateiablage" && <Text>{entry}</Text>}
        </Box>
      ))
    ) : (
      <Text>No entries found.</Text>
    )}
  </VStack>
);

export default EntryDisplay;
