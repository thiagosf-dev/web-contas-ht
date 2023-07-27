import {
  Card,
  CardBody,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { PiUserCircleBold } from "react-icons/pi";
import { MyButton } from "../../components/MyButton/MyButton";

interface ErrorResponse {
  response: {
    data: {
      message: string;
      status: number;
      success: boolean;
    };
  };
}

interface LoginProps {
  changeIsLogged: (value: boolean) => void;
}

export function Login({ changeIsLogged }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email: email,
        senha: password,
      });

      setMessage(`${response.data.message}`);
      changeIsLogged(true);
    } catch (error) {
      const err = error as ErrorResponse;
      console.error("Ocorreu  um erro: ", err);
      setMessage(
        `Erro: ${err.response.data.message} com o código ${err.response.data.status}`
      );
    } finally {
      setIsLoading(false);
    }
  }

  function clearForm() {
    setEmail("");
    setPassword("");
    setMessage("");
  }

  useEffect(() => {
    console.log("chamou o useEffect com array vazio...");
  }, []);

  useEffect(() => {
    console.log("chamou o useEffect sem array...");
  });

  // useEffect(()=>{
  //   console.log('chamou o useEffect com array vazio...');
  // }, [])

  return (
    <>
      {isLoading ? (
        <>
          <Flex>
            <Text
              fontSize={"1.25rem"}
              fontWeight={"bold"}
              color={"whiteAlpha.700"}
            >
              Carregando, por favor aguarde...
            </Text>
          </Flex>
        </>
      ) : (
        <Card p={8} rounded={12} bg={"blackAlpha.400"}>
          <CardBody>
            {message && (
              <Flex mb={8} justify={"center"} w={"100%"}>
                <Text
                  p={".5rem"}
                  px={"2rem"}
                  rounded={6}
                  fontSize={"1.25rem"}
                  fontWeight={"bold"}
                  bg={"red.700"}
                  color={"whiteAlpha.700"}
                >
                  {message}
                </Text>
              </Flex>
            )}

            <Flex justify={"center"} mb={8}>
              <Icon as={PiUserCircleBold} color={"purple.500"} boxSize={50} />
            </Flex>
            <Flex flexDir={"column"} gap={6}>
              <FormControl>
                <FormLabel fontSize={"20"} color={"purple.300"}>
                  E-mail
                </FormLabel>
                <Input
                  placeholder="E-mail"
                  color={"blue.500"}
                  bg={"ActiveCaption"}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel fontSize={"20"} color={"purple.300"}>
                  Senha
                </FormLabel>
                <Input
                  placeholder="Senha"
                  color={"blue.500"}
                  bg={"ActiveCaption"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </FormControl>

              <MyButton
                buttonText="Acessar"
                myColorScheme="red"
                myOnClick={handleLogin}
              />

              <MyButton buttonText="Cadastrar" myColorScheme="blue" />

              <MyButton
                buttonText="Limpar"
                myColorScheme="gray"
                myOnClick={clearForm}
              />
            </Flex>
          </CardBody>
        </Card>
      )}
    </>
  );
}
