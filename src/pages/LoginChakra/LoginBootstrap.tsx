import React from "react";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

const LoginChakra: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de autenticação
  };

  return (
    <Box w="300px" p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <FormControl id="formUsername" mb={4}>
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Enter username" />
        </FormControl>

        <FormControl id="formPassword" mb={4}>
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter password" />
        </FormControl>

        <Button colorScheme="blue" type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default LoginChakra;
