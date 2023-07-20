import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

interface AccountForm {
  descricao: string
}

export function AccountRegister() {
  const [form, setForm] = useState<AccountForm>();

  function handleChangeDescription(value: string) {
    setForm({ ...form, descricao: value })
  }

  return (
    <Flex direction={'column'} gap={10} flex={1}>
      <FormControl>
        <FormLabel>Descrição</FormLabel>
        <Input
          onChange={(e) => handleChangeDescription(e.target.value)}
          type='text'
          value={form?.descricao}
        />
      </FormControl>

      <Flex w={'100%'} flex={1}>
        <Button>SALVAR</Button>
      </Flex>
    </Flex>
  )
}