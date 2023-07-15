import { Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface IAccountsListResponse {
  _id: string
  descricao: string
  estaPaga: boolean
  valor: number
  dataVencimento: string
  tipo: 'Despesa' | 'Receita'
}

export const ListarContas = () => {
  const [contas, setContas] = useState<IAccountsListResponse[]>([])

  async function usersList() {
    const response = await axios.get<IAccountsListResponse[]>(
      "http://localhost:3000/contas",
    );
    setContas(response.data)
    console.log('response.data :>> ', response.data);
  }

  useEffect(() => {
    usersList()
  }, [])

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Listagem de Contas Cadastradas</TableCaption>
        <Thead>
          <Tr>
            <Th>DESCRIÇÃO</Th>
            <Th isNumeric>VALOR</Th>
            <Th>TIPO</Th>
            <Th>PAGA?</Th>
            <Th>VENCIMENTO</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            contas.length > 0 ?
              contas.map(conta => (
                <Tr key={conta._id}>
                  <Td>{conta.descricao}</Td>
                  <Td>{conta.valor}</Td>
                  <Td>{conta.tipo}</Td>
                  <Td>{conta.estaPaga ? 'Sim' : 'Não'}</Td>
                  <Td>{conta.dataVencimento}</Td>
                </Tr>
              )) :
              <Text>Não existe conta cadastrada.</Text>
          }
        </Tbody>
      </Table>
    </TableContainer>
  )
}