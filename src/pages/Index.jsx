import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, VStack, Input, Button, Heading, Text, Tab, TabList, TabPanels, TabPanel, Tabs, FormControl, FormLabel, InputGroup, InputRightElement, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { FaUnlock, FaPlus, FaCalendarAlt, FaAddressBook, FaFileAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import EntryDisplay from "../components/EntryDisplay";

import { useRef } from "react";

const Index = () => {
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    const storedEvents = localStorage.getItem("events");
    const storedContacts = localStorage.getItem("contacts");
    const storedFiles = localStorage.getItem("files");

    if (storedNotes) {
      setNoteText(JSON.parse(storedNotes));
    }
    if (storedEvents) {
      setEventName(JSON.parse(storedEvents).name);
      setEventDate(JSON.parse(storedEvents).date);
      setEventDetails(JSON.parse(storedEvents).details);
    }
    if (storedContacts) {
      setContactName(JSON.parse(storedContacts).name);
      setContactEmail(JSON.parse(storedContacts).email);
      setContactPhone(JSON.parse(storedContacts).phone);
    }
    if (storedFiles) {
      setFile(JSON.parse(storedFiles));
    }
  }, []);

  const saveData = () => {
    switch (activeTab) {
      case "notizen":
        localStorage.setItem("notes", JSON.stringify(noteText));
        break;
      case "kalender":
        localStorage.setItem("events", JSON.stringify({ name: eventName, date: eventDate, details: eventDetails }));
        break;
      case "kontakte":
        localStorage.setItem("contacts", JSON.stringify({ name: contactName, email: contactEmail, phone: contactPhone }));
        break;
      case "dateiablage":
        if (file) {
          localStorage.setItem("files", JSON.stringify(file.name));
        }
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    saveData();
    onClose();
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    saveData();
  };
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
    saveData();
    // Basic password check, replace with real authentication logic
    if (password === "123321Aa....") {
      setIsAuthenticated(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <ChakraProvider>
        <VStack spacing={8} align="center" justify="center" height="100vh">
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
        {isAuthenticated && (
          <Text fontSize="sm" position="absolute" top={4} right={4}>
            Farhad Ivan Ali
          </Text>
        )}
        <Tabs variant="enclosed" colorScheme="blue">
          <TabList onChange={(index) => handleTabChange(index)}>
            <Tab>Notizen</Tab>
            <Tab>Kalender</Tab>
            <Tab>Kontakte</Tab>
            <Tab>Dateiablage</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Heading size="md">Notizen</Heading>
              {}
              <EntryDisplay type="notizen" data={noteText ? [noteText] : []} />
              <VStack align="stretch" mt={4}>
                <Button onClick={onOpen} leftIcon={<FaPlus />}>
                  Notiz hinzufügen
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

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
              <Button colorScheme="blue" mr={3} onClick={handleClose}>
                Schließen
              </Button>
              <Button variant="ghost" onClick={saveData}>
                Speichern
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
