import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Divider,
  IconButton,
  ModalBody,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AccountDelete } from "./AccountDelete";
import { AccountEdit } from "./AccountEdit";

export interface AccountType {
  _id: string;
  descricao: string;
  estaPaga: boolean;
  valor: number;
  dataVencimento: string;
  tipo: "Despesa" | "Receita";
}

export function AccountsList() {
  const [accounts, setAccounts] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const [selectedAccount, setSelectedAccount] = useState({} as AccountType)
  const [showModal, setShowModal] = useState(false);

  async function callRequest() {
    setLoading(true);
    const response = await axios.get("http://localhost:3000/conta");
    setAccounts(response.data);
    setLoading(false);
  }

  function handleEditAccount(account: AccountType) {
    setSelectedAccount(account);
    setShowTable(false);
  }

  function handleRemoveAccount(account: AccountType) {
    setSelectedAccount(account);
    setShowModal(true);
  }

  useEffect(() => {
    callRequest();
  }, []);

  useEffect(() => {
    if (showTable) {
      callRequest();
    }
  }, [showTable]);

  return (
    <>
      {
        loading && <h1>CARREGANDO</h1>
      }

      {
        !loading && showTable && (
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
                  <Th textAlign={'center'}>AÇÕES</Th>
                </Tr>
              </Thead>
              <Tbody>
                {accounts.map((account) => (
                  <Tr key={account._id}>
                    <Td>{account.descricao}</Td>
                    <Td>{account.valor}</Td>
                    <Td>{account.tipo}</Td>
                    <Td>{account.estaPaga ? "Sim" : "Não"}</Td>
                    <Td>{account.dataVencimento}</Td>
                    <Td>
                      <Center height='20px' display={'flex'} gap={'.5rem'}>
                        <Tooltip hasArrow label='Editar conta' fontSize='md' placement='top'>
                          <IconButton
                            colorScheme='blue'
                            aria-label='Search database'
                            icon={<EditIcon />}
                            onClick={() => handleEditAccount(account)}
                          />
                        </Tooltip>

                        <Divider orientation='vertical' />

                        <Tooltip hasArrow label='Excluir conta' fontSize='md' placement='top'>
                          <IconButton
                            colorScheme='red'
                            aria-label='Search database'
                            icon={<DeleteIcon />}
                            onClick={() => handleRemoveAccount(account)}
                          />
                        </Tooltip>
                      </Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      }

      {
        !loading && !showTable && (
          <AccountEdit
            onClickChangeShowTable={() => setShowTable(true)}
            account={selectedAccount}
          />
        )
      }

      {
        showModal && (
          <AccountDelete
            account={selectedAccount}
            closeModal={() => {
              setShowModal(false);
              callRequest();
            }}
            showModal={showModal}
          >
            <ModalBody m={'2rem'}>
              <Text fontWeight={'medium'}>
                Tem certeza que deseja excluir está conta?
              </Text>
              <Box m={'.5rem'}>
                <Text>Descrição: {selectedAccount.descricao}</Text>
                <Text>Valor: {selectedAccount.valor}</Text>
              </Box>
            </ModalBody>
          </AccountDelete>
        )
      }
    </>
  );
}
