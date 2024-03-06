import React from "react";
import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Box bg="blue.500" color="white" p={4} display="flex" justifyContent="space-between">
      <Link as={RouterLink} to="/" px={2}>
        Home
      </Link>
      <Link as={RouterLink} to="/user-overview" px={2}>
        User Overview
      </Link>
      <Link as={RouterLink} to="/forum" px={2}>
        Forum
      </Link>
    </Box>
  );
};

export default Navigation;
