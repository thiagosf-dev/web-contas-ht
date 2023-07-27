import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

export function AccountRegister() {
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [isPaid, setIsPaid] = useState("");
  const [accountType, setAccountType] = useState("");

  async function handleSaveAccount() {
    const requestObject = {
      descricao: description,
      valor: value,
      estaPaga: isPaid === "s" ? true : false,
      tipo: accountType,
    };

    try {
      await axios.post("http://localhost:3000/conta", requestObject);
      clearFields();
    } catch (error) {
      console.error(error);
    }
  }

  function clearFields() {
    setDescription("");
    setValue(0);
    setIsPaid("s");
    setAccountType("");
  }

  function initialState() {
    setDescription("");
    setValue(0);
    setIsPaid("s");
    setAccountType("");
  }

  useEffect(() => {
    initialState();
  }, []);

  return (
    <Flex direction={"column"} gap={6}>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input
          type="text"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Valor</FormLabel>
        <NumberInput
          min={0}
          onChange={(value) => setValue(Number(value))}
          value={value}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <FormControl>
        <FormLabel>Está Paga?</FormLabel>
        <RadioGroup onChange={setIsPaid} value={isPaid}>
          <Stack direction="row">
            <Radio value="s">Sim</Radio>
            <Radio value="n">Não</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Tipo da Conta</FormLabel>
        <Select
          placeholder="Selecione uma opção..."
          value={accountType}
          onChange={(event) => setAccountType(event.target.value)}
        >
          <option value="Despesa">Despesa</option>
          <option value="Receita">Receita</option>
        </Select>
      </FormControl>

      <Button colorScheme={"blue"} onClick={handleSaveAccount}>
        Salvar
      </Button>
    </Flex>
  );
}
