import { Box, Flex } from "@chakra-ui/react";

export function Home() {
  return (
    <>
      <Box h={"100vh"} w={"100vw"}>
        <Flex flex="1" bg="gray.300">
          <Box w="100%" h="auto">
            Olá, seja bem-vindo(a) ao Gerenciador Contas Web!!!
            Acessado via SPA
          </Box>
        </Flex>
      </Box>
    </>
  );
}
