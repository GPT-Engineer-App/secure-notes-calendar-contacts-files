import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Heading, Text, Tab, TabList, TabPanels, TabPanel, Tabs, FormControl, FormLabel, InputGroup, InputRightElement, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaLock, FaUnlock, FaPlus, FaCalendarAlt, FaAddressBook, FaFileAlt, FaEye, FaEyeSlash } from "react-icons/fa";

const Index = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    if (username === "farhadivanali" && password === "123321Aa....") {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <VStack spacing={4} align="center" justify="center" height="100vh">
          <Heading mb={6}>Password Protected Area</Heading>
          <FormControl>
            <InputGroup>
              <FormControl>
                <FormLabel htmlFor="username">Benutzername</FormLabel>
                <Input id="username" placeholder="Benutzername eingeben" value={username} onChange={(e) => setUsername(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="password">Passwort</FormLabel>
                <InputGroup>
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="Passwort eingeben" value={password} onChange={(e) => setPassword(e.target.value)} />
                  <InputRightElement>
                    <IconButton icon={showPassword ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <InputRightElement>
                <IconButton icon={showPassword ? <FaEyeSlash /> : <FaEye />} onClick={toggleShowPassword} />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button leftIcon={<FaUnlock />} colorScheme="blue" onClick={handleLogin}>
            Unlock
          </Button>
        </VStack>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider>
      <Box p={4}>
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Notizen</Tab>
            <Tab>Kalender</Tab>
            <Tab>Kontakte</Tab>
            <Tab>Dateiablage</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Heading size="md">Notizen</Heading>
              <VStack align="stretch" mt={4}>
                <Button onClick={onOpen} leftIcon={<FaPlus />}>
                  Schulnotizen
                </Button>
                <Button onClick={onOpen} leftIcon={<FaPlus />}>
                  Persönliche Notizen
                </Button>
                <Button onClick={onOpen} leftIcon={<FaPlus />}>
                  Business Notizen
                </Button>
                <Button onClick={onOpen} leftIcon={<FaPlus />}>
                  Andere Notizen
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <Heading size="md">Kalender</Heading>
              <VStack align="stretch" mt={4}>
                <Button onClick={onOpen} leftIcon={<FaCalendarAlt />}>
                  Schultermine
                </Button>
                <Button onClick={onOpen} leftIcon={<FaCalendarAlt />}>
                  Persönliche Termine
                </Button>
                <Button onClick={onOpen} leftIcon={<FaCalendarAlt />}>
                  Arzttermine
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <Heading size="md">Kontakte</Heading>
              <VStack align="stretch" mt={4}>
                <Button onClick={onOpen} leftIcon={<FaAddressBook />}>
                  Kontakt hinzufügen
                </Button>
              </VStack>
            </TabPanel>

            <TabPanel>
              <Heading size="md">Dateiablage</Heading>
              <VStack align="stretch" mt={4}>
                <Button onClick={onOpen} leftIcon={<FaFileAlt />}>
                  Datei hinzufügen
                </Button>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Neuer Eintrag</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Implement the form to add new content here */}
              <Text>Formular für neue Inhalte hier implementieren.</Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Schließen
              </Button>
              <Button variant="ghost">Speichern</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
