import { Button, ButtonGroup, Flex, FormControl, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Radio, RadioGroup, Select, Stack } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { AccountType } from "./AccountsList";

interface AccountEditProps {
  onClickChangeShowTable: () => void;
  account: AccountType;
}

export function AccountEdit(props: AccountEditProps) {
  const [description, setDescription] = useState(props.account.descricao);
  const [value, setValue] = useState(props.account.valor);
  const [isPaid, setIsPaid] = useState(props.account.estaPaga);
  const [accountType, setAccountType] = useState<string>(props.account.tipo);

  async function handleSaveAccount() {
    const requestObject = {
      descricao: description,
      valor: value,
      estaPaga: isPaid,
      tipo: accountType,
    };

    try {
      await axios.put(`http://localhost:3000/conta/${props.account._id}`, requestObject);
      props.onClickChangeShowTable()
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
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
          <RadioGroup
            onChange={(value) => setIsPaid(value === 's' ? true : false)}
            value={isPaid ? 's' : 'n'}
          >
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

        <ButtonGroup gap='4' mt={'2rem'}>
          <Button
            colorScheme='gray'
            onClick={props.onClickChangeShowTable}
          >
            Cancelar
          </Button>

          <Button
            colorScheme='blue'
            onClick={handleSaveAccount}
          >
            Confirmar alterações
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  )
}