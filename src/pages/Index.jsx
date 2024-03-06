import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Heading, Text, Tab, TabList, TabPanels, TabPanel, Tabs, FormControl, FormLabel, InputGroup, InputRightElement, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaLock, FaUnlock, FaPlus, FaCalendarAlt, FaAddressBook, FaFileAlt, FaEye, FaEyeSlash } from "react-icons/fa";

import { useRef } from "react";

const Index = () => {
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("notizen");
  const [noteText, setNoteText] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const inputFileRef = useRef(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toggleShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = () => {
    // Basic password check, replace with real authentication logic
    if (password === "123321Aa....") {
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
              <Input type={showPassword ? "text" : "password"} placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
              {
                {
                  notizen: (
                    <FormControl>
                      <FormLabel>Notiztext</FormLabel>
                      <Input placeholder="Text eingeben" value={noteText} onChange={(e) => setNoteText(e.target.value)} />
                    </FormControl>
                  ),
                  kalender: (
                    <>
                      <FormControl id="event-name" isRequired>
                        <FormLabel>Terminname</FormLabel>
                        <Input placeholder="Name des Termins" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                      </FormControl>
                      <FormControl id="event-date" mt={4} isRequired>
                        <FormLabel>Datum</FormLabel>
                        <Input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                      </FormControl>
                      <FormControl id="event-details" mt={4}>
                        <FormLabel>Details</FormLabel>
                        <Input placeholder="Details zum Termin" value={eventDetails} onChange={(e) => setEventDetails(e.target.value)} />
                      </FormControl>
                    </>
                  ),
                  kontakte: (
                    <>
                      <FormControl id="contact-name">
                        <FormLabel>Name</FormLabel>
                        <Input placeholder="Name eingeben" value={contactName} onChange={(e) => setContactName(e.target.value)} />
                      </FormControl>
                      <FormControl id="contact-email" mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Email eingeben" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                      </FormControl>
                      <FormControl id="contact-phone" mt={4}>
                        <FormLabel>Telefonnummer</FormLabel>
                        <Input placeholder="Telefonnummer eingeben" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
                      </FormControl>
                      <FormControl id="contact-search" mt={4}>
                        <Input placeholder="Kontakt suchen" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      </FormControl>
                    </>
                  ),
                  dateiablage: (
                    <FormControl id="file-upload">
                      <FormLabel>Dokument hochladen</FormLabel>
                      <Input type="file" ref={inputFileRef} onChange={(e) => setFile(e.target.files[0])} hidden />
                      <Button leftIcon={<FaFileAlt />} onClick={() => inputFileRef.current.click()}>
                        Datei auswählen
                      </Button>
                      {file && <Text mt={2}>{file.name}</Text>}
                    </FormControl>
                  ),
                }[activeTab]
              }
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
