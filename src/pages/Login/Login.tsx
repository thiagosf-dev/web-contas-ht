import { Box, Button, Card, Flex, FormControl, FormLabel, Heading, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import { PiEnvelopeBold, PiNotepadBold, PiPasswordBold } from 'react-icons/pi';

interface ILoginResponseSuccess {
  message: string,
  status: string;
  success: boolean;
  token: string;
}

interface ILoginResponseError {
  message: string,
  status: string;
  success: boolean;
}

interface LoginProps {
  onSetLogged: (value: boolean) => void;
}

export const Login = ({ onSetLogged }: LoginProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setMessage('');
    setIsLoading(true);

    try {
      const response = await axios.post<ILoginResponseSuccess>(
        "http://localhost:3000/login",
        { email, senha }
      );
      setMessage(`${response.data.message}, redirecionando...`);
      setTimeout(() => {
        onSetLogged(true);
      }, 3000);
    } catch (error) {
      const err: AxiosError<ILoginResponseError> = error as AxiosError<ILoginResponseError>;
      console.error('Erro na requisição: ', err);
      setMessage(`${err.response?.data.message}`);
    } finally {
      setIsLoading(false);
    }

  };

  return isLoading ? <Box><Flex><Text>CARREGANDO...</Text></Flex></Box> : (
    <Box mx="auto" maxW="md">
      <Flex p={4} mb={4} bg={'red.700'} rounded={8} align={'center'}>
        <Text color={'red.200'}>{message}</Text>
      </Flex>
      <Flex align="center" justify="center" >
        <Card p={16} rounded="3xl" boxShadow="md">
          <Flex align="center" direction={'column'} mb={16} gap={8}>
            <Heading color={'brown'} fontFamily={'Fasthand'} fontStyle={'italic'}>Web Contas</Heading>
            <PiNotepadBold size={50} color={'green'} />
          </Flex>
          <form>
            <FormControl color={'gray'}>
              <FormLabel fontFamily={'Montserrat'} fontWeight={'bold'}>Email:</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <PiEnvelopeBold size={20} color="gray" />
                </InputLeftElement>
                <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </InputGroup>
            </FormControl>
            <FormControl color={'gray'} mt={4}>
              <FormLabel fontFamily={'Montserrat'} fontWeight={'bold'}>Senha:</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <PiPasswordBold size={20} color="gray" />
                </InputLeftElement>
                <Input type="password" value={senha} onChange={(event) => setSenha(event.target.value)} />
              </InputGroup>
            </FormControl>
            <Flex justify="center">
              <Button
                colorScheme="orange"
                mt={8}
                onClick={(event) => handleLogin(event)}
                size="md"
                type='submit'
                _hover={{ opacity: '0.8' }}
              >
                LogIn
              </Button>
            </Flex>
            {/* <Flex justify="center">
              <ButtonDefault title="ACESSAR" onClickButton={handleLogin} />
            </Flex> */}
          </form>
        </Card>
      </Flex>
    </Box>
  );
};
