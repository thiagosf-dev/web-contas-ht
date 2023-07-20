import {
  Button,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface AccountType {
  _id: string;
  descricao: string;
  estaPaga: boolean;
  valor: number;
  dataVencimento: string;
  tipo: "Despesa" | "Receita";
}

export function AccountsList() {
  // useState => variável, função que altera a variável
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(false);

  async function callRequest() {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/conta");
    setAccounts(response.data);
    setLoading(false);
  }

  // é um hook do React de efeito colateral,
  // que será executado sempre antes do fim
  // do ciclo de renderização do componente
  useEffect(() => {
    callRequest();
  }, []);

  useEffect(() => {
    console.log("alterou o valor da variável com sucesso");
  }, [loading]);

  return (
    <>
      {loading && <h1>CARREGANDO</h1>}

      {/* <Button onClick={callRequest}>PESQUISAR CONTAS</Button> */}

      {!loading && (
        <TableContainer>
          <Table variant="simple">
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
              {accounts.map((account) => (
                <Tr>
                  <Td>{account.descricao}</Td>
                  <Td>{account.valor}</Td>
                  <Td>{account.tipo}</Td>
                  <Td>{account.estaPaga ? "Sim" : "Não"}</Td>
                  <Td>{account.dataVencimento}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
