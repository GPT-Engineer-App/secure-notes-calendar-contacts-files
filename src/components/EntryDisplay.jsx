import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";

const EntryDisplay = ({ type, data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  const renderContent = () => {
    switch (type) {
      case "notizen":
        return data.map((note, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" mb={2}>
            <Text>{note}</Text>
          </Box>
        ));
      case "kalender":
        return <Text>Kalender events will be displayed here.</Text>;
      case "kontakte":
        return <Text>Kontakte will be displayed here.</Text>;
      case "dateiablage":
        return <Text>Dateiablage will be displayed here.</Text>;
      default:
        return null;
    }
  };

  return (
    <VStack align="stretch" mt={4}>
      {renderContent()}
    </VStack>
  );
};

export default EntryDisplay;
