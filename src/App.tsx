import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import { RouterProvider } from 'react-router-dom';
import { Login } from "./pages/Login/Login";
import { router } from "./routes/router";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Flex>
      {!isLogged && <Login onSetLogged={value => setIsLogged(value)} />}
      {isLogged && <RouterProvider router={router} />}
    </Flex >
  );
}

export default App;
